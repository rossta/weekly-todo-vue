<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { sync } from '@/database';

export default {
  name: 'app',

  created() {
    sync();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}
button.icon {
  transition: all .2s ease;
}
button.icon:hover {
  transform: scale(1.1);
}
i.icon, i.label {
  font-style: normal;
  width: 1em;
  display: inherit;
}
</style>
