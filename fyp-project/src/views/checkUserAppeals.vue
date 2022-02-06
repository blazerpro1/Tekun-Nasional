<template>
  <div class="Appeals">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <h1 class="subtitle-1 grey--text">Check User Appeals</h1>

    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You successfully approved the appeal!.</span>
      <v-btn text color="white" @click="snackbarClose"> Close </v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar2" :timeout="4000" top color="success">
      <span>You have rejected the appeal.</span>
      <v-btn text color="white" @click="snackbarClose"> Close </v-btn>
    </v-snackbar>

    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('name')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By loan name</span>
            </v-btn>
          </template>
          <span>Sort loans by name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('approval')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By status</span>
            </v-btn>
          </template>
          <span>Sort loans by status</span>
        </v-tooltip>
      </v-row>

      <v-card flat class="pa-3" v-for="appeal in appeals" :key="appeal.appealId">
        <v-row :class="`project ${appeal.approval}`">
          <v-col cols="12" md="4">
            <div class="caption grey--text">Loan Title</div>
            <div>{{ appeal.name }}</div>
          </v-col>

          <v-col md="4">
            <div class="caption grey--text">Appeal Details</div>
            <div>{{ appeal.appealDetails }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Date appealed</div>
            <!-- moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); -->
            <div>{{ (appeal.createdAtFormatted).format("dddd, MMMM Do YYYY, h:mm:ss a") }}</div>
          </v-col>

          <v-col xs="2">
            <div class="float-right">
              <v-chip
                small
                :class="
                  `${appeal.approval} v-chip--active white--text caption my-2 mx-3`
                "
                >{{ appeal.approval }}</v-chip
              >
            </div>
            <div class="float-right">
              <v-btn
                v-if="appeal.approval === 'pending'"
                color="success"
                small
                text
                @click.native="approve(appeal.appealId)"
                class="grey--text"
              >
                <v-icon small left>check_circle_outline</v-icon>
                <span>Approve</span>
              </v-btn>
            </div>

            <div class="float-right">
              <v-btn
                v-if="appeal.approval === 'pending'"
                color="primary"
                small
                text
                @click.native="reject(appeal.appealId)"
                class="grey--text"
              >
                <v-icon small left>cancel</v-icon>
                <span>Reject</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import date from 'date-and-time';
import moment from 'moment';
import AppealService from "@/services/AppealService.js";

export default {
  data() {
    return {
      moment: moment,
      appeals: null,
      snackbar: false,
      snackbar2: false,
    };
  },

  methods: {
    sortBy(prop) {
      this.appeals.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    snackbarClose() {
      this.snackbar = false;
      this.snackbar2 = false;
      window.location.reload();
    },

    async approve(id) {
      try {
        AppealService.update({
          id,
          approval: "approved",
        }).then(async () => {
          this.snackbar = true;
          // window.location.reload();
        });
      } catch (error) {
        // console.log(error);
      }
    },

    async reject(id) {
      try {
        AppealService.update({
          id,
          approval: "rejected",
        }).then(async () => {
          this.snackbar2 = true;
          // window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },


  async created() {
    this.appeals = (await AppealService.showAll()).data.map((a) => {
      return {
        createdAtFormatted: moment(date.format(date.parse(a.createdAtNew, "YYYY-MM-DD[T]HH:mm:ss.SSS [Z]"), 'YYYY-MM-DD hh:mm:ss A ')).add(8, 'hours'),
        ...a,
      }
    });
  },
};
</script>

<style>
.project.approved {
  border-left: 4px solid #26de81;
}
.project.pending {
  border-left: 4px solid #fed330;
}
.project.rejected {
  border-left: 4px solid red;
}

.v-chip.pending {
  background: #fed330;
}
.v-chip.approved {
  background: #26de81;
}
.v-chip.rejected {
  background: red;
}
</style>
