<template>
  <div>
    <app-profile-info />
    <app-profile-gallery />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileInfo from '@/components/Profile/ProfileInfo.vue';
import ProfileGallery from '@/components/Profile/ProfileGallery.vue';

export default {
  name: 'User',

  computed: {
    ...mapGetters('auth', ['loggedIn']),

    uid() {
      return this.$route.params.uid;
    },
  },

  watch: {
    uid(val) {
      this.getProfile(val);
    },
  },

  methods: {
    ...mapActions('profile', ['getProfile']),
  },

  created() {
    if (!this.loggedIn) {
      this.$router.replace({ name: 'landing' });
      return;
    }
    this.getProfile(this.uid);
  },

  components: {
    appProfileInfo: ProfileInfo,
    appProfileGallery: ProfileGallery,
  },
};
</script>
