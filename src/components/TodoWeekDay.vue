<template>
  <button class='ui button icon'
    v-bind:class='[ colorClass, activeClass, todayClass ]'
    v-on:click='toggle'
    >{{day.label}}</button>
</template>

<script type="text/javascript">
export default {
  name: 'TodoWeekDay',
  props: ['day', 'index', 'isOn', 'isToday'],
  computed: {
    colorClass() {
      return this.isOn ? this.day.color : '';
    },
    activeClass() {
      return this.isOn ? '' : 'basic';
    },
    todayClass() {
      return this.isToday ? 'secondary' : '';
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle-day', this.day.label);
    },
  },
};
</script>
