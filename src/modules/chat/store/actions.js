import * as types from './types';
import hub from '../hub';
import * as net from '../networking';

export const setPeer = (ctx, { peerId, peer }) => {
  if (ctx.state.peers[peerId] === undefined) {
    ctx.commit(types.SET_PEER, { peerId, peer });
    ctx.commit(types.ADD_PEER_TO_CHAT, { chatId: 'global', peerId });

    // setup peer connection
    peer.on('data', (jsonMsg) => {
      const msg = JSON.parse(jsonMsg);
      ctx.commit(types.PUSH_MESSAGE, { chatId: msg.chatId, msg });
    });
  }
};


const getPeer = ctx => x => ctx.state.peers[x];

const connectTo = ctx => net.conncetToPeer(
  (...args) => ctx.dispatch('setPeer', ...args),
  hub,
  ctx.state.localPeerId,
);

const sayHello =
  ctx => net.sendSignal(getPeer(ctx), connectTo(ctx), ctx.state.localPeerId);

const connectToChat = ctx => net.connectToHelloChanel(hub, sayHello(ctx));


export const init = (ctx) => {
  ctx.commit(types.INIT);
  const listenForSignals = net.listenForSignals(getPeer(ctx), connectTo(ctx));
  hub.subscribe(ctx.state.localPeerId).on('data', listenForSignals);
};


export const initChat = (ctx, chatId) => {
  ctx.commit(types.INIT_CHAT, chatId);
  connectToChat(ctx)(chatId, ctx.state.localPeerId);
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
