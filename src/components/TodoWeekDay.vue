<template>
  <button class='ui button icon'
    v-bind:class='[ colorClass, activeClass, todayClass ]'
    v-on:click='toggle'
    >
    <!-- <i v&#45;if='isOn' class='icon chevron right'></i> -->
    <i class='label'>{{day.label}}</i>
  </button>

</template>

<script type="text/javascript">
export default {
  name: 'TodoWeekDay',
  props: ['day', 'index', 'isOn', 'isToday', 'isHeader'],
  computed: {
    colorClass() {
      return this.isOn ? this.day.color : '';
    },
    activeClass() {
      return this.isOn ? '' : this.inactiveClass;
    },
    inactiveClass() {
      const className = 'basic';
      return this.isHeader ? className : `${className} inactive`;
    },
    todayClass() {
      return this.isToday
        ? this.todayOnClass
        : '';
    },
    todayOnClass() {
      return this.isOn ? 'secondary' : 'gray';
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle-day', this.day.label);
    },
  },
};
</script>

<style scoped>
.inactive .label {
  color: transparent;
}

.inactive:hover .label {
  color: rgba(0, 0, 0, 0.8);
}
</style>
