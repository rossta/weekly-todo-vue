<template>
  <h2 class='centered'>Week of {{formattedWeek}}</h2>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters } from 'vuex';

import { startOfWeek } from '@/utils/dates';

export default {
  computed: {
    formattedWeek() {
      return format(this.startOfWeek, 'MMM Do, YYYY');
    },

    startOfWeek() {
      return startOfWeek(this.now);
    },

    ...mapGetters([
      'now',
    ]),
  },
};
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  h2 {
    margin-bottom: .5rem;
    text-align: center;
  }
</style>
