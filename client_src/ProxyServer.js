import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, room) {
    super(host, room);
  }

  getRootContainer() {
    const preparedData = this._prepareContainer(data, properties);
    this._roomEmit(this._room + 'getRootContainer', preparedData);
  }

  updateItem(path, property, value) {
    this._roomEmit(this._room + 'updateItem', {
      path,
      property,
      value
    });
  }

}