window.addEventListener('DOMContentLoaded', function() {
    // Set global variables
    var frm_prefs = document.getElementById('frm_prefs');
    var sel_places = document.getElementById('sel_places');
    var prefs = ['latitude', 'longitude', 'accuracy'];
    
    function init() {
        // Load list of places in select box
        for (var i = 0, option, place; place = places[i]; i++) {
            option = document.createElement('option');
            option.value = place.name.toLowerCase().replace(/[^a-zA-Z0-9\-_]/g, '');
            option.text = place.name;
            if (place.latitude == widget.preferences['latitude'] && place.longitude == widget.preferences['longitude']) {
                option.selected = true;
            }
            sel_places.appendChild(option);
        }
        
        // Update form values from extension's preferences
        for (var i = 0, pref; pref = prefs[i]; i++) {
            document.getElementById('txt_' + pref).value = widget.preferences[pref];
            if (sel_places.selectedIndex === 0) { // Custom location
                document.getElementById('txt_' + pref).value = widget.preferences[pref + '_user'];
            } else if (pref !== 'accuracy') { // Preset location
                document.getElementById('txt_' + pref).disabled = true;
            }
        }
    }
    
    // Update form values when selection is changed
    function doPopulate() {
        var txt_latitude = document.getElementById('txt_latitude') || 0;
        var txt_longitude = document.getElementById('txt_longitude') || 0;
        
        if (this.selectedIndex === 0) { // Custom location
            txt_latitude.value = widget.preferences['latitude_user'];
            txt_longitude.value = widget.preferences['longitude_user'];
            txt_latitude.disabled = false;
            txt_longitude.disabled = false;
            txt_latitude.focus();
        } else { // Preset location
            var preset = places[this.selectedIndex];
            txt_latitude.value = preset.latitude;
            txt_longitude.value = preset.longitude;
            txt_latitude.disabled = true;
            txt_longitude.disabled = true;
        }
        
        // Check for empty values
        txt_latitude.value = txt_latitude.value || 0;
        txt_longitude.value = txt_longitude.value || 0;
    };
    
    // Save values to extension's preferences
    function doSave() {
        for (var i = 0, pref; pref = prefs[i]; i++) {
            widget.preferences[pref] = document.getElementById('txt_' + pref).value;
            // Save user-defined preferences separately as well
            if (document.getElementById('sel_places').selectedIndex === 0) {
                widget.preferences[pref + '_user'] = document.getElementById('txt_' + pref).value;
            }
        }
    }
    
    sel_places.onchange = doPopulate;
    frm_prefs.onsubmit = doSave;
    init();
}, false);
