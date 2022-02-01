<template>
  <app-edit-card />
</template>

<script>
import { mapGetters } from 'vuex';
import EditCard from '@/components/EditProfile/EditCard.vue';

export default ({
  name: 'Edit',

  computed: {
    ...mapGetters('auth', ['loggedIn']),
  },

  created() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'landing' });
    }
  },

  components: {
    appEditCard: EditCard,
  },
});
</script>

<style scoped>

</style>
