let enabled = false;
let version = '2021';
let observer = null;

function applyEnabled(on){
  enabled = !!on;
  if (enabled) {
    walk(document.body, true, version);

    if (!observer) {
      observer = new MutationObserver((mutList) => {
        for (const m of mutList) {
          m.addedNodes && m.addedNodes.forEach(n => {
            if (n.nodeType === 3) {
              handleTextNode(n, true, version);
            } else if (n.nodeType === 1) {
              walk(n, true, version);
            }
          });
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  } else {
    if (observer) { observer.disconnect(); observer = null; }
    restoreAll();
  }
}

chrome.storage.sync.get(["enabled", "version"], ({enabled: st, version: ver}) => {
  version = ver || "2021";
  applyEnabled(!!st);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    if (changes.enabled) {
      applyEnabled(changes.enabled.newValue);
    }
    if (changes.version) {
      version = changes.version.newValue || "2021";
      if (enabled) walk(document.body, true, version);
    }
  }
});
