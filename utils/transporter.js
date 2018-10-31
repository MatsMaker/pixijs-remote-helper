const MARKER_ROOT = '#';
const PATH_SPLIT = '/';


export function createPathToItem(pixiItem, separator = PATH_SPLIT, path = '') {
  path = pixiItem.name + separator + path;
  if (pixiItem.parent === MARKER_ROOT) {
    return path.slice(0, -1);
  } else {
    return createPathToItem(pixiItem.parent, separator, path);
  }
}


function _setParentFoItems(chaild, parent = null) {
  chaild.parent = parent;
  return chaild.children.map((item) => {
    return _setParentFoItems(item, chaild);
  });
}

export function restoreParentFoItems(container, rootParent = MARKER_ROOT) {
  container.parent = rootParent;
  container.children.map((chaild) => {
    return _setParentFoItems(chaild, container);
  });
  return container;
}

export function parseValueFromString(value) {
  if (typeof value === 'string' && value.search(/^(\\)/) === 0) {
    return value.replace(/^(\\)/g, '');
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (!isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return value;
}

export function getValueType(value, preparse = true) {
  const prepareValue = (preparse) ? parseValueFromString(value) : value;
  return typeof prepareValue;
}