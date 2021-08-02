<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" sm="8" md="6" justify="center" align="center">
      <v-form
        ref="geoform"
        v-on:submit.prevent="validateForm(coordinatorInfo.phoneNumber)"
        v-if="!notAtWsfCenter"
      >
        <v-card
          class="d-flex flex-column mx-auto"
          max-width="400"
          tile
          color="orange lighten-2"
          elevation="0"
        >
          <v-card-title
            class="d-flex flex-column text-h6 font-weight-light mx-auto white--text text--darken-4"
          >
            <v-img
              :src="require('~/static/LFC-logo2.png')"
              max-width="60"
              max-height="60"
              position="center center"
              light
              eager
            ></v-img>
            WSF center Info
          </v-card-title>
          <v-card-text>
            <v-text-field
              class="text-body-2"
              name="Phone-number"
              label="Phone-number"
              id="id"
              outlined
              rounded
              dense
              type="number"
              prefix="+234"
              color="white"
              flat
              v-model="coordinatorInfo.phoneNumber"
              :disabled="!locationStatus"
              :rules="phoneRules"
              placeholder="Coordinator or Assistance phone number "
            ></v-text-field>
            <div class="text-center">
              <Map
                v-on:locationReady="setLocationStatus($event)"
                v-on:hook:mounted="openDialog"
              />
            </div>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="red"
              type="submit"
              class="text-capitalize font-weight-light white--text"
              rounded
              outlined
              width="100"
              elevation="0"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <v-alert
        prominent
        type="info"
        v-else
        class="text-h6 pa-5 font-weight-light"
        elevation="16"
        dismissible
      >
        Sorry you can't continue with this operation at the moment, as you have
        to be at the venue of your home cell.
      </v-alert>
    </v-col>
    <v-dialog
      v-model="$store.state.dialog"
      persistent
      max-width="290"
      style="z-index: 300000;"
    >
      <v-card class="d-flex flex-column justify-center">
        <v-card-title class="text-h5 mx-auto">
          Notice
        </v-card-title>
        <v-card-text class="text-justify black--text pb-0">
          This geo form is intended at attaching geographic coordinates to the
          existing WSF centers database, hence you are expected to fill it at
          your respective WSF center.
          <em class="font-weight-bold">i.e. the venue of the Home cell.</em>
          Also don't forget to switch on your phone location to make the phone
          number field active.
          <v-checkbox
            label="Are you at the WSF venue"
            v-model="wsfVenue"
            hide-details
            dense
            color="success"
            class="text-caption"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text v-on:click="noClicked">
            No
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            v-on:click="yesClicked"
            :disabled="!wsfVenue"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      wsfVenue: false,
      notAtWsfCenter: false,
      success: false,
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
        if (wsfCenter['phone_numbers'].length > 1) {
          wsfCenter['phone_numbers'].find((phoneNumber) => {
            return phoneNumber == inputttedPhoneNumber
          })
        }
        return wsfCenter['phone_numbers'] == inputttedPhoneNumber
      })
      this.wsfCenterFound =
        center.length > 0
          ? { ...center[0], geoLoc: this.userLocation }
          : 'WSF center not found'

      //Save the info if the wsf center was found
      if (center.length > 0) {
        //Pass the location info and phone number to mutate the store
        this.addGeolocationCoord(this.wsfCenterFound)
      } else {
        this.$router.push('/notfound')
      }

      //Reset the form
      this.$refs.geoform.reset()
    },

    //Add the geo location information
    addGeolocationCoord() {
      //Dispatch an action that will mutate the corresponding data on the state
      this.$store.dispatch('setLatestUpdate', this.wsfCenterFound)
      //route to the success page
      this.$router.push('/success')
      console.log(this.wsfCenterFound)
    },

    //Open the dialog on page load
    openDialog() {
      this.$store.dispatch('showDialog', true)
    },

    //Close the dialog
    yesClicked() {
      this.$store.dispatch('showDialog', false)
    },

    noClicked() {
      this.notAtWsfCenter = true
      this.$store.dispatch('showDialog', false)
    },
  },
  computed: {
    ...mapGetters(['getWsfcenters']),
  },
}
</script>
<style lang="css" scoped>
#id {
  font-size: 12px;
}

.v-label {
  font-size: 12px !important;
}
.v-input__control .v-text-field .v-input__slot {
  background-color: white !important;
  color: #000;
}
</style>
