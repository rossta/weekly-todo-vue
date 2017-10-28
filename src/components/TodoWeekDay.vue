<template>
  <button class='ui basic button icon'
    v-bind:class='{ "purple primary" : isOn }'
    v-on:click='toggle'
    >{{day}}</button>
</template>

<script type="text/javascript">
export default {
  name: 'DayToggle',
  props: ['day', 'isOn'],

  methods: {
    toggle() {
      this.$emit('toggle-day', this.day);
    },
  },
};
</script>
