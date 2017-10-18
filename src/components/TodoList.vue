<template>
  <div>
    <div class="todo-list table">
      <add-todo v-on:add-todo='addTodo'></add-todo>
      <todo-list-todo
        v-for="(todo, index) in todos"
        :key="index"
        v-bind:todo="todo"
        v-bind:index="index"
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
import TodoListTodo from '@/components/TodoListTodo';
import AddTodo from '@/components/AddTodo';

export default {
  props: ['todos'],
  components: {
    AddTodo,
    TodoListTodo,
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
