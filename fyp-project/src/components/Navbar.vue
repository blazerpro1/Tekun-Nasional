<template>
  <nav class="grey lighten-4">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You have edited your profile.</span>
      <v-btn text color="white" @click="snackbar = false"> Close </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar2" :timeout="4000" top color="success">
      <span>Awesome! You have added a new announcement.</span>
      <v-btn text color="white" @click="snackbar2 = false"> Close </v-btn>
    </v-snackbar>

    <!-- app = fix at the top -->
    <!-- TODO -->
    <!-- <v-app-bar flat app v-if="$store.state.user.roles.indexOf('admin-user') > -1"> -->
    <v-app-bar flat app v-if="$store.state.isUserLoggedIn">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title style="cursor: pointer" @click.native="$router.push('/')" class="text-uppercase grey--text">
        <span class="font-weight-light">TEKUN</span>
        <span>National Online System</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y v-if="$store.state.isUserLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- signout button -->
      <v-btn text color="grey" v-if="$store.state.isUserLoggedIn" @click="logout">
        Log Out
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary" v-if="$store.state.isUserLoggedIn">
      <v-row justify="center" class="mt-5">
        <v-col cols="6">
          <v-avatar size="100">
            <img src="/logo_tekun.png" />
          </v-avatar>
          <p class="text-center white--text subheading mt-3 mb-0">{{name}}</p>
        </v-col>
        <v-col class="mt-0 mb-3" v-if="$store.state.user.roles.indexOf('admin-user') === -1">
          <Popup @projectAdded="snackbar = true" />
        </v-col>
        <v-col class="mt-0 mb-3" v-if="$store.state.user.roles.indexOf('admin-user') > -1">
          <AnnouncementPopup @projectAdded2="snackbar2 = true" />
        </v-col>
      </v-row>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "../components/Popup";
import AnnouncementPopup from "../components/AnnouncementPopup.vue";
import UserService from "@/services/UserService.js";

export default {
  components: { Popup, AnnouncementPopup },
  data() {
    return {
      name: "",
      drawer: false,
      links: [
        { icon: "home", text: "Main Menu", route: "/" },
        { icon: "circle_notifications",text: "Notification List",route: "/notification",},
        { icon: "done", text: "Apply Loans", route: "/application" },
        { icon: "attach_money", text: "Check Loans", route: "/loans" },
        { icon: "pending_actions", text: "Appeal", route: "/appeal" },
      ],
      snackbar: false,
      snackbar2: false,
    };
  },

  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    }
  },

  async mounted() {
    this.name = (await UserService.index()).data.name;
  },
};
</script>
