export const mapService = {
    initMap,
    addMarker,
    panTo,
    searchLoc
}




// Var that is used throughout this Module (not global)
var gMap

window.gMap = gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBA0bZs4BEDHIfyoa7qPQVxmXH8j8WbTEE'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function searchLoc(searchQuery) {
    const API_KEY = 'AIzaSyBA0bZs4BEDHIfyoa7qPQVxmXH8j8WbTEE'
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${API_KEY}`
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            panTo(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
            return data
        })
        .catch(err => console.log(err))
}
