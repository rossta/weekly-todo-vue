<template>
  <div class="todo">
    <div class="table-row">
      <div class="day table-item">M</div>
      <div class="day table-item">T</div>
      <div class="day table-item">W</div>
      <div class="day table-item">Th</div>
      <div class="day table-item">F</div>

      <div class="title table-item" v-show="!isEditing" v-on:click="showForm" >
        {{todo.title}}
      </div>
      <div class="ui form title table-item" v-show="isEditing" v-on:keyup.enter="hideForm">
        <input type="text" v-model="todo.title" />
      </div>

      <div class="complete table-item" v-show="!isEditing">
        <div class="ui blue basic button" v-show="todo.done" v-on:click="resetTodo" >
          Completed
        </div>
        <div class="ui green basic button" v-show="!todo.done" v-on:click="completeTodo" >
          Complete
        </div>
      </div>

      <div class="ui form table-item" v-show="isEditing">
        <button class="ui basic green button" v-on:click="hideForm">Done</button>
        <button class="ui basic red button" v-on:click="cancelForm">Cancel &times;</button>
      </div>

      <div class="extra table-item">
        <span class='trash icon' v-on:click="deleteTodo">
          <i class='trash icon'></i>
        </span>
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
    methods: {
      showForm() {
        this.isEditing = true;
        this.currentTitle = this.todo.title;
      },
      hideForm() {
        this.isEditing = false;
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
      },
      resetTodo() {
        this.todo.done = false;
      },
    },
  };
</script>

<style scoped>
  .todo {
    border-bottom: 1px solid #CCC;
  }
  .todo:nth-child(1) {
    border-top: 1px solid #CCC;
  }
  .table-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
  }
  .table-item {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 2;
    flex-basis: 0;
    padding-right: 1em;
  }
  .table-item.title {
    flex-grow: 4;
  }
  .table-item.day {
    flex: 0 0 50px;
    justify-content: center;
  }
</style>
