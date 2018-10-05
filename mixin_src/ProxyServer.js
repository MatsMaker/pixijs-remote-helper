import io from "socket.io-client";
import { isNull } from "util";


export default class ProxyServer {

  constructor(host) {
    this._host = host;
    this._listeners = [];
    this._soket;
  }

  connect() {
    this._soket = io(this._host);
  }

  addListener(name, fn) {
    this._soket.on(name, fn);
  }

  sentRootContainer(data, properties = ["name"]) {
    const preparedData = this._prepareContainer(data, properties);
    this._soket.emit('rootContainer', preparedData);
  }

  _prepareContainer(container, properties) {
    const lightweight = onlyProperty(properties, container);
    return JSON.stringify(lightweight);
  }

}

function onlyProperty(properties, container, lightweight = null) {
  if (isNull(lightweight)) {
    lightweight = {}
  }
  properties.map(name => {
    lightweight[name] = container.name;
  });
  lightweight.children = container.children.map((chaild) =>
    onlyProperty(properties, chaild)
  );
  return lightweight;
}
