<template>
  <v-container>

    <v-app-bar flat app v-if="!$store.state.isUserLoggedIn">
      <v-app-bar-title style="cursor: pointer" @click.native="$router.push('/login')" class="text-uppercase grey--text">
        <span class="font-weight-light">TEKUN</span>
        <span>National Online System</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      
      <!-- login/signup button -->
      <v-btn v-if="!$store.state.isUserLoggedIn" text color="grey" @click.native="$router.push('/login')">
        Login/SignUp
      </v-btn>

    </v-app-bar>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
            <v-row>
                <v-col cols="12" md="12">
                  <v-card-text class="mt-12">
                    <v-img
                      class="mx-auto"
                      max-height="200"
                      max-width="250"
                      src="/logo_tekun.png"
                    ></v-img>
                    <h3 class="text-center">Forgot Password?</h3>
                    <h4 class="text-center mb-4" >Don't fret, we'll help you reset!</h4>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="password"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show2 ? 'text' : 'password'"
                          label="Password"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          @click:append="show2 = !show2"
                        />
                        <v-text-field
                          v-model="passwordConfirm"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min, passwordConfirmationRule]"
                          :type="show1 ? 'text' : 'password'"
                          label="Confirm Password"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          @click:append="show1 = !show1"
                        />
                        <div class ="text-center primary--text" v-html="error"></div>
                        <v-btn color="primary" dark block tile @click.native="reset">Reset</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  data: () => ({
    show1: false,
    show2: false,
    password: "",
    passwordConfirm: "",
    error: null,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),

  methods: {
    async reset() {
      // console.log(window.location.pathname.split('/')[2]);
      try {
        await AuthenticationService.reset({
          password: this.password,
          password2: this.passwordConfirm,
          token: window.location.pathname.split('/')[2],
        })
        alert("Successfully changed your password!")
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    props: {
    source: String,
  },
  },

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordConfirm || "Password must match";
    }
  },
  
  props: {
    source: String,
  },
};
</script>

<style>

</style>