<template>
    <AccountRequests />
</template>
<script>
import AccountRequests from "../components/AccountRequests.vue"
export default {
    components: {AccountRequests},
      mounted() {
    this.$emit("img", "admin");
  },
}
</script>
<style>

</style>