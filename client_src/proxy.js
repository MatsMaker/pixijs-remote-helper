import ProxyServer from './ProxyServer';

let proxy;
if (!proxy) {
  const host = localStorage.getItem("proxyHost") || 'http://localhost:3000';
  proxy = new ProxyServer(host, 'client-');
  proxy.connect();
}

export default proxy;