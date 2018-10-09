import PixiMixin from "./PixiMixin";
import ProxyServer from './ProxyServer';

const host = localStorage.getItem("proxyHost") || 'http://localhost:3000';
const proxy = new ProxyServer(host, 'mixin-');


let initer = setInterval(() => {
  if (PIXI) {
    proxy.connect();

    const pixiMixin = new PixiMixin(window.PIXI);
    pixiMixin.enable();

    window.pixiMixin = pixiMixin;

    window.removelistener = pixiMixin.registerHook(
      pixiMixin.hooksTypes.afterRender,
      (container, ...data) => {
        proxy.sentRootContainer(container, ["name", "visible"]);
      },
      300
    );

    pixiMixin.registerHook(
      pixiMixin.hooksTypes.beforeRender,
      function(container, ...data) {
        proxy.addListener('mixin-updateItem', (params) => {
          container[params.property] = params.value;
        });
      },
      300
    );

    clearInterval(initer);
  }
}, 300);