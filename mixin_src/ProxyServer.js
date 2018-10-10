import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, room) {
    super(host, room);
  }

  sentRootContainer(data) {
    this._roomEmit(this._room + 'rootContainer', data);
  }

}