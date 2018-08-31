<template lang="html">
  <div class="messages">
    <p v-for="msg of messages" :key="msg.id">
      {{ msg.from }}: {{ msg.value }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    messages: { type: Array, required: true },
  },
}
</script>

<style lang="css">
</style>
