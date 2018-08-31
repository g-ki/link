import Peer from 'simple-peer';
import hub from './hub';


const sendTo = (to, data, callback) => hub.broadcast(to, data, callback);
const subscribe = (to, onData) => hub.subscribe(to).on('data', onData);


export const connect = (setPeer, localPeerId, peerId, options) => {
  const peer = new Peer({ ...options, trickle: false });
  peer.on('signal', (signal) => {
    sendTo(peerId, { peerId: localPeerId, signal });
  });
  console.log(`connect ${localPeerId} => ${peerId}`);
  setPeer({ peerId, peer });
  return peer;
};


export const discoverPeers = (peers, chanelName, localPeerId) => {
  sendTo(chanelName, localPeerId); // introduce
  // conncet to new peers
  subscribe(chanelName, (peerId) => {
    if (peerId !== localPeerId && peers.get(peerId) === undefined) {
      connect(peers.set, localPeerId, peerId, { initiator: true });
    }
  });
};


export const acceptConnections = (peers, localPeerId) => {
  subscribe(localPeerId, ({ peerId, signal }) => {
    let peer = peers.get(peerId);
    if (peer === undefined) {
      peer = connect(peers.set, localPeerId, peerId);
    }
    peer.signal(signal);
  });
};
