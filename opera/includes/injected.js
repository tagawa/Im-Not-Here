// Create the extension's all-encompassing object
var ImNotHere = ImNotHere || {};

// Reference: http://www.w3.org/TR/geolocation-API/#api_description
// Make the default Opera HQ in Oslo
ImNotHere.position = {
    coords: {
        latitude: 59.928312848885064,
        longitude: 10.754767656326294,
        altitude: null,
        accuracy: 100,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    },
    timestamp: new Date().getTime()
};

// Override the above coordinates with the user's preferences
opera.extension.onmessage = function(event) {
    var prefs = JSON.parse(event.data);
    ImNotHere.position.coords.latitude = prefs.latitude;
    ImNotHere.position.coords.longitude = prefs.longitude;
    ImNotHere.position.coords.accuracy = prefs.accuracy;
};

// Override the geolocation methods
ImNotHere.init = function() {
    // Get the extension's preferences from the background process
    opera.extension.postMessage('getPrefs');
    
    window.navigator.geolocation.getCurrentPosition = function(successCallback, errorCallback, options) {
        successCallback(ImNotHere.position);
    }
    
    window.navigator.geolocation.watchPosition = function(successCallback, errorCallback, options) {
        successCallback(ImNotHere.position);
    }
    
    window.navigator.geolocation.clearWatch = function(watchId) {};
};

// Run this before the page's scripts are executed
window.opera.addEventListener('BeforeScript', ImNotHere.init, false);
