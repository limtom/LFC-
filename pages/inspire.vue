<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" justify="center" align="center">
      <v-form
        ref="geoform"
        v-on:submit.prevent="validateForm(coordinatorInfo.phoneNumber)"
      >
        <v-card class="d-flex flex-column mx-auto" max-width="400">
          <v-card-title class="text-h6 font-weight-light mt-5 mb-5 mx-auto">
            Add a WSF location
          </v-card-title>
          <v-card-text>
            <v-text-field
              class="text-body-1"
              name="Phone-number"
              label="Phone-number"
              id="id"
              outlined
              dense
              type="number"
              prefix="+234"
              v-model="coordinatorInfo.phoneNumber"
              :disabled="!locationStatus"
              :rules="phoneRules"
              placeholder="Coordinator or Assistance phone number "
            ></v-text-field>
            <div class="text-center">
              <Map v-on:locationReady="setLocationStatus($event)" />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit">
              Continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '~/components/Map.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  name: 'ADD-Page',
  components: {
    Map,
  },
  data() {
    return {
      phoneRules: [
        (value) => !!value || 'Phone number is required',
        (value) =>
          (value && (value.length === 11 || value.length === 10)) ||
          'Phone number not valid',
      ],

      coordinatorInfo: {
        phoneNumber: '',
      },
      wsfCenterFound: {},
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
      // console.log(event)
    },

    //Capture the form data and validate it
    validateForm(event) {
      if (this.$refs.geoform.validate()) {
        //Look up for the phone number from the store
        let inputttedPhoneNumber =
          event.trim().length === 11 ? event : `0${event}`
        //Pass the time to another function
        this.getCenter(inputttedPhoneNumber)
      }
    },
    getCenter(inputttedPhoneNumber) {
      let center = this.getWsfcenters.filter((wsfCenter) => {
        //Check for the length of the phone number array
        if (wsfCenter['phone-number'].length > 1) {
          wsfCenter['phone-number'].find((phoneNumber) => {
            return phoneNumber == inputttedPhoneNumber
          })
        }
        return wsfCenter['phone-number'] == inputttedPhoneNumber
      })
      this.wsfCenterFound =
        center.length > 0
          ? { ...center[0], geoLoc: this.userLocation }
          : 'WSF center not found'

      //Reset the form
      this.$refs.geoform.reset()

      if (center.length > 0) {
        //Pass the location info and phone number to mutate the store
        this.addGeolocationCoord(this.wsfCenterFound)
      }

      console.log(this.wsfCenterFound)
    },
    addGeolocationCoord() {
      //Dispatch an action that will mutate the corresponding data on the state
      this.$store.dispatch('setNewWsfCenters', this.wsfCenterFound)
    },
  },
  computed: {
    ...mapGetters(['getWsfcenters']),
  },
}
</script>
<style scoped>
#id {
  font-size: 12px;
}
</style>
