<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on }">
        <v-btn class="success" dark v-on="on" @click="reset"
          >Add Announcement</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-4" primary-title>
          <h2>Add Announcement</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              v-model="announcement.name"
              :rules="[rules.required]"
              label="Announcement Title"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="event"
            />

            <v-textarea
              v-model="announcement.details"
              :rules="[rules.required]"
              label="Announcement Details"
              outlined
              dense
              color="primary"
              autocomplete="false"
              class="mt-4"
              prepend-icon="event_note"
            />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                class="primary mx-0 mt-1"
                @click="submit"
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
import AnnouncementService from "@/services/AnnouncementService.js";
export default {
  data: () => ({
    dialog: false,
    announcement: {
      name: "",
      details: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          await AnnouncementService.post(this.announcement);
          this.dialog = false;
          this.$emit("projectAdded2");
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
