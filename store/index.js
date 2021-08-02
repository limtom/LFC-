//Create the state and export it
export const state = () => ({
    wsfCenters: [],
    dialog: false,
    latestUpdate: {},
})

//Create the getter object
export const getters = {
    //Get all wsf center from the state
    getWsfcenters(state) {
        return state.wsfCenters
    },

    //Get the new wsf center 
    getNewWsfCenters(state) {
        return state.newWsfCenters
    }
}

//Create the mutation and export it
export const mutations = {
    //Set the wsf center
    SET_WSF_CENTERS(state, payload) {
        return state.wsfCenters = payload
    },

    //Show dialog for location prompting
    SHOW_DIALOG(state, payload) {
        return (state.dialog = payload);
    },

    //Update the database with the locaton information
    SET_LATEST_UPDATE(state, payload) {
        //Set the request header
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Create the payload to send along with the request
        var locationinfo = JSON.stringify({ "geom": `POINT(${payload.geoLoc.lng} ${payload.geoLoc.lat})` });

        //Create the request details
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: locationinfo,
            redirect: 'follow'
        };

        //Make the request
        fetch(`http://localhost:4000/wsf_centers_main?id=eq.${payload.id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        //Show the latest update data;
        return state.latestUpdate = payload
    }
}

//Create an action
export const actions = {
    //Populate the wsf state on server start up
    async nuxtServerInit({ commit }) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
        //Request for the data from the database
        await fetch('http://localhost:4000/wsf_centers_main', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                commit('SET_WSF_CENTERS', JSON.parse(result))
            })
            .catch((error) => console.log('error', error))
    },

    //Show prompt dialog
    showDialog({ commit }, payload) {
        commit("SHOW_DIALOG", payload);
    },

    //Set latest update on the state
    setLatestUpdate({ commit }, payload) {
        commit('SET_LATEST_UPDATE', payload)
    }
}
