<template>
  <div class="notification">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <h1 class ="subtitle-1 grey--text">Notification List</h1>

    <v-container style="max-width: 1000px; position: relative;" class="my-8">
      <v-expansion-panels>
        <!-- v-for="(notification, index) in announcements" -->
        <v-expansion-panel v-for="(notification, index) in notifications" :key="notification.id">
          <v-expansion-panel-header>Notification {{index + 1}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <!-- <div class="font-weight-bold">{{ notification.createdAt }}</div> -->
                <div class="font-weight-bold">{{ moment(notification.createdAtFormatted).fromNow() }}</div>
                <div>{{ notification.message }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>        
      </v-expansion-panels>
    </v-container>


  </div>
</template>

<script>
import date from 'date-and-time';
import moment from 'moment';
import NotificationService from '@/services/NotificationService.js';
export default {
    data(){
      return{
        moment:moment,
        notifications: null,
      }
    },

  async mounted() {
    this.notifications = (await NotificationService.index()).data.map((a) => {
      return {
        createdAtFormatted: moment(date.format(date.parse(a.createdAt, "YYYY-MM-DD[T]HH:mm:ss.SSS [Z]"), 'YYYY-MM-DD hh:mm:ss A ')).add(8, 'hours'),
        ...a,
      }
    });
  },
  }
</script>

<style scoped>
.main-container {
  position: relative !important;
  max-width: 1000px !important;
}
</style>