<template>
  <div>
    <todo-week-day
      v-for='day in weekDays'
      :key='day'
      :day='day'
      v-bind:isOn='isDayOn(day)'
      v-on:toggle-day='toggleDay'
      class='day table-item'
      ></todo-week-day>
  </div>
</template>

<script>
import TodoWeekDay from '@/components/TodoWeekDay';

export default {
  props: ['week'],

  data() {
    return {
      weekDays: ['M', 'T', 'W', 'R', 'F'],
    };
  },

  components: {
    TodoWeekDay,
  },

  computed: {
    weekSet() {
      return new Set(this.week || []);
    },
  },

  methods: {
    isDayOn(day) {
      return this.weekSet.has(day);
    },

    toggleDay(day) {
      const week = this.weekSet;
      if (week.has(day)) {
        week.delete(day);
      } else {
        week.add(day);
      }
      return this.$emit('change', [...week]);
    },

  },
};
</script>
