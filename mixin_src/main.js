import MixinHelper from "./MixinHelper";

const host = window.PIXI_HELPER_PROXY_HOST || localStorage.getItem("pixiHelperProxyHost") || 'http://localhost:3010';

new MixinHelper(host).autoStart();