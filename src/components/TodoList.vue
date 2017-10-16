<template>
  <div>
    <div class="todo-list table">
      <todo-list-todo
        v-for="(todo, index) in todos"
        :key="index"
        v-bind:todo="todo"
        v-bind:index="index"
        v-on:delete-todo='deleteTodo'
        v-on:update-todo='updateTodo'
        >
      </todo-list-todo>
    </div>
    <div class="table-row todo-list-stats">
      Completed tasks: {{todos.filter(todo => todo.done).length}}
      &middot;
      Pending tasks: {{todos.filter(todo => !todo.done).length}}
    </div>
  </div>
</template>

<script type="javascript">
import TodoListTodo from '@/components/TodoListTodo';

export default {
  props: ['todos'],
  components: {
    TodoListTodo,
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    updateTodo(todo) {
      this.$emit('update-todo', todo);
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
