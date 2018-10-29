import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, emitPrefix, listenPrefix) {
    super(host, emitPrefix, listenPrefix);
  }

  getRootContainer() {
    const preparedData = this._prepareContainer(data, properties);
    this._roomEmit('getRootContainer', preparedData);
  }

  selectItem(itemIndex) {
    console.log('onSelectItem');
    this._itemEmit('selectItem', {
      itemIndex,
    });
  }

  updateItem(itemIndex, property, value) {
    this._itemEmit('updateItem', {
      itemIndex,
      property,
      value
    });
  }

}