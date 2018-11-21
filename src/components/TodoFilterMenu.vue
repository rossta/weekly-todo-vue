<template>
  <div class='ui fluid secondary menu'>
    <router-link
      v-for='project in projects'
      :to='project.name'
      class='item'
      active-class='active'
      :key='project.name'
      >
      {{project.title}}
      <div class='ui label'>{{pendingCount(project.name)}}</div>
    </router-link>
    <div class="item"> &middot; </div>
    <router-link
      v-for='filter in filters'
      :to='{ name: $route.name, query: queryFilter(filter) }'
      class='item'
      v-bind:class='[ isFilterQuery(filter) ? activeClass : "" ]'
      :key='filter'
      >
      {{titleize(filter)}}
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
import { mapGetters } from 'vuex';
import { titleize } from '@/utils/strings';

export default {
  data() {
    return {
      activeClass: 'active',
      filters: ['active', 'completed', 'all'],
    };
  },

  computed: {
    ...mapGetters(['projectTodos', 'projects']),
  },

  methods: {
    titleize,

    isFilterQuery(filter) {
      if (this.$route.query.filter === undefined) {
        return filter === 'all';
      }
      return this.$route.query.filter === filter;
    },

    queryFilter(filter) {
      return Object.assign({}, this.$route.query, { filter });
    },

    queryDone(done) {
      return Object.assign({}, this.$route.query, { done });
    },

    pendingCount(project) {
      return this.projectTodos(project).filter(todo => !todo.done).length;
    },
  },
};
</script>

<style scoped>
  .tabular.menu {
    margin-bottom: 0;
  }
</style>
