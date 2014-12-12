/*******************************************************************************
 * Tizen UI Builder Framework 0.3.1
 * Page System manager
 *
 * @generated Tizen UI Builder
 * @attribute managed, readonly, static
 *******************************************************************************
 */

/**
 * @class _page
 * @classdesc Page Base Class
 * @brief Page Base Class
 * @return {Object}
 * @public
 * @alias _page
 * @member window
 */
var _page = function (pageID) {
	if (pageID) {
		this._setPageID(pageID);
	}
};

/**
 * @property {String} pageID
 * @brief pageID
 * @public
 * @member _page
 */
_page.prototype.pageID = undefined;

/**
 * @method _setPageID
 * @brief Set the pageID
 * @private
 * @member _page
 */
_page.prototype._setPageID = function (pageID) {
	this.pageID = pageID;
};

/**
 * @property {HTMLElement} obj
 * @brief Page object
 * @public
 * @member _page
 */
_page.prototype.obj = undefined;

/**
 * @property {Object} tauObj
 * @brief Advanced page object
 * @public
 * @member _page
 */
_page.prototype.tauObj = undefined;

/**
 * @method onpagebeforecreate
 * @brief Triggered before the widget is created and initialized
 * @param {Object} event
 * @public
 * @event pagebeforecreate
 * @member _page
 */
_page.prototype.onpagebeforecreate = function (event) {};

/**
 * @method onpagecreate
 * @brief Triggered after widget creation
 * @param {Object} event
 * @public
 * @event pagecreate
 * @member _page
 */
_page.prototype.onpagecreate = function (event) {};

/**
 * @method onpageinit
 * @brief Triggered after widget initialization occurs
 * @param {Object} event
 * @public
 * @event pageinit
 * @member _page
 */
_page.prototype.onpageinit = function (event) {};

/**
 * @method onpagebeforeshow
 * @brief Triggered before page will be displayed
 * @param {Object} event
 * @public
 * @event pagebeforeshow
 * @member _page
 */
_page.prototype.onpagebeforeshow = function (event) {};

/**
 * @method onpageshow
 * @brief Triggered after the page is displayed
 * @param {Object} event
 * @public
 * @event pageshow
 * @member _page
 */
_page.prototype.onpageshow = function (event) {};

/**
 * @method onpagebeforehide
 * @brief Triggered before current page is about to be closed
 * @param {Object} event
 * @public
 * @event pagebeforehide
 * @member _page
 */
_page.prototype.onpagebeforehide = function (event) {};

/**
 * @method onpagehide
 * @brief Triggered after the page is hidden
 * @param {Object} event
 * @public
 * @event pagehide
 * @member _page
 */
_page.prototype.onpagehide = function (event) {};

/**
 * @method onpageremove
 * @brief Triggered after the external page is removed from the DOM
 * @param {Object} event
 * @public
 * @event pageremove
 * @member _page
 */
_page.prototype.onpageremove = function (event) {};

/**
 * @method onupdatelayout
 * @brief Triggered by components within the framework that dynamically show/hide content.
 * @param {Object} event
 * @deprecated
 * @event updatelayout
 * @member _page
 */
_page.prototype.onupdatelayout = function (event) {};

/**
 * @method changePage
 * @brief Handles change page process
 * @param {HTMLElement|String} toPage
 * @param {Object} options
 * @public
 * @member _page
 */
_page.prototype.changePage = function(toPage, options) {
    tau.changePage(toPage, options);
};

/**
 * @method blur
 * @brief Removes the focus from the page and all descendants.
 * @public
 * @member _page
 */
_page.prototype.blur = function() {
    this.tauObj.blur();
};

/**
 * @method focus
 * @brief Sets the focus to the page.
 * @public
 * @member _page
 */
_page.prototype.focus = function() {
    this.tauObj.focus();
};

/**
 * @method updatePageLayout
 * @brief Calculates and updates the content height.
 * @public
 * @member _page
 */
_page.prototype.updatePageLayout = function () {
    this.tauObj.updatePageLayout();
};

/**
 * @method _init_page
 * @brief Handler method for event "pageinit"
 * @param {Function} initFunc
 * @private
 * @member _page
 */
