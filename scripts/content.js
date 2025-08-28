let enabled = false;
let observer = null;

function applyEnabled(on){
  enabled = !!on;
  if (enabled) {
    walk(document.body, true);

    if (!observer) {
      observer = new MutationObserver((mutList) => {
        for (const m of mutList) {
          m.addedNodes && m.addedNodes.forEach(n => {
            if (n.nodeType === 3) {
              handleTextNode(n, true);
            } else if (n.nodeType === 1) {
              walk(n, true);
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

chrome.storage.sync.get("enabled", ({enabled: st}) => {
  applyEnabled(!!st);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    applyEnabled(changes.enabled.newValue);
  }
});
