import { storageService } from './async-storage.service.js'


export const locService = {
    getLocs,
    removeLoc,
    addLoc
}



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


// {id, name, lat, lng, weather, createdAt, updatedAt}


const STORAGE_KEY = 'locDB'
var gLocs = _createLocs()


function getLocs() {
    const locs = loadFromStorage(STORAGE_KEY)
    gLocs = (locs) ? locs : []
    return gLocs
}

function removeLoc(locId) {
    var locId = gLocs.findIndex(loc => locId === loc.id)
    gLocs.splice(locId, 1)
    _savelocsToStorage()
}

function addLoc(name, lat, lng, weather, createdAt, updatedAt) {
    const loc = _createLoc(name, lat, lng, weather, createdAt, updatedAt)
    gLocs.push(loc)
    _savePlacesToStorage()
}

function _createLoc(name, lat, lng, weather, createdAt, updatedAt) {
    return {
        id: storageService.makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt
    }
}

function _createLocs() {
    return [
        _createLoc('London'),
        _createLoc('Paris'),
        _createLoc('Berlin')
    ]
}

function _savePlacesToStorage() {
    saveToStorage(STORAGE_KEY, gPlaces)
}
