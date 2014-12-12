/*******************************************************************************
 * Tizen UI Builder Framework 0.3.1
 * Application entry manager
 *
 * @generated Tizen UI Builder
 * @attribute managed, readonly, static
 *******************************************************************************
 */

// event handlers for document
var events = tau.router.Page.events;
events.pagebeforecreate = 'pagebeforecreate';
Object.keys(events).forEach(function (key){
	if (events[key].indexOf('page') > -1) {
		document.addEventListener(events[key], function (event) {
		});
	}
});

// event handler for detecting when hardware key clicked
document.addEventListener('tizenhwkey', function(e) {
	if (e.keyName == "back")
		tizen.application.getCurrentApplication().exit();
});

/** call user entry */
// app initialize
if (app && app.init) {
	app.init();
}

// event handler that triggered the app is loaded.
if (app.onload) {
	app.onload();
}

// event handler that triggered the app is displayed
if (!document.webkitHidden) {
	app.onshow();
}

// event handler that triggered before switching from the current page
document.addEventListener("pagebeforechange", app.onpagebeforechange, false);

// event handler that triggered after switching from the current page to the new page
document.addEventListener("pagechange", app.onpagechange, false);

// event handler that triggered when the page switching fails
document.addEventListener("pagechangefailed", app.onpagechangefailed, false);

// event handler that triggered before an external page is loaded
document.addEventListener("pagebeforeload", app.onpagebeforeload, false);

// event handler that triggered after an external page is loaded
document.addEventListener("pageload", app.onpageload, false);

// event handler for detecting when visibility changes
document.addEventListener("webkitvisibilitychange", function() {
	if (document.webkitHidden) {
		app.onhide();
	} else {
		app.onshow();
	}
}, false);

// event handler that triggered the app is unloaded
window.addEventListener("beforeunload", app.onunload);

