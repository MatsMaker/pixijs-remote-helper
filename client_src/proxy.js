import ProxyServer from './ProxyServer';

let proxy;
proxy = true;
const host = localStorage.getItem("proxyHost") || 'http://localhost:3000';
console.log('proxy is connecting to:', host);
proxy = new ProxyServer(host, 'client-', 'mixin-');
proxy.connect();

proxy.cache = { // TODO need make it more better
  activeItem: null,
  freeze: false,
  search: "",
};

export default proxy;