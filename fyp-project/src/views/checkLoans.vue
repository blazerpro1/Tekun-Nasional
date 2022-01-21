<template>
  <div class="Loans">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   
    <h1  class ="subtitle-1 grey--text">Check Loans</h1>

    

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
            <v-btn small text color="grey" @click="sortBy('status')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By status</span>
            </v-btn>
          </template>
          <span>Sort loans by status</span>
        </v-tooltip>

      </v-row>

      <v-card
        flat
        class="pa-3"
        v-for="loan in loans"
        :key="loan.name"
      >
        <v-row :class="`project ${loan.status}`">
          <v-col cols="12" md="6">
            <div class="caption grey--text">Project Title</div>
            <div>{{ loan.name }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Person</div>
            <div>{{ loan.person }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Date applied</div>
            <div>{{ loan.date }}</div>
          </v-col>

          <v-col xs="2">
            <div class="float-right">
              <v-chip
                small
                :class="`${loan.status} v-chip--active white--text caption my-2`"
                >{{ loan.status }}</v-chip
              >
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


  export default {
    data(){
      return{
        loans: [
        {
          name: "Loan 1",
          person: "Koh Guan Po",
          date: "1st Jan 2019",
          status: "pending",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          name: "Loan 2",
          person: "Koh Guan Po",
          date: "10th Jan 2019",
          status: "approved",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          name: "Loan 3",
          person: "Koh Guan Po",
          date: "20th Dec 2018",
          status: "approved",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
        {
          name: "ALoan 4",
          person: "Koh Guan Po",
          date: "20th Oct 2018",
          status: "pending",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!",
        },
      ],
      }
    },

    methods: {
    sortBy(prop) {
      this.loans.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
  },

  }
</script>

<style>
.project.approved {
  border-left: 4px solid #26de81;
}
.project.pending {
  border-left: 4px solid #fed330;
}


.v-chip.pending {
  background: #fed330;
}
.v-chip.approved {
  background: #26de81;
}

</style>