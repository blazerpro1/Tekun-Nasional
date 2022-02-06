<template>
  <div class="home">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <h1 class="subtitle-1 grey--text">Homepage</h1>

    <v-container class="my-5">
      <!-- <h1 class="primary--text middle text-center">Announcement</h1> -->
      <template>
        <v-carousel
          cycle
          height="600"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in carousel"
            :key="i"
            :src="item.src"
          >
          </v-carousel-item>
        </v-carousel>
      </template>
      <v-divider></v-divider>
      <br />
      <v-row>
        <v-col md="5">
          <panel title="Video">
            
            <LazyYoutube
              autoplay="true"
              aspectRatio="4:3"
              src="hhttps://www.youtube.com/watch?v=eih0cBqqYiI"
            />
          </panel>
        </v-col>
        <v-col md="7">
          <panel title="Announcement">

            <v-list two-line>
              <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
              >
                <template v-for="(announcement, index) in announcements">
                  <v-list-item :key="announcement.id">
                    <template v-slot:default>
                      
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="announcement.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="wrapText"
                          v-html="announcement.details"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="moment(announcement.createdAtFormatted).fromNow()"
                          
                        ></v-list-item-action-text>
                      </v-list-item-action>
                      <!-- <v-btn icon right v-if="$store.state.user.roles.indexOf('admin-user') > -1">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn> -->
                      <v-btn icon right @click.native="remove(announcement.id)" v-if="$store.state.user.roles.indexOf('admin-user') > -1">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < announcements.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </panel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import date from 'date-and-time';
import moment from 'moment';
import AnnouncementService from "@/services/AnnouncementService.js";
export default {
  data() {
    return {
      moment:moment,
      announcements: null,
      id: null,
      title: "",
      details: "",
      rules: {
        required: (value) => !!value || "Required.",
      },

      carousel: [
        {
          src:
            "https://www.tekun.gov.my/wp-content/uploads/2016/06/1tekun-niaga-1.png",
        },
        {
          src:
            "https://www.tekun.gov.my/wp-content/uploads/2016/06/2Teman-1.png",
        },
        {
          src:
            "https://www.panduankini.com/wp-content/uploads/2020/02/Skim-Pembiayaan-Tekun-Nasional-2020.png",
        },
      ],
    };
  },

  async mounted() {
    this.announcements = (await AnnouncementService.index()).data.map((a) => {
      return {
        createdAtFormatted: moment(date.format(date.parse(a.createdAt, "YYYY-MM-DD[T]HH:mm:ss.SSS [Z]"), 'YYYY-MM-DD hh:mm:ss A ')).add(8, 'hours'),
        ...a,
      }
    });
  },

  methods: {
    async remove(id) {
      // const id = this.announcements.id;

      try {
        AnnouncementService.delete({
          id,
        }).then(async () => {
          window.location.reload();
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.wrapText {
  white-space: normal;
}
.v-list{
  height:335px;/* or any height you want */
  overflow-y:auto
}
</style>
