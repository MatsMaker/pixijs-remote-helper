import { isNull } from "util";

export default class PixiProxy {

  constructor() {
    this._itemLinks = [];  
  }

  addItem(item) {
    let itemIndex = this.getIndexOfItem(item);
    if (itemIndex === -1) {
      itemIndex = this._itemLinks.push(item); // TODO add to first empty link
    }
    return itemIndex;
  }

  getIndexOfItem(item) {
    return this._itemLinks.indexOf(item);
  }

  getItemByIndex(index) {
    return this._itemLinks[index];
  }

  prepareContainer(container, properties) {
    const lightweight = this._onlyProperty(properties, container);
    return JSON.stringify(lightweight);
  }

  _onlyProperty(properties, container, lightweight = null, skip = false) {
    if (lightweight === null) {
      lightweight = {}
    }
    if (!skip) {
      lightweight.__index = this.addItem(container);
    }
    properties.map(name => {
      if (name in container) {
        if (typeof container[name] === 'object' && !isNull(container[name]) && !Array.isArray(container[name]) ) {
          lightweight[name] = this._onlyProperty(properties, container[name], null, true);
        } else {
          lightweight[name] = container[name];
        }
      } 
    });
    if (Array.isArray(container.children)) {
      lightweight.children = container.children.map(chaild =>
        this._onlyProperty(properties, chaild)
      );
    }
    return lightweight;
  }


}