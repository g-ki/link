import * as types from './types';
import * as net from '../networking';


const peerStore = ctx => ({
  get: x => ctx.state.peers[x],
  set: (...args) => ctx.dispatch('setPeer', ...args),
});


export const init = (ctx) => {
  ctx.commit(types.INIT);
  const { localPeerId } = ctx.state;
  net.acceptConnections(peerStore(ctx), localPeerId);
};


export const initChat = (ctx, chatId) => {
  ctx.commit(types.INIT_CHAT, chatId);
  const { localPeerId } = ctx.state;
  net.discoverPeers(peerStore(ctx), chatId, localPeerId);
};


export const setCurrentChat = (ctx, chatId) => {
  ctx.commit(types.SET_CURRENT_CHAT, chatId);
  ctx.dispatch('initChat', chatId);
};


export const setPeer = (ctx, { peerId, peer, chatId }) => {
  ctx.commit(types.ADD_PEER_TO_CHAT, { chatId, peerId });
  if (ctx.state.peers[peerId] === undefined) {
    ctx.commit(types.SET_PEER, { peerId, peer });

    // setup peer connection
    peer.on('data', (jsonMsg) => {
      const msg = JSON.parse(jsonMsg);
      ctx.commit(types.PUSH_MESSAGE, { msg });
    });
  }
};


export const sendMessage = (ctx, { chatId, value }) => {
  const chat = ctx.state.chats[chatId];
  const { peers, localPeerId } = ctx.state;

  const msg = {
    chatId,
    value,
    from: localPeerId,
    id: `${localPeerId}-${Date.now()}`,
  };
  ctx.commit(types.PUSH_MESSAGE, { chatId, msg });

  const jsonMsg = JSON.stringify(msg);
  chat.peers
    .map(x => peers[x])
    .filter(x => x.connected)
    .forEach(x => x.send(jsonMsg));
};
