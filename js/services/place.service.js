// {id, name, lat, lng, weather, createdAt, updatedAt}

export const placeService = {
    getPlaces,
    removePlace,
    addPlace
}

const STORAGE_KEY = 'placeDB'
var gPlaces = _createPlaces()


function getPlaces() {
    const places = loadFromStorage(STORAGE_KEY)
    gPlaces = (places)? places : []
    return gPlaces
}

function removePlace(placeId) {
    var placeId = gPlaces.findIndex(place => placeId === place.id)
    gPlaces.splice(placeId, 1)
    _savePlacesToStorage()
}

function addPlace(name, lat, lng, weather, createdAt, updatedAt) {
    const place = _createPlace(name, lat, lng, weather, createdAt, updatedAt)
    gPlaces.push(place)
    _savePlacesToStorage()
}

function _createPlace(name, lat, lng, weather, createdAt, updatedAt) {
    return {
        id: makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt
    }
}

function _createPlaces() {
    return [
        _createPlace('London'),
        _createPlace('Paris'),
        _createPlace('Berlin')
    ]
}

function _savePlacesToStorage() {
    saveToStorage(STORAGE_KEY, gPlaces)
}

