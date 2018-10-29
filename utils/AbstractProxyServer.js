import io from "socket.io-client";
import { onlyProperty } from './transporter';


export default class AbstractProxyServer {

  constructor(host, emitPrefix, listenPrefix) {
    if (new.target === AbstractProxyServer) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this._host = host;
    this._listeners = [];
    this._io;
    this._emitPrefix = emitPrefix;
    this._listenPrefix = listenPrefix;
  }

  connect() {
    this._io = io(this._host);
    return this;
  }

  _addListener(name, fn) {
    if (this._listeners.indexOf(name) > -1) {
      console.log('this listener exists: ', name);
    } else {
      this._io.on(name, fn);
      this._listeners.push(name);
      console.log('addListener: ', name);
    }
  }

  addListener(name, fn) {
    this._addListener(this._listenPrefix + name, fn);
  }

  _itemEmit(event, data) {
    console.log(this._emitPrefix + event, data);
    this._io.emit(this._emitPrefix + event, data);
  }

}
