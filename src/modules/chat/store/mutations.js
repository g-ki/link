import Vue from 'vue';
import * as types from './types';

export default {
  [types.INIT](state) {
    if (state.localPeerId === null) {
      const randomString = () => Math.random().toString(36).substring(2, 15);
      Vue.set(state, 'localPeerId', randomString() + randomString());
    }
  },

  [types.INIT_CHAT](state, chatId) {
    if (state.chats[chatId] === undefined) {
      Vue.set(state.chats, chatId, { peers: [], messages: [] });
    }
  },

  [types.SET_CURRENT_CHAT](state, chatId) {
    Vue.set(state, 'currentChat', chatId);
  },

  [types.SET_PEER](state, { peerId, peer }) {
    Vue.set(state.peers, peerId, peer);
  },

  [types.PUSH_MESSAGE](state, { msg }) {
    state.chats[msg.chatId].messages.push(msg);
  },

  [types.ADD_PEER_TO_CHAT](state, { chatId, peerId }) {
    if (!state.chats[chatId].peers.includes(peerId)) {
      state.chats[chatId].peers.push(peerId);
    }
  },
};
