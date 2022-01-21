<template>
  <div class="text-center">
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
              label="Name"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>

            <v-text-field
              label="Confirm Password"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>

            <v-text-field
              label="Phone Number"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
            ></v-text-field>

            <!-- <v-textarea
              label="Information"
              v-model="content"
              prepend-icon="edit"
              :rules="inputRules2"
            ></v-textarea> -->

            <v-menu max-width="290">
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
            </v-menu>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="success mx-0 mt-1" @click="submit" :loading="loading"
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
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      inputRules: [
        (v) => (v && v.length >= 3) || "Minimum length is 3 characters.",
      ],
      inputRules2: [
        (v) => (v && v.length >= 50) || "Minimum length is 50 characters.",
      ],
      inputRules3: [(v) => (v && v.length >= 5) || "Insert date."],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        console.log(this.title, this.content);
        this.loading = false;
        this.dialog = false;
        this.$emit('projectAdded')
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    },
  },
};
</script>

<style>
</style>