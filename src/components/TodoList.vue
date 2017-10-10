<template>
  <div>
    <p>
      Completed tasks: {{todos.filter(todo => todo.done).length}}
      &middot;
      Pending tasks: {{todos.filter(todo => !todo.done).length}}
    </p>
    <div class="todo-list table">
      <todo
        v-for="(todo, index) in todos"
        :key="index"
        v-bind:todo="todo"
        v-bind:index="index"
        v-on:delete-todo='deleteTodo'
        >
      </todo>
    </div>
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
      this.$emit('delete-todo', todo);
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
