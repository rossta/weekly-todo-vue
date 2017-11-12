<template>
  <div>
    <todo-week-day
      v-for='(day, index) in daysOfWeek'
      :key='index'
      :day='day'
      :index='index'
      :isToday='isToday(index)'
      :isHeader=isHeader
      v-bind:isOn='isDayOn(day)'
      v-on:toggle-day='toggleDay'
      class='day table-item'
      ></todo-week-day>
  </div>
</template>

<script>
import TodoWeekDay from '@/components/TodoWeekDay';

const daysOfWeekData = [{
  label: 'M',
  color: 'red',
}, {
  label: 'T',
  color: 'orange',
}, {
  label: 'W',
  color: 'olive',
}, {
  label: 'R',
  color: 'green',
}, {
  label: 'F',
  color: 'blue',
}, {
  label: 'Sa',
  color: 'violet',
}, {
  label: 'Su',
  color: 'purple',
}];

export default {
  props: ['week', 'isHeader'],

  data() {
    return {
      daysOfWeek: daysOfWeekData,
      today: new Date(),
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
      return this.weekSet.has(day.label);
    },

    // getDay is 1-indexed
    isToday(index) {
      return (this.today.getDay() - 1) === index;
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

<style scoped>
</style>
