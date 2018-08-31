import Peer from 'simple-peer';
import hub from './hub';


const sendTo = (to, data, callback) => hub.broadcast(to, data, callback);
const subscribe = (to, onData) => hub.subscribe(to).on('data', onData);


const createSession =
  (chatId, localPeerId, peerId) => ({ chatId, localPeerId, peerId });


export const connect = (session, options) => {
  console.log('connecting... ', session.peerId);
  const peer = new Peer({ ...options, trickle: false });

  peer.on('signal', (signal) => {
    sendTo(
      session.peerId,
      { peerId: session.localPeerId, chatId: session.chatId, signal },
    );
  });

  peer.on('connect', () => {
    console.log(`connect ${session.localPeerId} => ${session.peerId}`);
  });

  peer.on('close', () => {
    console.log(`close ${session.localPeerId} => ${session.peerId}`);
  });

  peer.on('error', (err) => {
    console.warn(`error ${session.localPeerId} => ${session.peerId}`);
    console.error(err);
  });

  return peer;
};


export const discoverPeers = (peers, chanelName, localPeerId) => {
  console.log('introduce', localPeerId);
  sendTo(chanelName, localPeerId); // introduce
  // conncet to new peers
  subscribe(chanelName, (peerId) => {
    console.log('discoverd peer', peerId);
    if (peerId !== localPeerId && peers.get(peerId) === undefined) {
      console.log('try to connect', peerId);
      const session = createSession(chanelName, localPeerId, peerId);
      const peer = connect(session, { initiator: true });
      peers.set({ chatId: session.chatId, peerId: session.peerId, peer });
    }
  });
};


export const acceptConnections = (peers, localPeerId) => {
  subscribe(localPeerId, ({ peerId, signal, chatId }) => {
    let peer = peers.get(peerId);
    if (peer === undefined) {
      const session = createSession(chatId, localPeerId, peerId);
      peer = connect(session);
      peers.set({ chatId: session.chatId, peerId: session.peerId, peer });
    }
    peer.signal(signal);
  });
};
