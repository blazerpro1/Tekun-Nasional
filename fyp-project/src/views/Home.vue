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
            <!-- <youtube-iframe 
              :video-id="eih0cBqqYiI"
              :player-width="440"
              :player-height="330"
            >
            </youtube-iframe > -->
            <!-- <video-embed css="embed-responsive-1by1" src="https://www.youtube.com/watch?v=eih0cBqqYiI"></video-embed> -->
            <LazyYoutube
              autoplay="true"
              aspectRatio="4:3"
              src="hhttps://www.youtube.com/watch?v=eih0cBqqYiI"
            />
          </panel>
        </v-col>
        <v-col md="7">
          <panel title="Announcement">
            <!-- <v-btn
              v-if="$store.state.user.roles.indexOf('admin-user') > -1"
              slot="action"
              @click.native="$router.push('/notification')"
              class="primary accent-2"
              light
              medium
              absolute
              right
              middle
              fab
            >
              <v-icon>add</v-icon>
            </v-btn> -->

            <!-- <v-dialog
              v-model="dialog"
              width="700"
              v-if="$store.state.user.roles.indexOf('admin-user') > -1"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  slot="action"
                  @click="reset"
                  class="primary"
                  v-on="on"
                  light
                  medium
                  absolute
                  right
                  middle
                  fab
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-4" primary-title>
                  <h2>Add Announcement</h2>
                </v-card-title>

                <v-card-text>
                  <v-form class="px-3" ref="form">
                    <v-text-field
                      v-model="title"
                      :rules="[rules.required]"
                      label="Announcement Title"
                      outlined
                      dense
                      color="primary"
                      autocomplete="false"
                      class="mt-4"
                      prepend-icon="perm_identity"
                    />

                    <v-textarea
                      v-model="details"
                      :rules="[rules.required]"
                      label="Announcement Details"
                      outlined
                      dense
                      color="primary"
                      autocomplete="false"
                      class="mt-4"
                      prepend-icon="perm_identity"
                    />

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        class="primary mx-0 mt-1"
                        @click="submit"
                        :loading="loading"
                        >Submit</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog> -->

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
                          v-text="announcement.createdAt"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                      <v-btn icon right>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon right @click.native="remove">
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
import AnnouncementService from "@/services/AnnouncementService.js";
export default {
  data() {
    return {
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
    this.announcements = (await AnnouncementService.index()).data;
  },

  methods: {
    async remove() {
      try {
        await AnnouncementService.delete({
          id: this.id,
          title: this.title,
          details: this.details
        })

      } catch (error) {
        this.error2 = error.response.data.error
      }
    },
  },
};
</script>

<style>
.wrapText {
  white-space: normal;
}
</style>
