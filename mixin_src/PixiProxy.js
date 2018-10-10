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

  _onlyProperty(properties, container, lightweight = null) {
    if (lightweight === null) {
      lightweight = {}
    }
    lightweight.__index = this.addItem(container);
    properties.map(name => {
      lightweight[name] = container[name];
    });

    lightweight.children = container.children.map(chaild =>
      this._onlyProperty(properties, chaild)
    );
    return lightweight;
  }


}