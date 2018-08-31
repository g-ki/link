import signalhub from 'signalhub';
import Peer from 'simple-peer';
import { localPeerId, peers } from './peer';

const hub = signalhub('link-chat', [
  'http://localhost:8888',
]);


hub.subscribe(localPeerId).on('data', ({ peerId, signal }) => {
  let peer = peers[peerId];
  if (peer === undefined) {
    peer = new Peer({ trickle: false });
    peers[peerId] = peer;
    peer.on('signal', (signalBack) => {
      hub.broadcast(peerId, { peerId: localPeerId, signal: signalBack });
    });
  }
  peer.signal(signal);

  peer.on('connect', () => {
    console.log(`Connected to ${peerId}`);
  });
});


export const connectToChatRoot = (chatRoomId, onData) => {
  hub.broadcast(chatRoomId, localPeerId);

  hub.subscribe(chatRoomId).on('data', (peerId) => {
    if (peerId === localPeerId) return;
    let peer = peers[peerId];
    if (peer === undefined) {
      peer = new Peer({ initiator: true, trickle: false });
      peers[peerId] = peer;
      peer.on('signal', (signal) => {
        hub.broadcast(peerId, { peerId: localPeerId, signal });
      });
      peer.on('data', onData);
    }
  });
};

export default hub;
