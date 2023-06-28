import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onSearchLocation = onSearchLoc
window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    renderLocs()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            // document.querySelector('.user-pos').innerText =
            //     `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            onPanTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat, lan) {
    console.log('Panning the Map')
    mapService.panTo(lat, lan)
}

function onSearchLoc(ev) {
    ev.preventDefault()
    let searchQuery = document.querySelector('.search-input').value
    console.log(searchQuery)
    mapService.searchLoc(searchQuery)
        .then(res => renderLoc(res))
        .catch(err => console.log(err))
}

function renderLoc(res) {
    document.querySelector('.current-location').innerHTML = res.results[0].formatted_address
}

function renderLocs() {

    locService.getLocs().then(locs => {
        console.log(locs)
        var strHTMLs = locs.map(loc => `
          <li>${loc.name}
              <button class="remove-btn" onclick="onRemoveLocs('${loc.id}')">x</button>
              <button class="go-btn" onclick="onPanToLocs('${loc.id}')">Go</button>
          </li>
        `)
        document.querySelector('.locs').innerHTML = strHTMLs.join('')
      }).catch(error => {
        console.error('Error fetching locs:', error)
      })
}