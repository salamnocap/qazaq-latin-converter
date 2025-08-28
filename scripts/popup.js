const toggle = document.getElementById("autoToggle");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

// --- Auto conversion ---
chrome.storage.sync.get("enabled", data => {
  toggle.checked = !!data.enabled;
});

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
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
