import signalhub from 'signalhub';

const hub = signalhub('link-chat', [
  'http://localhost:8888',
]);

export default hub;
