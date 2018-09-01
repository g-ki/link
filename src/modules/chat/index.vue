<template lang="html">
  <div class="chat">
    <div class="chat-left">
      <ChatList :chats="chats" />
    </div>
    <div class="chat-main">
      <Messages :messages="messages" />
      <ChatInput @submit="sendMessage" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import localStore from './store';

import ChatList from './components/ChatList.vue';
import Messages from './components/Messages.vue';
import ChatInput from './components/Input.vue';

export default {
  components: {
    ChatList,
    Messages,
    ChatInput,
  },

  computed: {
    ...mapState('chat', ['chats']),
    messages() {
      return this.chats.global.messages;
    },
  },

  methods: {
    ...mapActions('chat', ['init', 'initChat']),
    sendMessage(value) {
      this.$store.dispatch('chat/sendMessage', { chatId: 'global', value });
    },
  },

  created() {
    this.$store.registerModule('chat', localStore());
    this.init();
    this.initChat('global');
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  height: calc(100% - 75px);
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 50px;
  padding-bottom: 25px;
}

.chat-left {
  flex: 0 0 25%;
  max-width: 420px;
  min-width: 240px;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.chat-main .messages {
  flex: 1;
  height: 100%;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  overscroll-behavior: contain contain;
}
</style>
