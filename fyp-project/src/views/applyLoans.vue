<template>
  <div class="application">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <h1 class="subtitle-1 grey--text">Loan Application</h1>
    
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You successfully applied a loan!.</span>
      <v-btn text color="white" @click ="snackbar = false"> Close </v-btn>
    </v-snackbar>

    <v-container class="my-5">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="loan in loans"
          :key="loan.name"
        >
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/logo_tekun.png" />
                <!-- <v-icon >mdi-account-circle</v-icon> -->
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="font-weight-medium text-subtitle-1 primary--text">{{ loan.name }}</div>
              <div class="grey--text">{{ loan.details }}</div>
              <br>
              <div class="grey--text">Loan amount: RM{{ loan.amount }}</div>

            </v-card-text>
            <v-card-actions>
              <v-row justify="center pb-3">
                  <v-btn text @click="submit" class="grey--text">
                    <v-icon small left>add_circle_outline</v-icon>
                    <span>Apply</span>
                  </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoanService from "@/services/LoanService.js";

export default {
  data() {
    return {
      loans: null,
      snackbar: false
    };
  },

  methods: {
    submit() {
      this.snackbar = true;
    },
    reset() {
      this.$refs.form.reset();
    },
  },

  async mounted() {
    this.loans = (await LoanService.index()).data;
  },
};
</script>
