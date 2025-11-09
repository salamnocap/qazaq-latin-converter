const toggle = document.getElementById("autoToggle");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const versionSelect = document.getElementById("versionSelect");

// --- Load saved settings ---
chrome.storage.sync.get(["enabled", "version"], data => {
  toggle.checked = !!data.enabled;
  versionSelect.value = data.version || "2021";
});

// --- Auto conversion ---
toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

// --- Version selection ---
versionSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ version: versionSelect.value });
  outputText.value = convertText(inputText.value, versionSelect.value);
});

// --- Manual conversion ---
inputText.addEventListener("input", () => {
  outputText.value = convertText(inputText.value);
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputText.value);
});