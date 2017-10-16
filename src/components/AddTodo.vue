<template>
  <div>
    <div class="ui basic content center aligned segment" v-show="!isCreating">
      <button class="centered ui basic button icon" v-on:click="openForm">
        <i class="plus icon"></i>
      </button>
    </div>

    <div class="todo" v-show="isCreating">
      <div class="table-row">
        <div class="day table-item">M</div>
        <div class="day table-item">T</div>
        <div class="day table-item">W</div>
        <div class="day table-item">Th</div>
        <div class="day table-item">F</div>

        <div class="ui form title table-item" v-on:keyup.enter="sendForm">
          <input v-model="titleText" type="text" ref="title" defaultValue="">
        </div>

        <div class="modify table-item">
          <button class="ui basic blue button icon" v-on:click="sendForm">
            <i title="Save changes" class="send icon"></i>
          </button>
          <button class="ui basic red button icon" v-on:click="closeForm">
            <i title="Cancel changes" class="ban icon"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      titleText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length) {
        const title = this.titleText;

        this.$emit('add-todo', { title });

        this.titleText = '';
      }

      this.isCreating = false;
    },
  },
};
</script>

<style scoped>
.add-todo {
  text-align:center;
}
</style>
