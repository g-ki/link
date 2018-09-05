<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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
  height: 100vh;
}

/* width */
::-webkit-scrollbar {
    width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
  width: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-clip: content-box;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 10px;
}

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
    background: red;
} */

</style>
