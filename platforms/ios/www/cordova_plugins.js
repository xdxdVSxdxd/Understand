cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.rjfun.cordova.plugin.iad/www/iAd.js",
        "id": "com.rjfun.cordova.plugin.iad.iAd",
        "clobbers": [
            "window.plugins.iAd"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.rjfun.cordova.plugin.iad": "0.1.8",
    "org.apache.cordova.inappbrowser": "0.6.0",
    "nl.x-services.plugins.socialsharing": "4.3.15"
}
// BOTTOM OF METADATA
});