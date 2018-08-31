<template lang="html">
  <div class="chat">
    <Messages :messages="messages" />
    <ChatInput @submit="sendMessage" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import localStore from './store';

import Messages from './components/Messages.vue';
import ChatInput from './components/Input.vue';

export default {
  components: {
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
  flex-direction: column;
  height: 100vh;
}

.chat .messages {
  flex: 1;
  height: 100%;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  overscroll-behavior: contain contain;
}
</style>
