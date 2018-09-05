<template lang="html">
  <div class="chat">
    <div class="chat-left">
      <ChatList :chats="chats" />
    </div>
    <div class="chat-main">

      <template v-if="currentChat">
        <Messages :messages="currentMessages" />
        <ChatInput @submit="sendMessage" />
      </template>

      <div v-else class="no-chat">
        <h2>+ Create New Chat</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
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
    ...mapState('chat', ['chats', 'currentChat']),
    ...mapGetters('chat', ['currentMessages']),
  },

  methods: {
    ...mapActions('chat', ['init', 'initChat', 'setCurrentChat']),
    sendMessage(value) {
      this.$store.dispatch('chat/sendMessage', { chatId: this.currentChat, value });
    },
  },

  created() {
    this.$store.registerModule('chat', localStore());
    this.init();
    const chatId = this.$route.params.id;
    if (chatId) { this.setCurrentChat(chatId); }
  },

  watch: {
    $route() {
      const chatId = this.$route.params.id;
      this.setCurrentChat(chatId);
    },
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
  overflow-y: auto;
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
  padding-right: 8px;
}

.no-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.no-chat h2 {
  color: rgba(153, 153, 153, 1);
}

.chat-list {
  padding-right: 8px;
}
</style>
