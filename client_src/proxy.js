import ProxyServer from './ProxyServer';

const host = localStorage.getItem("proxyHost") || 'http://localhost:3000';
const proxy = new ProxyServer(host, 'client-');
proxy.connect();

export default proxy;