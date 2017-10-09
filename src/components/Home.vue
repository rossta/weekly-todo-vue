<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <create-todo v-on:add-todo="addTodo"></create-todo>
    <todo-list v-bind:todos="todos"></todo-list>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList';
import CreateTodo from '@/components/CreateTodo';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Week',
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.push(todo);
    },
  },
  components: {
    TodoList,
    CreateTodo,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
