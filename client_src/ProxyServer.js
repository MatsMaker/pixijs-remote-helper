import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, room) {
    super(host, room);
  }

  getRootContainer() {
    const preparedData = this._prepareContainer(data, properties);
    this._roomEmit(this._room + 'getRootContainer', preparedData);
  }

  selectItem(itemIndex) {
    this._itemEmit(this._room + 'selectItem', {
      itemIndex,
    });
  }

  updateItem(itemIndex, property, value) {
    this._itemEmit(this._room + 'updateItem', {
      itemIndex,
      property,
      value
    });
  }

}