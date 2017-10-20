<template>
  <div>
    <div class="todo-list table">
      <add-todo v-on:add-todo='addTodo'></add-todo>
      <todo-list-todo
        v-for="(todo, index) in filteredTodos"
        v-bind:todo=todo
        :key="todo._id"
        >
      </todo-list-todo>
    </div>
  </div>
</template>

<script type="javascript">
import { mapGetters } from 'vuex';

import TodoListTodo from '@/components/TodoListTodo';
import AddTodo from '@/components/AddTodo';

const filters = {
  ALL: todos => todos,
  ACTIVE: todos => todos.filter(todo => !todo.done),
  COMPLETED: todos => todos.filter(todo => todo.done),
};

export default {
  props: ['project'],
  components: {
    AddTodo,
    TodoListTodo,
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
