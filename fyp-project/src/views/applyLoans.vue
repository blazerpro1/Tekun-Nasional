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
                <!-- <img :src="loan.avatar1"> -->
                <v-icon >mdi-account-circle</v-icon>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="text-subtitle-1">{{ loan.name }}</div>
              <div class="grey--text">{{ loan.details }}</div>
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
import axios from 'axios'
export default {
  data() {
    return {
      loans: [
        { name: "Loan 1", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!", avatar: '/avatar-6.png' },
        { name: "Loan 2", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!", avatar: '/avatar-2.png' },
        { name: "Loan 3", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!", avatar: '/avatar-3.png' },
        { name: "Loan 4", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!", avatar: '/avatar-4.png' },
        { name: "Loan 5", details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!", avatar: '/avatar-5.png' },
      ],
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

  mounted(){
        axios
            .get('http://localhost:3000/api/loans')
            .then(response => {
                this.loans = response.data
                // console.log(response.data)
            })
            .catch(error => console.log(error))
    }
};
</script>
