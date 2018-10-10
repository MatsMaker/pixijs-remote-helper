import MixinHelper from "./MixinHelper";

const host = localStorage.getItem("proxyHost") || 'http://localhost:3000';


let initer = setInterval(() => {
  if (PIXI) {
    new MixinHelper(host, PIXI);
    clearInterval(initer);
  }
}, 300);