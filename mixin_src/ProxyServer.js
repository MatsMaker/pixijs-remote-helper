import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, room) {
    super(host, room);
  }

  sentRootContainer(data) {
    this._itemEmit(this._room + 'rootContainer', data);
  }

  selectItem(data) {
    this._itemEmit(this._room + 'selectItem', data);
  }

}