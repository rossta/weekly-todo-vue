<template>
  <div class="ui centered card">
    <div class="content" v-show="!isEditing">
      <div class="header">{{todo.title}}</div>
      <div class="meta">{{todo.project}}</div>
      <div class="extra content">
        <span class='right floated trash icon' v-on:click="deleteTodo">
          <i class='trash icon'></i>
        </span>
        <span class="right floated edit icon" v-on:click="showForm">
          <i class="edit icon"></i>
        </span>
      </div>
    </div>

    <div class="content" v-show="isEditing">
      <div class="ui form">
        <div class="field">
          <label for="">Title</label>
          <input type="text" v-model="todo.title" />
        </div>
        <div class="field">
          <label for="">Project</label>
          <input type="text" v-model="todo.project" />
        </div>
        <div class="ui two button attached buttons">
          <button class="ui basic blue button" v-on:click="hideForm">Close &times;</button>
        </div>
      </div>
    </div>

    <div v-show="!isEditing">
      <div
        class="ui bottom attached green basic button"
        v-show="todo.done"
        v-on:click="resetTodo"
        >
        Completed
      </div>
      <div
        class="ui bottom attached red basic button"
        v-show="!todo.done"
        v-on:click="completeTodo"
        >
        Complete
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
      },
      hideForm() {
        this.isEditing = false;
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

<style></style>
