<template>
  <div>
    <v-container class="pt-10 mb-12">
      <v-row
        no-gutters
        class="narrow">
        <v-col
          cols="12"
          md="8"
          class="desktop-padding">
          <app-posts-feed />
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="hide-tablet">
          <app-suggested />
        </v-col>
      </v-row>
    </v-container>
    <div class="bottom narrow text-right">
      <v-btn
        rounded
        dark
        color="primary"
        elevation="6"
        height="48"
        class="px-6 mx-6"
        :to="{ name: 'upload' }">
        <span class="white--text mr-2">
          New Post
        </span>
        <v-icon color="white">
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostsFeed from '@/components/Feed/PostsFeed.vue';
import Suggested from '@/components/Feed/Suggested.vue';

export default {
  name: 'Feed',

  computed: {
    ...mapGetters('auth', ['loggedIn']),
  },

  created() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'landing' });
    }
  },

  components: {
    appPostsFeed: PostsFeed,
    appSuggested: Suggested,
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
