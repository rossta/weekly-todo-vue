<template>
  <div class='add-todo todo' v-show='isCreating'>
    <div class='table-row'>
      <todo-week
        class='day table-item'
        :isHeader=true
        @change='updateWeek'
        v-bind:week='week'>
      </todo-week>

      <div class='ui form title table-item' @keyup.enter='save'>
        <input v-model='titleText' type='text' ref='title' defaultValue=''>
      </div>

      <div class='modify table-item'>
        <button class='ui basic blue button icon' @click='save'>
          <i title='Save changes' class='send icon'></i>
        </button>
        <button class='ui basic red button icon' @click='reset'>
          <i title='Cancel changes' class='ban icon'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import TodoWeek from '@/components/TodoWeek';

export default {
  components: {
    TodoWeek,
  },

  data() {
    return {
      titleText: '',
      week: [],
      isCreating: true,
    };
  },

  methods: {
    openForm() {
      this.isCreating = true;
    },

    reset() {
      this.titleText = '';
      this.week = [];
    },

    save() {
      if (this.titleText.length) {
        const title = this.titleText;
        const week = this.week;

        this.$emit('add-todo', { title, week });

        this.reset();
      }
    },

    updateWeek(week) {
      this.week = week;
    },
  },
};
</script>

<style scoped>
.add-todo .table-row {
  border-bottom: 1px solid #AAA;
}
</style>
