<template>
  <div class='todo-list table'>
    <todo-new-item @add-todo='addTodo'></todo-new-item>
    <todo-item
      v-for='(todo) in filteredTodos'
      v-bind:todo=todo
      :key='todo._id'
      >
    </todo-item>
    <router-view></router-view>
  </div>
</template>

<script type="javascript">
import { mapGetters } from 'vuex';

import TodoItem from '@/components/TodoItem';
import TodoNewItem from '@/components/TodoNewItem';

const filters = {
  ALL: todos => todos,
  ACTIVE: todos => todos.filter(todo => !todo.done),
  COMPLETED: todos => todos.filter(todo => todo.done),
};

export default {
  props: {
    project: {
      type: Object,
      required: true,
    }
  },

  components: {
    TodoItem,
    TodoNewItem,
  },

  data() {
    return {
      filters,
    }
  },

  computed: {
    filter() {
      return this.$route.query.filter;
    },

    filteredTodos() {
      const filter = this.filter || 'ALL';
      return filters[filter.toUpperCase()](this.todos);
    },

    todos() {
      return this.projectTodos(this.project);
    },

    ...mapGetters([
      'projectTodos',
    ]),
  },

  methods: {
    addTodo(todo) {
      this.$emit('add-todo', todo);
    },
  },
};
</script>

<style scoped>
.table {
  display: flex;
  flex-flow: column nowrap;
}
</style>
