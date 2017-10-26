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
</style>
