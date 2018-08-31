<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import Chat from '@/modules/chat';

export default {
  name: 'app',
  components: {
    Chat,
  },
};
</script>

<style>
html, body {
  background-color: #f5f5fb;
  margin: 0;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
