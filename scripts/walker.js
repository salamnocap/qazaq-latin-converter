const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CANVAS", "SVG", "CODE", "PRE", "KBD", "TEXTAREA", "INPUT"
]);
const originalTextMap = new WeakMap();


function handleTextNode(node, toLatin){
  const val = node.nodeValue;
  if (!val || !val.trim()) return;

  if (toLatin) {
    if (!originalTextMap.has(node)) originalTextMap.set(node, val);
    if (detectKazakh(val)) node.nodeValue = convertText(val);
  } else {
    if (originalTextMap.has(node)) {
      node.nodeValue = originalTextMap.get(node);
      originalTextMap.delete(node);
    }
  }
}

function walk(node, toLatin=true){
  if (!node) return;

  if (node.nodeType === 1) {
    const el = node;
    if (SKIP_TAGS.has(el.tagName)) return;
    if (el.isContentEditable) return;
  }

  let child = node.firstChild;
  while (child) {
    const next = child.nextSibling;
    if (child.nodeType === 3) {
      handleTextNode(child, toLatin);
    } else {
      walk(child, toLatin);
    }
    child = next;
  }
}

function restoreAll(){
  walk(document.body, false);
}