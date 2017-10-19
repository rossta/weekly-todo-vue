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
      <div class="table-row todo-list-stats">
        Completed tasks: {{todos.filter(todo => todo.done).length}}
        &middot;
        Pending tasks: {{todos.filter(todo => !todo.done).length}}
      </div>
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
    filteredTodos() {
      const filter = 'ALL';
      return filters[filter](this.todos);
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
