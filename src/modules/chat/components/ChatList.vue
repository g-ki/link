<template lang="html">
  <div class="chat-list">
    <ul>
      <li>
        <div class="chat-list-item new-chat">
          + New Chat
        </div>
      </li>
      <li v-for="(chat, chatId) in chats" :key="chatId">
        <ChatListItem :chat="chat" :id="chatId" />
      </li>
    </ul>
  </div>
</template>

<script>
import ChatListItem from './ChatListItem.vue';

export default {
  components: {
    ChatListItem,
  },

  props: {
    chats: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.chat-list ul {
  list-style: none;
  padding: 0;
}

.new-chat {
  text-align: center;
  box-shadow: none;
  background-color: #fff;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 15px;
}
</style>
