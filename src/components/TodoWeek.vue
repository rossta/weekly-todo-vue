<template>
  <div>
    <todo-day
      v-for='(day, index) in daysOfWeek'
      :key='index'
      :day='day'
      :index='index'
      :isToday='isToday(index)'
      :isHeader=isHeader
      v-bind:isSelected='isDaySelected(day)'
      @toggle-day='toggleDay'
      class='day table-item'
      ></todo-day>
  </div>
</template>

<script>
import TodoDay from '@/components/TodoDay';

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
    TodoDay,
  },

  computed: {
    weekSet() {
      return new Set(this.week || []);
    },
  },

  methods: {
    isDaySelected(day) {
      return this.weekSet.has(day.label);
    },

    // getDay is 0-indexed where Sunday === 0
    isToday(index) {
      const dayOfWeek = this.today.getDay() - 1;
      return dayOfWeek < 0
        ? index === (this.daysOfWeek.length - 1) // today is Sunday
        : dayOfWeek === index;
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
