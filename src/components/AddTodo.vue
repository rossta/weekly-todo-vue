<template>
  <div class='add-todo todo' v-show='isCreating'>
    <div class='table-row'>
      <div class='day table-item'>M</div>
      <div class='day table-item'>T</div>
      <div class='day table-item'>W</div>
      <div class='day table-item'>Th</div>
      <div class='day table-item'>F</div>

      <div class='ui form title table-item' v-on:keyup.enter='sendForm'>
        <input v-model='titleText' type='text' ref='title' defaultValue=''>
      </div>

      <div class='modify table-item'>
        <button class='ui basic blue button icon' v-on:click='sendForm'>
          <i title='Save changes' class='send icon'></i>
        </button>
        <button class='ui basic red button icon' v-on:click='closeForm'>
          <i title='Cancel changes' class='ban icon'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      titleText: '',
      isCreating: true,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
    },
    sendForm() {
      if (this.titleText.length) {
        const title = this.titleText;

        this.$emit('add-todo', { title });

        this.titleText = '';
      }
    },
  },
};
</script>

<style scoped>
.add-todo .table-row {
  border-bottom: 1px solid #AAA;
}
</style>
