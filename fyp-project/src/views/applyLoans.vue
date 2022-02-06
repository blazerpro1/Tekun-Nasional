<template>
  <div class="application">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <h1 class="subtitle-1 grey--text">Loan Application</h1>

    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You successfully applied a loan!.</span>
      <v-btn text color="white" @click="snackbar = false"> Close </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar2" :timeout="4000" top color="red">
      <span>You cannot apply the same loan.</span>
      <v-btn text color="white" @click="snackbar2 = false"> Close </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar3" :timeout="4000" top color="success">
      <span>You successfully deleted a loan.</span>
      <v-btn text color="white" @click="snackbar3 = false"> Close </v-btn>
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
            <v-card-text style="overflow-y: auto; height:240px">
              <div class="font-weight-medium text-subtitle-1 primary--text">
                {{ loan.name }}
              </div>
              <div class="grey--text">{{ loan.details }}</div>
              <br />
              <div class="grey--text">Loan amount: RM{{ loan.amount }}</div>
            </v-card-text>
            <v-card-actions>
              <v-row align="center" justify="space-around mb-2">
                <v-btn
                  v-if="$store.state.user.roles.indexOf('admin-user') === -1"
                  text
                  @click.native="submit(loan.id)"
                  class="grey--text"
                >
                  <v-icon small left>add_circle_outline</v-icon>
                  <span>Apply</span>
                </v-btn>
                <v-btn
                  v-if="$store.state.user.roles.indexOf('admin-user') > -1"
                  text
                  @click.native="remove(loan.id)"
                  color="error"
                  class="grey--text"
                >
                  <v-icon small left>cancel</v-icon>
                  <span>Delete</span>
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
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
    };
  },

  methods: {
    async submit(loanId) {
      try {
        //might be {{id}}
        await LoanService.post({ loanId });
        this.snackbar = true;
      } catch (err) {
        this.snackbar2 = true;
        console.log(err.response);
      }
    },

    async remove(loanId) {
      try {
        LoanService.delete({
          loanId
        }).then(async () => {
          this.loans = (await LoanService.index()).data;
          this.snackbar3 = true;
        })
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    this.loans = (await LoanService.index()).data;
  },
};
</script>

<style scoped>
.error {
  color: #ffffff;
}
</style>
