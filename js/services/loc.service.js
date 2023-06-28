import { storageService } from './async-storage.service.js'

export const locService = {
    getLocs,
    removeLoc,
    addLoc
}

LOC_KEY = 'locDB'

// object example:
// {id, name, lat, lng, weather, createdAt, updatedAt}


let locs = [
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



function removeLoc(locId) {
    storageService.remove(LOC_KEY, locId)
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function getEmptyLoc(name = '', score = 0) {
    return { id: '', name, score }
}

function save(loc) {
    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
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