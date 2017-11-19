<template>
  <transition name='modal'>
    <div class='modal-mask' @click='close'>
      <div class='modal-wrapper'>
        <div class='ui active modal' @click.stop>
          <div class='header'>
            <slot name='header'>
              default header
            </slot>
          </div>

          <div class='content'>
            <slot>
              default body
            </slot>
          </div>

          <div class='actions'>
            <slot name='footer'>
              <div class='ui approve button'>Approve</div>
              <div class='ui button'>Neutral</div>
              <div class='ui cancel button'>Cancel</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
const ESC = 27;

export default {
  methods: {
    close() {
      this.$emit('close');
    },

    escapeKeyListener(evt) {
      if (evt.keyCode === ESC) {
        this.$emit('close');
      }
    },
  },
  created() {
    document.addEventListener('keyup', this.escapeKeyListener);
  },

  destroyed() {
    document.removeEventListener('keyup', this.escapeKeyListener);
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal.ui {
  top: 33%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
