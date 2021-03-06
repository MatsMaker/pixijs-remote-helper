import ProxyServer from './ProxyServer';
import PixiProxy from './PixiProxy';
import PixiInjector from './PixiInjector';
import { parseValueFromString } from '../utils/transporter';


export default class MixinHelper {

  constructor(hostListenre) {
    this._host = hostListenre;
    this._proxyServer = new ProxyServer(hostListenre, 'mixin-', 'client-');
    this._proxyPixi = new PixiProxy();

    this._frequency = 150;
    this._propertyListForWatch = ["name", "visible", "x", "y", "texture", "width", "height", "textureCacheIds", "defaultAnchor", "scale", "position", "rotation"]; //TODO fix 'scale' got property
  }

  autoStart() {
    this.autoStart = () => { }
    let initer = setInterval(() => {
      if (PIXI) {
        this.run();
        clearInterval(initer);
      }
    }, 300);
  }

  run() {
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

    this._pixiInjector.registerBeforeRenderHook(
      this.onSelectItem.bind(this),
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
    this._proxyServer.addListener('updateItem', (params) => {
      const value = parseValueFromString(params.value);
      const itemToUpdate = this._proxyPixi.getItemByIndex(params.itemIndex);
      let propertyLink = itemToUpdate;
      const propertyPath = params.property.split('.');
      propertyPath.forEach((key, i, a) => {
        if (i < a.length - 1) {
          propertyLink = propertyLink[key];
        }
      });
      propertyLink[propertyPath[propertyPath.length - 1]] = value;
      this._proxyServer.updateItem(params);
    });
  }

  onSelectItem() {
    this._proxyServer.addListener('selectItem', (params) => {
      const selectedItem = this._proxyPixi.getItemByIndex(params.itemIndex);
      const data = this._proxyPixi.prepareContainer(selectedItem, this._propertyListForWatch);
      this._proxyServer.selectItem(data);
    });
  }

}