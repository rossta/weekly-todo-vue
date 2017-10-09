<template>
  <div class="weekly">
    <h1 class="centered">{{ msg }}</h1>
    <div class="ui stackable very relaxed grid container">
      <div class="three column computer one column mobile row">
        <div class="four wide column">
          <div class="ui vertical menu">
            <div class="active teal item">
              Home
              <div class="ui teal label">3</div>
            </div>
            <a class="item">
              Work
              <div class="ui label">1</div>
            </a>
            <div class="item">
              <div class="ui transparent icon input">
                <input type="text" placeholder="Search TODOS...">
                <i class="search icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="twelve wide column">
          <todo-list v-bind:todos="todosBy('Home')"></todo-list>
          <todo-list v-bind:todos="todosBy('Work')"></todo-list>
          <create-todo v-on:add-todo="addTodo"></create-todo>
        </div>
      </div>
    </div>
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
        project: 'Home',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Work',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Work',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Home',
        done: false,
      }],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    todosBy(project) {
      return this.todos.filter(todo => todo.project === project);
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

  h1 {
    margin-bottom: 2rem;
    text-align: center;
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
