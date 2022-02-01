<template>
  <div class="text-center" v-if="$store.state.isUserLoggedIn">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on" @click="reset"
          >Edit Profile</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-4" primary-title>
          <h2>Edit Profile</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              label="Full Name"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="perm_identity"
            />
            <v-text-field
              v-model="password"
              :prepend-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
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
              :prepend-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
              prepend-icon="account_circle"
            />
            <v-text-field
              v-model.trim="phoneNumber"
              label="Phone Number"
              :rules="[rules.required, rules.numberRule]"
              outlined
              dense
              color="primary"
              autocomplete="false"
              prepend-icon="local_phone"
            />
            <!-- <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formattedDate"
                  label="Birthday"
                  prepend-icon="date_range"
                  v-on="on"
                  :rules="inputRules3"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu> -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="success mx-0 mt-1"
                @click="submit"
                :loading="loading"
                >Edit Profile</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  data: () => ({
    show1: false,
    show2: false,
    name: "",
    icNumber: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    // loading: false, TODO
    dialog: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      numberRule: (v) => {
        if (v.trim() && v.startsWith("+60") && v.length > 11 && v.length < 14)
          return true;

        return "Please enter a valid phone number starting with +60";
      },
      icNumberRule: (v) => {
        if (!v.trim()) return true;
        if (v.length > 11 && v.length < 13) return true;
        return "Please enter a valid IC number";
      },
    },
  }),
  methods: {
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          await UserService.update({
            name: this.name,
            ic_number: this.icNumber,
            phone_number: this.phoneNumber,
            password: this.password,
          })
          this.dialog = false;
          this.$emit("projectAdded");
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordConfirm || "Password must match";
    }
  },
};
</script>

<style></style>
