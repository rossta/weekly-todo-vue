<template>
  <div>
    <p>Completed tasks: {{todos.filter(todo => todo.done).length}}</p>
    <p>Pending tasks: {{todos.filter(todo => !todo.done).length}}</p>
    <todo
      v-for="(todo, index) in todos"
      :key="index"
      v-bind:todo="todo"
      v-bind:index="index"
      v-on:delete-todo="deleteTodo"
      >
    </todo>
  </div>
</template>

<script type="javascript">
import Todo from '@/components/Todo';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style></style>
