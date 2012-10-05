opera.extension.onmessage = function(event) {
    var tab = opera.extension.tabs.getFocused();
    if (tab) {
        opera.extension.broadcastMessage(JSON.stringify(widget.preferences));
    }
};
