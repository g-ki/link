<template lang="html">
  <div class="chat-input">
    <textarea v-model="value" rows="8" cols="80" @keyup.enter="submit"></textarea>
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
    submit() {
      this.$emit('submit', this.value);
      this.value = '';
    },
  },
};
</script>

<style lang="css">
</style>
