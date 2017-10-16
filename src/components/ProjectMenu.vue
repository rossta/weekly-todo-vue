<template>
  <div class='ui fluid demo tabular menu'>
    <router-link v-for='project in projects' :to='project.name' class='item' active-class='active' :key='project.name'>
      {{project.title}}
      <div class='ui label'>{{project.pendingCount}}</div>
    </router-link>
    <div class='item'>
      <div class='ui transparent icon input'>
        <input type='text' placeholder='Search TODOS...'>
        <i class='search icon'></i>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    projects: {
      default: [],
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
  .tabular.menu {
    margin-bottom: 0;
  }
</style>
