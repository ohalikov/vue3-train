export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:openDialog', false);
    },
  },
};
