<template>
  <div class='todo'>
    <div class='table-row' v-bind:class='[ doneClass ]'>
      <todo-week
        class='day table-item'
        v-bind:week='todo.week'
        @change='updateWeek'>
      </todo-week>

      <div class='title table-item' v-show='!isEditing' @click='showForm'>
        {{todo.title}}
      </div>
      <div class='ui form title table-item' v-show='isEditing' @keyup.enter='hideForm'>
        <input type='text' :value='todo.title' @input=changeTitle />
      </div>

      <div class='modify table-item' v-show='!isEditing'>
        <button class='ui basic gray button icon' v-show='todo.done' @click='resetTodo' >
          <i title='Completed' class='checkmark gray icon'></i>
        </button>
        <button class='ui basic teal button icon' v-show='!todo.done' @click='completeTodo' >
          <i title='Mark complete' class='checkmark green icon'></i>
        </button>
        <router-link class='ui basic green button icon' :to='{ name: "edit-todo", params: { id: todo._id } }'>
          <i title='Edit' class='edit icon'></i>
        </router-link>
        <button class='ui basic gray button icon' @click='deleteTodo'>
          <i title='Delete todo' class='trash icon'></i>
        </button>
      </div>

      <div class='ui form modify table-item' v-show='isEditing'>
        <button class='ui basic blue button icon' @click='hideForm'>
          <i title='Save changes' class='send icon'></i>
        </button>
        <button class='ui basic pink button icon' @click='cancelForm'>
          <i title='Cancel changes' class='ban icon'></i>
        </button>
        <button class='ui basic gray button icon' @click='deleteTodo'>
          <i title='Delete todo' class='trash icon'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
  import TodoWeek from '@/components/TodoWeek';

  export default {
    props: ['todo'],

    components: {
      TodoWeek,
    },

    data() {
      return {
        isEditing: false,
        inputTitle: undefined,
      };
    },
    computed: {
      title: {
        get() {
          return this.inputTitle || this.todo.title;
        },
        set(title) {
          this.inputTitle = title;
        },
      },

      doneClass() {
        return this.todo.done ? 'is-done': 'is-pending';
      },

      todoWeek() {
        return new Set(this.todo.week || []);
      },
    },
    methods: {
      updateWeek(week) {
        this.updateTodo({ week });
      },

      isDayOn(day) {
        return this.todoWeek.has(day);
      },

      toggleDay(day) {
        const week = this.todoWeek;
        week.has(day) ? week.delete(day) : week.add(day);
        this.updateTodo({ week: [...week] });
      },

      showForm() {
        this.isEditing = true;
        this.currentTitle = this.title;
      },

      hideForm() {
        this.isEditing = false;
        if (this.todo.title !== this.currentTitle) {
          const title = this.todo.title;
          this.updateTodo({ title });
        }
      },

      cancelForm() {
        if (this.currentTitle) {
          const title = this.currentTitle;
          this.changeTodo({ title });
        }
        this.hideForm();
      },

      changeTitle(e) {
        const title = e.target.value.trim();
        this.changeTodo({ title });
      },
      completeTodo() {
        const done = true;
        this.updateTodo({ done });
      },
      resetTodo() {
        const done = false;
        this.updateTodo({ done });
      },
      changeTodo(changes) {
        this.$store.dispatch('changeTodo', { todo: this.todo, changes });
      },
      updateTodo(changes) {
        this.$store.dispatch('updateTodo', { todo: this.todo, changes });
      },
      deleteTodo() {
        this.$store.dispatch('deleteTodo', this.todo);
      },
    },
  };
</script>

<style>
  .table-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    min-height: 4em;
    border-bottom: 1px solid #CCC;
  }
  .table-row.is-done {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .table-item {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 2;
    flex-basis: 0;
    padding-right: 1em;
  }
  .table-item.title {
    flex-grow: 6;
  }
  .table-item.modify {
    flex-grow: 3;
  }
  .table-item.day {
    flex: 0 0 35px;
    justify-content: center;
  }
</style>
