<template lang="html">
  <div class="chat-input">
    <textarea
      v-model="value"
      @keyup.enter="submit"
      placeholder="Type a message..."
      autofocus></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },

  methods: {
    submit(event) {
      if (!event.shiftKey) {
        this.$emit('submit', this.value);
        this.value = '';
      }
    },
  },
};
</script>

<style scoped>
.chat-input {
  display: flex;
  flex-direction: row;
}

textarea {
  flex: 1;
  outline: none;
  border: none;
  resize: none;
  overflow: auto;
  width: 100%;
  min-height: 40px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  font-size: 14px;
  line-height: 1.28em;
  padding: 8px 8px;
  margin: 10px;
  border-radius: 5px;
}

textarea:focus {
  outline: none;
}
</style>
