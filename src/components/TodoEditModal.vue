<template>
  <ui-modal
    v-on:close='close'
    >
    <h2 slot='header'>Edit TODO</h2>

    {{todo.title}}
  </ui-modal>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import UiModal from './UiModal';

export default {
  components: {
    UiModal,
  },

  computed: {
    todo() {
      return this.find(this.$route.params.id);
    },

    ...mapGetters(['find']),
  },

  methods: {
    close() {
      this.$router.push({ name: 'home', params: { project: this.$route.params.project }, query: this.$route.query });
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
</style>
