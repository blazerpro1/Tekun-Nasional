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
                    <h4 class="text-center">Don't fret, we'll help you reset!</h4>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="email"
                          :rules="[rules.required, rules.email]"
                          label="Email"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          class="mt-5"
                        />
                        <div class ="text-center primary--text" v-html="error"></div>
                        <br>
                        <v-btn color="primary" dark block tile @click.native="forgot">Reset</v-btn>
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
    email:"",
    error: null,
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
  }),

  methods: {
    async forgot() {
      try {
        await AuthenticationService.forgot({
          email: this.email,
        })
        alert("Check your email for the reset password link!")
      } catch (error) {
        this.error = error.response.data.error
      }
    },

  },
}
</script>

<style>

</style>