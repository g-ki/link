<template lang="html">
  <div class="messages">
    <div v-for="msg of messages" :key="msg.id" class="message">
      <h5 class="from" v-if="msg.from !== localPeerId">
        {{ msg.from }}
      </h5>

      <div class="message-content clearfix">
        <div :class="['message-bubble', {'from-self': msg.from === localPeerId }]">
          {{ msg.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    messages: { type: Array, required: true },
  },

  computed: {
    ...mapState('chat', ['localPeerId']),
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 15px;
}

.message h5.from {
  color: rgba(0, 0, 0, .4);
  font-size: 12px;
  font-weight: normal;
  line-height: 1.1;
  margin-bottom: 3px;
  overflow: hidden;
  padding-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-bubble {
  float: left;
  clear: left;
  background-color: #eae8ed;
  color: #454d57;
  padding: 6px 12px;
  border-radius: 1.3em;
  max-width: 55%;
  word-break: break-word;
}

.from-self {
  float: right;
  clear: right;
  background-color: #2a8bf2;
  color: #fff;
}
</style>
