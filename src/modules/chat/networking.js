import Peer from 'simple-peer';


export const conncetToPeer = (setPeer, hub, localPeerId) => (peerId, options) => {
  const peer = new Peer({ ...options, trickle: false });
  setPeer({ peerId, peer });
  console.log(`${localPeerId} -> ${peerId}`);
  peer.on('signal', (signal) => {
    hub.broadcast(peerId, { peerId: localPeerId, signal });
  });
  return peer;
};


export const listenForSignals = (getPeer, connectTo) => ({ peerId, signal }) => {
  console.log('listenForSignals');
  let peer = getPeer(peerId);
  if (peer === undefined) {
    peer = connectTo(peerId);
  }
  peer.signal(signal);
};


export const sendSignal = (getPeer, connectTo, localPeerId) => (peerId) => {
  console.log('sendSignal');
  if (peerId !== localPeerId) {
    let peer = getPeer(peerId);
    if (peer === undefined) {
      peer = connectTo(peerId, { initiator: true });
    }
  }
};


export const connectToHelloChanel = (hub, sayHello) => (chanelName, hello) => {
  console.log('hey all');
  hub.broadcast(chanelName, hello);
  // on hello
  hub.subscribe(chanelName).on('data', sayHello);
};
