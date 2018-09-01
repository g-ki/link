<template lang="html">
  <div class="chat-list-item">
    <div class="chat-name">
      {{ id }}
    </div>
    <div class="last-message" v-if="lastMessage">
      {{ lastMessageFrom }}: {{ lastMessage.value }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    chat: { type: Object, required: true },
    id: {},
  },


  computed: {
    ...mapState('chat', ['localPeerId']),
    lastMessage() {
      return this.chat.messages[this.chat.messages.length - 1];
    },
    lastMessageFrom() {
      if (this.lastMessage.from === this.localPeerId)
        return 'You';
      else
        return this.lastMessage.from;
    }
  }
};
</script>

<style scoped>
.chat-list-item {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #fff;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 15px;
}

.chat-name {
  font-weight: 600;
}

.last-message {
  color: rgba(153, 153, 153, 1);
  font-size: 13px;
  font-weight: 400;
}
</style>
