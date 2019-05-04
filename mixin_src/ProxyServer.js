import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, emitPrefix, listenPrefix) {
    super(host, emitPrefix, listenPrefix);
  }

  sentRootContainer(data) {
    this._itemEmit('rootContainer', data);
  }

  updateItem(data) {
    this._itemEmit('updateItem', data);
  }

  selectItem(data) {
    this._itemEmit('selectItem', data);
  }

}