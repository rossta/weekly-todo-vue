<template>
  <button class='ui button icon'
    v-bind:class='[ uiClasses, { "is-header": isHeader } ]'
    @click='toggle'
    >
    <!-- <i v&#45;if='isSelected' class='icon chevron right'></i> -->
    <i class='label'>{{day.label}}</i>
  </button>

</template>

<script type="text/javascript">
export default {
  name: 'TodoDay',
  props: {
    day: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    isToday: {
      type: Boolean,
      required: true,
    },
    isHeader: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    uiClasses() {
      return this.isSelected ? this.activeClasses : this.inactiveClasses;
    },
    activeClasses() {
      return this.isToday ? 'secondary' : this.day.color;
    },
    inactiveClasses() {
      const dayClass = this.isToday ? 'gray' : 'basic';
      return `inactive ${dayClass}`;
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
.inactive:not(.is-header) .label {
  color: transparent;
}

.inactive:not(.is-header):hover .label {
  color: rgba(0, 0, 0, 0.8);
}
</style>
