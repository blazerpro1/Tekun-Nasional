<template>
  <div class="notification">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <h1 class ="subtitle-1 grey--text">Notification List</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="notification in notifications" :key="notification.title">
          <v-expansion-panel-header>{{ notification.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">Date by {{ notification.date }}</div>
                <div>{{ notification.content }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>        
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
    data(){
      return{
        notifications: [
        { title: 'Notification 1', date: '1st Jan 2019', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Notification 2', date: '10th Jan 2019', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Notification 3', date: '20th Dec 2018', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Notification 4', date: '20th Oct 2018', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      ]
      }
    },
  }
</script>