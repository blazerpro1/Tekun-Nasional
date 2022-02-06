<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on" @click="reset">Add Loan</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-4" primary-title>
          <h2>Add Loan</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              v-model="loan.name"
              :rules="[rules.required]"
              label="Loan Title"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="event"
            />

            <v-text-field
              v-model="loan.amount"
              :rules="[rules.required, rules.numberRule]"
              label="Loan Amount"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="attach_money"
            />

            <v-textarea
              v-model="loan.details"
              :rules="[rules.required]"
              label="Loan Details"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="event_note"
            />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="primary mx-0 mt-1" @click="submit"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LoanService from "@/services/LoanService.js";
export default {
  data: () => ({
    dialog: false,
    loan: {
      name: "",
      details: "",
      amount: null,
    },
    rules: {
      required: (value) => !!value || "Required.",
      numberRule: (v) => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v))) return true;
        return "Insert Numbers Only!";
      },
    },
  }),
  methods: {
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          await LoanService.create(this.loan);
          this.dialog = false;
          this.$emit("projectAdded3");
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
