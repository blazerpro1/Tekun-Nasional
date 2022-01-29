<template>


  <v-container>

    <v-app-bar flat app v-if="!$store.state.user">
      <v-app-bar-title style="cursor: pointer" @click.native="$router.push('/login')" class="text-uppercase grey--text">
        <span class="font-weight-light">TEKUN</span>
        <span>National Online System</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      
      <!-- login/signup button -->
      <v-btn v-if="!$store.state.isUserLoggedIn" text color="grey" @click.native="step++">
        Login/SignUp
      </v-btn>

    </v-app-bar>


    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <v-img
                      class="mx-auto"
                      max-height="200"
                      max-width="250"
                      src="/logo_tekun.png"
                    ></v-img>
                    <h3 class="text-center">Login in to Your Account</h3>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="email1"
                          label="Email"
                          outlined
                          dense
                          color="primary"
                          autocomplete="true"
                          class="mt-5"
                          append-icon = "mdi-email"
                        />
                        <v-text-field
                          v-model="password1"
                          label="Password"
                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show3 ? 'text' : 'password'"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          @click:append="show3 = !show3"
                        />
                        <v-row>
                          <v-col cols="12" sm="6">
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-btn text small @click.native="$router.push('/forgotPassword')" class="caption primary--text"
                              >Forgot password
                            </v-btn>
                          </v-col>
                        </v-row>
                        <!-- <br> -->
                        <div class ="text-center primary--text" v-html="error2"></div>
                        <br>
                        <v-btn class="mb-6" color="primary" dark block tile @click.native="login">Log in</v-btn>
                        <!-- //code for logging using google fb twitter
                         <h5
                          class="text-center  grey--text mt-4 mb-3"
                        >Or Log in using</h5>
                         <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                        <v-btn depressed outlined color="grey">
                          <v-icon color="red">fab fa-google</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="blue">fab fa-facebook-f</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                        </v-btn>
                         </div> -->
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="primary rounded-bl-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h2 class="text-center ">Do Not Have an Account?</h2>
                      <h5 class="text-center">
                        Register now
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="primary rounded-br-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h2 class="text-center ">Already Signed up?</h2>
                      <h5 class="text-center">
                        Log in to your account
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <v-img
                      class="mx-auto"
                      max-height="200"
                      max-width="250"
                      src="/logo_tekun.png"
                    ></v-img>
                    <h3 class="text-center">Sign Up for an Account</h3>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="name"
                          :rules="[rules.required]"
                          label="Full Name"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          class="mt-4"
                          append-icon = "perm_identity"
                        />
                        <v-text-field
                          v-model="email"
                          :rules="[rules.required, rules.email]"
                          label="Email"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          append-icon = "email"
                        />
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
                        <v-text-field
                          v-model.trim="icNumber"
                          label="IC Number"
                          :rules="[rules.required, rules.icNumberRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          append-icon = "account_circle"
                        />
                        <v-text-field
                          v-model.trim="phoneNumber"
                          label="Phone Number"
                          :rules="[rules.required, rules.numberRule]"
                          outlined
                          dense
                          color="primary"
                          autocomplete="false"
                          append-icon = "local_phone"
                        />
                        <!-- <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Normal with hint text"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field> -->
                        <!-- <v-row>
                              <v-col cols="12" sm="7">
                                <v-checkbox
                       
                        label="I Accept AAE"
                        class="mt-n1"
                        color="blue"
                      > </v-checkbox>
                              </v-col>
                              <v-col cols="12" sm="5">
                                <span class="caption primary--text ml-n4">Terms &Conditions</span>
                              </v-col>
                            </v-row> -->
                        <!-- <br> -->
                        <div class ="text-center primary--text" v-html="error"></div>
                        <br>
                        <v-btn class="mb-6" color="primary" dark block tile @click.native="register" >Sign up</v-btn>

                        <!-- <h5
                          class="text-center  grey--text mt-4 mb-3"
                        >Or Sign up using</h5>
                         <div class="d-flex  justify-space-between align-center mx-10 mb-11">
                        <v-btn depressed outlined color="grey">
                          <v-icon color="red">fab fa-google</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="blue">fab fa-facebook-f</v-icon>
                        </v-btn>
                        <v-btn depressed outlined color="grey">
                          <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>
                        </v-btn>
                         </div> -->
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  data: () => ({
    step: 1,
    show1: false,
    show2: false,
    show3: false,
    email1:"",
    password1:"",
    name:"",
    email:"",
    icNumber:"",
    phoneNumber:"",
    password: "",
    passwordConfirm: "",
    error: null,
    error2: null,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      numberRule: (v) => {
        if (v.trim() && v.startsWith("+60") && v.length > 11 && v.length < 14) return true;
    
        return "Please enter a valid phone number starting with +60";
      },
      icNumberRule: (v) => {
        if (!v.trim()) return true;
        if (v.length > 11 && v.length < 13) return true;
        return "Please enter a valid IC number";
      },
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    async register() {
      try {
        
        const response = await AuthenticationService.register({
          name: this.name,
          ic_number: this.icNumber,
          phone_number: this.phoneNumber,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/')
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email1,
          password: this.password1
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/')
      } catch (error) {
        this.error2 = error.response.data.error
      }
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
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
.error{
  color: #ffffff;
}


</style>
