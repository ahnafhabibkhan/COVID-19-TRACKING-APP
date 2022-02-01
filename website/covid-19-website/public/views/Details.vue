<template>
  <div>
    <v-container class="pt-10 mb-12">
      <v-row
        no-gutters
        class="narrow">
        <v-col
          cols="12"
          class="desktop-padding">
          <app-post />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Post from '@/components/Details/Details.vue';

export default {
  name: 'Post',

  computed: {
    ...mapGetters('auth', ['loggedIn']),
  },

  created() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'landing' });
    }
  },

  components: {
    appPost: Post,
  },
};
</script>

<style scoped>
  .bottom {
    position: fixed;
    bottom: 32px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
  }
  @media screen and (min-width: 959px) {
    .desktop-padding {
      padding-right: 24px;
    }
  }
</style>
