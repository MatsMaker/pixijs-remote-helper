import io from "socket.io-client";
import { onlyProperty } from './transporter';


export default class AbstractProxyServer {

  constructor(host, room) {
    if (new.target === AbstractProxyServer) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this._host = host;
    this._listeners = [];
    this._io;
    this._room = room;
  }

  connect() {
    this._io = io(this._host);
    return this;
  }

  addListener(name, fn) {
    this._io.on(name, fn);
  }

  createPathToItem(pixiItem, separator = '/', startpath = '') {
    let path = startpath;
    if (pixiItem.parent) {
      path = this.createPathToItem(pixiItem, separator, path);
    }
    return path;
  }

  restoreParentFoItems(container, parent = null) {
    container.children.map((item) => {
      return this._restoreParentFoItems(item, container);
    });
    return container;
  }

  _restoreParentFoItems(container, parent = null) {
    container.parent = parent;
    return container.children.map((item) => {
      return this._restoreParentFoItems(item, parent);
    });
  }

  _roomEmit(event, data) {
    this._io.emit(event, data);
  }

  _prepareContainer(container, properties) {
    const lightweight = onlyProperty(properties, container);
    return JSON.stringify(lightweight);
  }

}
