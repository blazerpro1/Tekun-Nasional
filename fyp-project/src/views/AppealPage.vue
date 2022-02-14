<template>
  <div class="appealPage">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <h1 class="subtitle-1 grey--text">Appeal Loan</h1>

    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You successfully appealed the loan!.</span>
      <v-btn text color="white" @click ="snackbarClose"> Close </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar2" :timeout="4000" top color="red">
      <span>You cannot appeal the same loan more than once.</span>
      <v-btn text color="white" @click ="snackbar2 = false"> Close </v-btn>
    </v-snackbar>

    <v-container class="my-5">
      <v-row>
        <v-col md="12">
          <panel title="Appeal Loan">
            <v-form ref="form" v-model="form" class="pa-4 pt-6">
              <v-text-field
                v-model="loans.name"
                prepend-icon="attach_money"
                outlined
                label="Loan Title"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="loans.amount"
                prepend-icon="attach_money"
                outlined
                label="Loan Amount"
                disabled
              ></v-text-field>
              <v-textarea
                label="Details"
                counter
                prepend-icon="comment"
                outlined
                required
                :rules="[required]"
                v-model="appeal.details"
              ></v-textarea>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!form"
                :loading="isLoading"
                class="white--text"
                color="primary"
                depressed
                @click.native="submit"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </panel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoanService from "@/services/LoanService.js";
import AppealService from "@/services/AppealService.js";

export default {
  data() {
    return {
      form: false,
      snackbar: false,
      snackbar2: false,
      loans: null,
      appeal: {
        details: null,
      },
      error: null,
      required: (value) => !!value || "Required.",
    };
  },
  methods: {
    async submit() {

      try {
        if (this.$refs.form.validate()) {
          const id = window.location.pathname.split("/")[2];
          await AppealService.post(id, this.appeal);
          this.snackbar = true;
          setTimeout( () => this.$router.push('/'), 3000);

        }
      } catch (err) {
        this.snackbar2 = true;
        console.log(err.response);
        
      }
    },
    snackbarClose() {
      this.snackbar = false;
      this.$router.push('/appeals');
      window.location.reload();
    },
    
  },
  async mounted() {
    const id = window.location.pathname.split("/")[2];
    this.loans = (await LoanService.appealLoan(id)).data;
  },
};
</script>

<style></style>
