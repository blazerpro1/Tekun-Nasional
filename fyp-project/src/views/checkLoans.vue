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
            <v-btn small text color="grey" @click="sortBy('approval')" v-on="on">
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
        :key="loan.id"
      >
        <v-row :class="`project ${loan.approval}`">
          <v-col cols="12" md="6">
            <div class="caption grey--text">Loan Title</div>
            <div>{{ loan.name }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Amount</div>
            <div>RM{{ loan.amount }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Date applied</div>
            <!-- moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); -->
            <div>{{ (loan.createdAtFormatted).format("dddd, MMMM Do YYYY, h:mm:ss a") }}</div>
          </v-col>

          <v-col xs="2">
            <div class="float-right">
              <v-chip
                small
                :class="`${loan.approval} v-chip--active white--text caption my-2 mx-3`"
                >{{ loan.approval }}</v-chip
              >
            </div>
            
            <div class="float-right">
              <v-btn v-if="loan.approval === 'approved'"  small text @click.native="appeal(loan.id)" class="grey--text">
                    <v-icon small left>add_circle_outline</v-icon>
                    <span>Appeal</span>
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
import LoanService from "@/services/LoanService.js";

  export default {
    data(){
      return{
        loans: null,
        userLoans: null,
      }
    },

    methods: {
    sortBy(prop) {
      this.loans.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    appeal(id){
      this.$router.push(`appeal/${id}`)
    }
  },

  async mounted() {
    this.userLoans = (await LoanService.show()).data;
    
    this.loans = (await LoanService.userLoan()).data.map((a) => {
      return {
        
        createdAtFormatted: moment(date.format(date.parse(a.createdAtNew, "YYYY-MM-DD[T]HH:mm:ss.SSS [Z]"), 'YYYY-MM-DD hh:mm:ss A ')).add(8, 'hours'),
        ...a,
      }
    });
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