_page.prototype._init_page = function(initFunc) {
	// page object
	var _obj = document.getElementById(this.pageID),
	// page events
	events = tau.router.Page.events,
	// current page id
	_currentPageId = this.pageID,
	// page class
	_basePage = this;
	events.pagebeforecreate = 'pagebeforecreate';
	Object.keys(events).forEach(function (key){
		if (events[key].indexOf('page') > -1) {
			_obj.addEventListener(events[key], function (event) {
			});
		}
	});
	_obj.addEventListener("pageinit", initFunc);
	_obj.addEventListener("pagebeforeshow", function(event) {
		app.setCurrentPageId(_currentPageId);
	});
	_obj.addEventListener("pagebeforehide", function(event) {
		app.setCurrentPageId(undefined);
	});
	_obj.addEventListener("pagehide", function(event) {
		if (app.getCurrentPageId() == undefined) {
			tizen.application.getCurrentApplication().exit();
		}
	});
	_obj.addEventListener("pagebeforecreate", function(event){_basePage.onpagebeforecreate(event);});
	_obj.addEventListener("pagecreate", function(event){_basePage.onpagecreate(event);});
	_obj.addEventListener("pageinit", function(event){_basePage.onpageinit(event);});
	_obj.addEventListener("pagebeforeshow", function(event){_basePage.onpagebeforeshow(event);});
	_obj.addEventListener("pageshow", function(event){_basePage.onpageshow(event);});
	_obj.addEventListener("pagebeforehide", function(event){_basePage.onpagebeforehide(event);});
	_obj.addEventListener("pagehide", function(event){_basePage.onpagehide(event);});
	_obj.addEventListener("pageremove", function(event){_basePage.onpageremove(event);});
	_obj.addEventListener("updatelayout", function(event){_basePage.onupdatelayout(event);});
};

/**
 * @method _remove_page
 * @brief Handler method for event "pageremove"
 * @param {Function} removeFunc
 * @private
 * @member _page
 */
_page.prototype._remove_page = function(removeFunc) {
	var _obj = this.obj = document.getElementById(this.pageID);
	tau.event.on(_obj, "pageremove", removeFunc);
};

/**
 * @class _app
 * @classdesc App Base Class
 * @brief App Base Class
 * @return {Object}
 * @public
 * @alias _app
 * @member window
 */
var _app = function () {};

/**
 * @property {String} _currentPageId
 * @brief Current Page ID
 * @private
 * @member _app
 */
_app.prototype._currentPageId = undefined;

/**
 * @method _init
 * @brief Initialize the app
 * @private
 * @member _app
 */
_app.prototype._init = function () {};

/**
 * @method setCurrentPageId
 * @brief Set the current page id
 * @param {String} pageId
 * @member _app
 */
_app.prototype.setCurrentPageId = function (pageId) {
	this._currentPageId = pageId;
};

/**
 * @method getCurrentPageId
 * @brief Get the current page id
 * @return {String}
 * @memeber _app
 */
_app.prototype.getCurrentPageId = function() {
	return this._currentPageId;
};

/**
 * @method onload
 * @brief Called when app was loaded
 * @public
 * @member _app
 */
_app.prototype.onload = function () {};

/**
 * @method onunload
 * @brief Called when app was unloaded
 * @public
 * @member _app
 */
_app.prototype.onunload = function () {};

/**
 * @method onshow
 * @brief Called when the app content was visible.
 * @public
 * @member _app
 */
_app.prototype.onshow = function () {};

/**
 * @method onhide
 * @brief Called when the app content was not visible.
 * @public
 * @member _app
 */
_app.prototype.onhide = function () {};

/**
 * @method onpagebeforechange
 * @brief Called before switching from the current page.
 * @public
 * @member _app
 */
_app.prototype.onpagebeforechange = function () {};

/**
 * @method onpagebeforeload
 * @brief Called before an external page is loaded.
 * @public
 * @member _app
 */
_app.prototype.onpagebeforeload = function () {};

/**
 * @method onpagechange
 * @brief Called after switching from the current page to the new page.
 * @public
 * @member _app
 */
_app.prototype.onpagechange = function () {};

/**
 * @method onpagechangefailed
 * @brief Called when the page switching fails.
 * @public
 * @member _app
 */
_app.prototype.onpagechangefailed = function () {};

/**
 * @method onpageload
 * @brief Called after an external page is loaded.
 * @public
 * @member _app
 */
_app.prototype.onpageload = function () {};

/**
 * @type {Function} _app
 * @instance
 * @global
 */
window.app = new _app();