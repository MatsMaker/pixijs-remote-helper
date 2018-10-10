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

  _roomEmit(event, data) {
    this._io.emit(event, data);
  }

  _prepareContainer(container, properties) {
    const lightweight = onlyProperty(properties, container);
    return JSON.stringify(lightweight);
  }

}
