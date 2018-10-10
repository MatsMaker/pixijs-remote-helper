import ProxyServer from './ProxyServer';
import PixiProxy from './PixiProxy';
import PixiInjector from './PixiInjector';


export default class MixinHelper {

  constructor(hostListenre, PIXI) {
    this._host = hostListenre;
    this._proxyServer = new ProxyServer(hostListenre, 'mixin-');
    this._proxyPixi = new PixiProxy();

    this._frequency = 300;
    this._propertyListForWatch = ["name", "visible"];

    this._run();
  }

  _run() {
    this._proxyServer.connect();

    this._pixiInjector = new PixiInjector(window.PIXI);
    this._pixiInjector.enable();

    this._initHooks();
  }

  _initHooks() {

    this._pixiInjector.registerBeforeRenderHook(
      this.onGotRequestForUpdateItem.bind(this),
      this._frequency
    );

    this._pixiInjector.registerAfterRenderHook(
      this.sendRootContainer.bind(this),
      this._frequency
    );

  }

  sendRootContainer(container) {
    const data = this._proxyPixi.prepareContainer(container, this._propertyListForWatch);
    this._proxyServer.sentRootContainer(data);
  }

  onGotRequestForUpdateItem(container) {
    this._proxyServer.addListener('mixin-updateItem', (params) => {
      const itemToUpdate = this._proxyPixi.getItemByIndex(params.path);
      itemToUpdate[params.property] = params.value;
    });
  }

}