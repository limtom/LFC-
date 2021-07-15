<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" justify="center" align="center">
      <v-card class="d-flex flex-column mx-auto" max-width="400">
        <v-card-title class="text-h6 font-weight-light mt-5 mb-5 mx-auto">
          Add a WSF location
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              name="Phone-number"
              label="Phone-number"
              id="id"
              outlined
              dense
              type="number"
              prefix="+234"
              v-model="coordinatorInfo.phoneNumber"
              :disabled="!locationStatus"
            ></v-text-field>
          </v-form>
          <v-alert outlined text :type="errorStatus" v-if="false">
            Your information could not be found
          </v-alert>
          <div class="text-center">
            <Map v-on:locationReady="setLocationStatus($event)" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Map from '~/components/Map.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  name: 'ADD-Page',
  components: {
    Map,
  },
  data() {
    return {
      errorStatus: 'error',
      coordinatorInfo: {
        phoneNumber: '',
      },
      locationStatus: false,
      userLocation: {},
    }
  },
  layout: 'AddLocation',
  methods: {
    setLocationStatus(event) {
      this.locationStatus = event.locationStatus
      //Get the location coordinate
      this.userLocation = event.userLocation
      console.log(event)
    },
  },
}
</script>
