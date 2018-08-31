<template lang="html">
  <div class="chat">
    <Messages :messages="messages" />
    <ChatInput @submit="sendMsg" />
  </div>
</template>

<script>
import { connectToChatRoot } from './hub';
import { localPeerId, peers } from './peer';
import Messages from './components/Messages.vue';
import ChatInput from './components/Input.vue';

export default {
  components: {
    Messages,
    ChatInput,
  },

  data() {
    return {
      messages: [],
      chatPeers: {},
    };
  },

  methods: {
    sendMsg(value) {
      const msg = { from: localPeerId, value, id: `${localPeerId}-${Date.now()}` };
      for (const peerId in peers) {
        if (peers[peerId].connected) peers[peerId].send(JSON.stringify(msg));
      }
      this.messages.push(msg);
    },
  },

  created() {
    connectToChatRoot('chatRoomId', (msg) => {
      this.messages.push(JSON.parse(msg));
    });
  },
};
</script>

<style lang="css">
</style>
