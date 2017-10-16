<template>
  <div class="todo">
    <div class="table-row" v-bind:class="[doneClass]">
      <div class="day table-item">M</div>
      <div class="day table-item">T</div>
      <div class="day table-item">W</div>
      <div class="day table-item">Th</div>
      <div class="day table-item">F</div>

      <div class="title table-item" v-show="!isEditing" v-on:click="showForm">
        {{todo.title}}
      </div>
      <div class="ui form title table-item" v-show="isEditing" v-on:keyup.enter="hideForm">
        <input type="text" v-model="todo.title" />
      </div>

      <div class="modify table-item" v-show="!isEditing">
        <button class="ui basic gray button icon" v-show="todo.done" v-on:click="resetTodo" >
          <i title="Completed" class="checkmark gray icon"></i>
        </button>
        <button class="ui basic teal button icon" v-show="!todo.done" v-on:click="completeTodo" >
          <i title="Mark complete" class="checkmark green icon"></i>
        </button>
        <button class='ui basic gray button icon' v-on:click="deleteTodo">
          <i title="Delete todo" class="trash icon"></i>
        </button>
      </div>

      <div class="ui form modify table-item" v-show="isEditing">
        <button class="ui basic blue button icon" v-on:click="hideForm">
          <i title="Save changes" class="send icon"></i>
        </button>
        <button class="ui basic pink button icon" v-on:click="cancelForm">
          <i title="Cancel changes" class="ban icon"></i>
        </button>
        <button class='ui basic gray button icon' v-on:click="deleteTodo">
          <i title="Delete todo" class="trash icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
  export default {
    props: ['todo', 'index'],
    data() {
      return {
        isEditing: false,
      };
    },
    computed: {
      doneClass() {
        return this.todo.done ? 'is-done': 'is-pending';
      },
    },
    methods: {
      showForm() {
        this.isEditing = true;
        this.currentTitle = this.todo.title;
      },
      hideForm() {
        this.isEditing = false;
        if (this.todo.title !== this.currentTitle) {
          this.$emit('update-todo', this.todo);
        }
      },
      cancelForm() {
        if (this.currentTitle) {
          this.todo.title = this.currentTitle;
        }
        this.hideForm();
      },
      deleteTodo() {
        this.$emit('delete-todo', this.todo);
      },
      completeTodo() {
        this.todo.done = true;
        this.$emit('update-todo', this.todo);
      },
      resetTodo() {
        this.todo.done = false;
        this.$emit('update-todo', this.todo);
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
