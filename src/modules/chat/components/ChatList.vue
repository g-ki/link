<template lang="html">
  <div class="chat-list">
    <ul>
      <li>
        <div class="chat-list-item new-chat" @click="createRandomChat">
          + New Chat
        </div>
      </li>
      <li v-for="(chat, chatId) in chats" :key="chatId">
        <router-link :to="{ name: 'chat-show', params: { id: chatId } }" class="chat-link">
          <ChatListItem :chat="chat" :id="chatId" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ChatListItem from './ChatListItem.vue';

const randomString = () => Math.random().toString(36).substring(2, 15);

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

  methods: {
    createRandomChat() {
      const id = [1, 2, 3].map(randomString).join('-');
      this.$router.push({ name: 'chat-show', params: { id } });
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
  cursor: pointer;
}

.chat-link {
  text-decoration: none;
  color: inherit;
}

.chat-link:visited {
  color: inherit;
}
</style>
