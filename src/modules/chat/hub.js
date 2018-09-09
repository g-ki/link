import signalhub from 'signalhub';

const { host, protocol } = window.location;
const port = '8888';

const hub = signalhub('link-chat', [
  `${protocol}//${host}:${port}`,
]);

export default hub;
