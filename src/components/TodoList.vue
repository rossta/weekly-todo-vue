<template>
  <div>
    <div class="todo-list table">
      <add-todo v-on:add-todo='addTodo'></add-todo>
      <todo-list-todo
        v-for="(_id, index) in todos.map(t => t._id)"
        :key="_id"
        v-bind:id="_id"
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
  props: ['project'],
  components: {
    AddTodo,
    TodoListTodo,
  },

  computed: {
    todos() {
      return this.$store.getters.projectTodos(this.project);
    },
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
