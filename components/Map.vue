<template>
  <client-only>
    <l-map
      style="height: 350px;"
      :zoom="zoom"
      :center="center"
      v-on:ready="getLocation"
      ref="map"
      v-on:locationfound="locationFound($event)"
      v-on:locationerror="locationError"
    >
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />
      <l-marker :lat-lng="userLocation" v-if="locationReady"></l-marker>
    </l-map>
  </client-only>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.31322, -1.319482],
      userLocation: {},
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
      locationReady: false,
    }
  },
  methods: {
    getLocation() {
      this.$nextTick(() => {
        this.$refs.map.mapObject.locate({
          setView: true,
          enableHighAccuracy: true,
        })
      })
    },

    locationFound(event) {
      this.$nextTick(() => {
        //Set the location status and extract the position information
        this.locationReady = true
        this.userLocation = event.latlng
        console.log(this.userLocation)

        //Emit an event to send to the parent
        this.$emit('locationReady', {
          locationStatus: true,
          userLocation: this.userLocation,
        })
      })
    },

    locationError(event) {
      console.log(event.message)
    },
  },
}
</script>
