import Peer from 'simple-peer';

const randomString = () => Math.random().toString(36).substring(2, 15);

export const localPeerId = randomString();
export const peers = {};

console.info(`ID: ${localPeerId}`);
