import AbstractProxyServer from '../utils/AbstractProxyServer';


export default class ProxyServer extends AbstractProxyServer {

  constructor(host, room) {
    super(host, room);
  }

  sentRootContainer(data, properties = ["name"]) { // not use "parent" it will create infinity recursive
    const preparedData = this._prepareContainer(data, properties);
    this._roomEmit(this._room + 'rootContainer', preparedData);
  }

}