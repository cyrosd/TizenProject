/*
 * UI Builder
 *
 * Copyright (c) 2000 - 2014 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 * - S-Core Co., Ltd
 *
 */


;(function (window, document, $, undefined){

	/**
	 * @class uibinding
	 * @classdesc Object contains main framework methods.
	 * @brief Object contains main framework methods.
	 * @return {uibinding}
	 */
	var uibinding = {};

	/**
	 * @class uibinding.dataModel
	 * @classdesc Data Model Class
	 * @brief Data Model Class
	 * @param {Object} arguments
	 * @return {Object}
	 * @public
	 * @alias dataModel
	 * @member uibinding.dataModel
	 */
	uibinding.dataModel = function () {
		if (arguments.length !== 1) {
			return null; 
		}

		var _self = this;
		var args = Array.prototype.slice.call(arguments, 0);
		args = args.shift();
		return _self._set(args);
	};

	uibinding.dataModel.prototype.constructor = uibinding.dataModel;

	/**
	 * @method _set
	 * @brief Make a data model using ko.mapping
	 * @param {Object} obj
	 * @return {Object}
	 * @private
	 * @member uibinding.dataModel
	 */
	uibinding.dataModel.prototype._set = function (obj) {
		if ($.isPlainObject(obj)) {
			jsonData = obj;
		} else {
			jsonData = $.parseJSON(obj);
		}
		return ko.mapping.fromJS(jsonData);
	};

	/**
	 * @class uibinding.dataSource
	 * @classdesc Data Source Class
	 * @brief Data Source Class
	 * @param {Object} arguments
	 * @public
	 * @alias dataSource
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource = function () {};

	uibinding.dataSource.prototype.constructor	= uibinding.dataSource;

	/**
	 * @property {Object} data
	 * @brief JSON Object type of data
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.data = {};

	/**
	 * @property {Object} handlers
	 * @brief The Handlers of dataSource
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.handlers = {
			"success" : [],
			"error" : [],
			"complete": []
	};

	/**
	 * @method update
	 * @brief update or refresh the data of dataSource
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.update = function () {};

	/**
	 * @method getData
	 * @brief Method gets object of data
	 * @return {Object}
	 * @private
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.getData = function () { 
		return this.data; 
	};

	/**
	 * @method getData
	 * @brief Method gets object of data
	 * @return {Object}
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.addHandler = function (name, callback, obj) {
		var _self = obj || this;
		if (callback && typeof(name) === "string") {
			if (_self.handlers.hasOwnProperty(name)) {
				_self.handlers[name].push(callback);
			} else {
				_self.handlers = $.extend(true, _self.handlers, (temp={}, temp[name] = [], temp[name].push(callback), temp));
			}
			return true;
		}
		return false;
	};

	/**
	 * @method clearHandler
	 * @brief Clear all handlers of dataSource
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.clearHandler = function () {
		var _self = this;
		_self.handlers = {};
	};

	/**
	 * @method removeHandler
	 * @brief Remove the handler of dataSource
	 * @param {String} name
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.removeHandler = function (name) {
		var _self = this;
		_self.handlers[name] = [];
	};

	/**
	 * @method getHandler
	 * @brief Get the handler of dataSource
	 * @param {String} name
	 * @return {Function}
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.getHandler	= function (name) {
		return this.handlers[name];
	};

	/**
	 * @method fireHandler
	 * @brief Fire the handler of dataSource
	 * @param {Function} callback
	 * @public
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype.fireHandler	= function (callback, obj) {
		var _self = obj || this;
		if (callback && typeof(callback) === "function") {
			callback.apply(_self, Array.prototype.slice.call(arguments));

		} else if (callback && typeof(callback) == "string") {
			var handlers = _self.handlers[callback];
			if (handlers) {
				if (handlers && typeof(handlers) === "function") {
					handlers.apply(_self, Array.prototype.slice.call(arguments));
				} else {
					handlers.forEach(function (callback) {
						callback.apply(_self, Array.prototype.slice.call(arguments));
					});
				}
			}
		}
	};

	/**
	 * @method _toJson
	 * @brief Convert to JSON Object
	 * @param {Object|String} strData
	 * @param {String} strDataType
	 * @private
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype._toJson = function (strData, strDataType) {
		var _self = this;
		var jsonData = {};
		if (strDataType === "xml") {
			var xmlData = {};
			if ($.isXMLDoc(strData)) {
				xmlData = strData;
			} else {
				xmlData = $.parseXML(strData);
			}
			jsonData = $.xml2json(xmlData);
		} else if (strDataType === "json") {
			if ($.isPlainObject(strData)) {
				jsonData = strData;
			} else {
				jsonData = $.parseJSON(strData);
			}
		} else {
			window.console && console.error("Error: We do not support " + strDataType + ".");
			_self.fireHandler("error");
		}
		return jsonData;
	};

	/**
	 * @method _updateOptions
	 * @brief Update the Object with default options
	 * @param {Object} obj
	 * @param {Object} baseObj
	 * @private
	 * @member uibinding.dataSource
	 */
	uibinding.dataSource.prototype._updateOptions = function (obj, baseObj) {
		baseObj = $.extend(true, baseObj, obj);
	};

	/**
	 * @class uibinding.dataSourceRemote
	 * @classdesc Data Source Class for Remote Call
	 * @brief Data Source Class for Remote Call
	 * @param {Object} arguments
	 * @public
	 * @alias dataSourceRemote
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote = function () {
		if (arguments.length !== 1) {
			return null; 
		}

		var _self = this;
		_self.options = {
				async: !1,
				url: "",
				type: "GET",
				proxy: "ajax",
				query: {},
				headers: {},
				timeout: "5000",
				dataType: "json"
		};

		var args = Array.prototype.slice.call(arguments, 0);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;
	};

	uibinding.dataSourceRemote.prototype = new uibinding.dataSource();

	uibinding.dataSourceRemote.prototype.constructor = uibinding.dataSourceRemote;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceRemote
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _checkArguments
	 * @brief Checks Arguments
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype._checkArguments = function () {
		var _self = this;
		var arrProperties = Object.getOwnPropertyNames(_self); 
		if (arrProperties.length === 0) {
			_self.fireHandler("error");
			return false;
		}
		return true;
	};

	/**
	 * @method _remoteCall
	 * @brief Request data from remote server
	 * @private
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype._remoteCall = function () {
		var _self = this;
		$.ajax(_self.options.url, {
			async: _self.options.async,
			method: _self.options.method,
			data: _self.options.query,
			headers: _self.options.headers,
			timeout: _self.options.timeout,
			dataType : _self.options.dataType
		}).success(function (data, status, req) {
			_self.data = _self._toJson(data, _self.options.dataType);
			_self.fireHandler("success");
		}).error(function(req, status, err) {
			_self.fireHandler("error");
		}).complete(function (req, status) { 
			_self.fireHandler("complete");
		});
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype._update = function () {
		var _self = this;
		if (_self._checkArguments()) {
			if (this.options.proxy === "ajax" || this.options.proxy === "jsonp") {
				_self._remoteCall();
			}
		}
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceRemote
	 */
	uibinding.dataSourceRemote.prototype.update = function () {
		var _self = this;
		if (arguments.length > 0) {
			var args = Array.prototype.slice.call(arguments, 0);
			var new_options = args.shift();
			_self._updateOptions(new_options, _self.options);
		}
		_self._update();
		return this;
	};

	/**
	 * @class uibinding.dataSourceStatic
	 * @classdesc Data Source Class for Static
	 * @brief Data Source Class for Static
	 * @param {Object} arguments
	 * @public
	 * @alias dataSourceStatic
	 * @member uibinding.dataSourceStatic
	 */
	uibinding.dataSourceStatic = function () {
		if (arguments.length !== 1) {
			return null;
		}

		var _self = this;
		_self.options = {
				data: "",
				dataType: "json"
		};

		var args = Array.prototype.slice.call(arguments);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;

	};

	uibinding.dataSourceStatic.prototype = new uibinding.dataSource();

	uibinding.dataSourceStatic.prototype.constructor = uibinding.dataSourceStatic;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceStatic
	 */
	uibinding.dataSourceStatic.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceRemote
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceStatic
	 */
	uibinding.dataSourceStatic.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceStatic
	 */
	uibinding.dataSourceStatic.prototype._update = function () {
		var _self = this;
		_self.data = _self._toJson(_self.options.data, _self.options.dataType);
		if (!$.isEmptyObject(_self.data)) {
			_self.fireHandler("success");
			return true;
		}
		_self.fireHandler("error");
		return false;
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceStatic
	 */
	uibinding.dataSourceStatic.prototype.update = function () {
		var _self = this;
		_self._update();	
		return _self;
	};

	/**
	 * @class uibinding.dataSourceContact
	 * @classdesc Data Source Class for a Contact
	 * @brief Data Source Class for a Contact
	 * @param {Object} arguments
	 * @param {String} arguments.method
	 *   a. ALL
	 *   b. UNIFIED
	 *   c. DEFAULT
	 *   d. SELECTED_ADDRESSBOOKID
	 * @param {String} arguments.addressBookId
	 *   : set up an addressbookId only when 'method' was SELECTED_ADDRESSBOOKID
	 * @public
	 * @alias dataSourceContact
	 * @member uibinding.dataSourceContact
	 */
	uibinding.dataSourceContact = function () {
		if (arguments.length !== 1) {
			return false; 
		}

		var _self = this;
		_self.options = {
				method: "ALL",
				addressBookId: ""
		};

		var args = Array.prototype.slice.call(arguments, 0);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;
	};

	uibinding.dataSourceContact.prototype = new uibinding.dataSource();

	uibinding.dataSourceContact.prototype.construct = uibinding.dataSourceContact;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceContact
	 */
	uibinding.dataSourceContact.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceContact
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceContact
	 */
	uibinding.dataSourceContact.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceContact
	 */
	uibinding.dataSourceContact.prototype._update = function () {
		var _self = this;
		_self.data = {};
		_self.data.addressbooks = [];

		var _method = _self.options.method ? _self.options.method : null;
		var _addrBookId = (_method == "SELECTED_ADDRESSBOOKID") ? _self.options.addressBookId : null;
		var _addr = null;

		function _error (error) {
			window.console && console.error("ERROR(" + error.code + ") : " + error.name + " " + error.message);
			_self.fireHandler("error");
		}

		function _contactsFound(contacts) {
			try {
				_addr.contacts = contacts;

				_self.fireHandler("success");
				return true;

			} catch (err) {
				_self.fireHandler("error");
				return false;
			}
		}

		function _addressbooksFound (addressbooks) {
			var addressbooksLength = addressbooks.length;
			if (addressbooksLength > 0 ) {
				for (var i = 0; i < addressbooksLength; i++ ) {
					_addr = {};
					_addr = addressbooks[i];

					_addr.contacts = [];
					_addr.find(_contactsFound, _error, null);
					_self.data.addressbooks.push(_addr);
				}
			}
		}

		if (window.tizen && tizen.contact) {
			if (_method === "ALL") {
				tizen.contact.getAddressBooks(_addressbooksFound, _error);
			} else {
				if (_method === "UNIFIED") {
					_addr = tizen.contact.getUnifiedAddressBook();
				} else if (_method === "DEFAULT") {
					_addr = tizen.contact.getDefaultAddressBook();
				} else if (_method === "SELECTED_ADDRESSBOOKID") {
					_addr = tizen.contact.getAddressBook(_addrBookId);
				} else {
					_error({
						name : "InvalidValuesError"
					});
					return;
				}
				_addr.contacts = [];
				_addr.find(_contactsFound, _error, null);
				_self.data.addressbooks.push(_addr);
			}
		}
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceContact
	 */
	uibinding.dataSourceContact.prototype.update = function () {
		var _self = this;
		_self._update();
		return _self;
	};

	/**
	 * @class uibinding.dataSourceCalendar
	 * @classdesc Data Source Class for a Calendar
	 * @brief Data Source Class for a Calendar
	 * @param {Object} arguments
	 * @param {String} arguments.method
	 *   a. ALL
	 *   b. UNIFIED
	 *   c. DEFAULT
	 *   d. SELECTED_CALENDARID
	 * @param {String} arguments.calendarId
	 *   : calendar id
	 * @param {String} arguments.calendarType
	 *   : the type of a calendar
	 *   a. EVENT
	 *   b.TASK
	 * @public
	 * @alias dataSourceCalendar
	 * @member uibinding.dataSourceCalendar
	 */
	uibinding.dataSourceCalendar = function () {
		if (arguments.length !== 1) {
			return false; 
		}

		var _self = this;
		_self.options = {
				method: "ALL",
				calendarType: "EVENT",
				calendarId: ""				
		};

		var args = Array.prototype.slice.call(arguments, 0);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;
	};

	uibinding.dataSourceCalendar.prototype = new uibinding.dataSource();

	uibinding.dataSourceCalendar.prototype.constructor = uibinding.dataSourceCalendar;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceCalendar
	 */
	uibinding.dataSourceCalendar.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceCalendar
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceCalendar
	 */
	uibinding.dataSourceCalendar.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceCalendar
	 */
	uibinding.dataSourceCalendar.prototype._update = function () {
		var _self = this;
		_self.data = {};
		_self.data.calendars = [];

		var _method = _self.options.method ? _self.options.method : null;
		var _calendarType = _self.options.calendarType ? _self.options.calendarType : null;
		var _calendarId = (_method == "SELECTED_CALENDARID") ? _self.options.calendarId : null;
		var _calendar = null;
		var _calendarItem = null;
		var _filter = null;

		function _error (error) {
			window.console && console.error("Error: " + error.name);
			_self.fireHandler("error");
		}

		function _calendarFound (events) {
			var eventsLength = events.length;
			for (var i = 0; i < eventsLength; i++) {
				var _event = {};
				_event = events[i];

				var event = {};

				for (var item in _event) {
					if (_event[item] instanceof tizen.TZDate == true) {
						var tzdate = _event[item];
						tzdate["date"] = tzdate.getDate();
						tzdate["fullYear"] = tzdate.getFullYear();
						tzdate["month"] = tzdate.getMonth();
						tzdate["day"] = tzdate.getDay();
						tzdate["hours"] = tzdate.getHours();
						tzdate["minutes"] = tzdate.getMinutes();
						tzdate["seconds"] = tzdate.getSeconds();
						tzdate["milliseconds"] = tzdate.getMilliseconds();
						tzdate["timezone"] = tzdate.getTimezone();
						tzdate["dateString"] = tzdate.toDateString();
						tzdate["string"] = tzdate.toString();

						event[item] = tzdate;

					} else {
						event[item] = _event[item];
					}
				}
				_calendar.events.push(event);
			}
		}

		function _calendarsFound (calendars) {
			var calendarLength = calendars.length;
			if (calendarLength > 0) {
				for (var i = 0; i < calendarLength; i++) {
					_calendar = {};
					_calendar = calendars[i];
					_calendar.events = [];

					_calendar.find(_calendarFound, _error, _filter);

					_self.data.calendars.push(_calendar);
				}
				_self.fireHandler("success");
			}
		}

		if (window.tizen && tizen.calendar) {
			if (_method === "ALL") {
				tizen.calendar.getCalendars(_calendarType, _calendarsFound, _error);
			} else {
				if (_method === "UNIFIED") {
					_calendar = tizen.calendar.getUnifiedCalendar(_calendarType);
				} else if (_method === "DEFAULT") {
					_calendar = tizen.calendar.getDefaultCalendar(_calendarType);
				} else if (_method === "SELECTED_CALENDARID") {
					_calendar = tizen.calendar.getCalendar(_calendarType, _calendarId);
				} else {
					_error({
						name : "InvalidValuesError"
					});
					return;
				}
				_calendar.events = [];
				_calendar.find(_calendarFound, _error, null);
				_self.data.calendars.push(_calendar);
				_self.fireHandler("success");
			}
		}
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceCalendar
	 */
	uibinding.dataSourceCalendar.prototype.update = function () {
		var _self = this;
		_self._update();
		return _self;
	};

	/**
	 * @class uibinding.dataSourceCallhistory
	 * @classdesc Data Source Class for a Call History
	 * @brief Data Source Class for a Call History
	 * @param {Object} arguments
	 * @param {String} arguments.type
	 *   a. ALL
	 *   b. TEL
	 *   c. XMPP
	 *   d. SIP
	 * @param {String} arguments.direction
	 *   a. ALL
	 *   b. DIALED
	 *   c. RECEIVED
	 *   d. MISSEDNEW
	 *   e. MISSED
	 *   f. BLOCKED
	 *   g. REJECTED
	 * @public
	 * @alias dataSourceCallhistory
	 * @member uibinding.dataSourceCallhistory
	 */
	uibinding.dataSourceCallhistory = function () {
		if (arguments.length !== 1) {
			return false; 
		}

		var _self = this;
		_self.options = {
				type: "ALL",
				direction: "ALL",
				starttimeorder: "DESC"
		};

		var args = Array.prototype.slice.call(arguments, 0);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;
	};

	uibinding.dataSourceCallhistory.prototype = new uibinding.dataSource();

	uibinding.dataSourceCallhistory.prototype.constructor = uibinding.dataSourceCallhistory;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceCallhistory
	 */
	uibinding.dataSourceCallhistory.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceCallhistory
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceCallhistory
	 */
	uibinding.dataSourceCallhistory.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceCallhistory
	 */
	uibinding.dataSourceCallhistory.prototype._update = function () {
		var _self = this;
		_self.data = {};
		_self.data.callhistory = {};
		_self.data.callhistory.entries = [];

		var _type = _self.options.type ? _self.options.type : null;
		var _direction = _self.options.direction ? _self.options.direction : null;
		var _starttimeorder = _self.options.starttimeorder ? _self.options.starttimeorder : null;

		var _filter = null;
		var _sortMode = null;

		function _error (error) {
			window.console && console.error("Error: " + error.name);
			_self.fireHandler("error");
		}

		function _callhistoryFound (results) {
			_self.data.callhistory.length = results.length;
			_self.data.callhistory.entries = results;
			_self.fireHandler("success");
		}

		if (window.tizen && tizen.callhistory) {
			if (_type !== "ALL") {
				_filter = new tizen.AttributeFilter("type", "EXACTLY", _type);
			}
			_sortMode = new tizen.SortMode("startTime", _starttimeorder);
			tizen.callhistory.find(_callhistoryFound, _error, _filter, _sortMode);
		}
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceCallhistory
	 */
	uibinding.dataSourceCallhistory.prototype.update = function () {
		var _self = this;
		_self._update();
		return _self;
	};

	/**
	 * @class uibinding.dataSourceFile
	 * @classdesc Data Source Class for a File System
	 * @brief Data Source Class for a File System
	 * @param {Object} arguments
	 * @param {String} arguments.path
	 *   : file path
	 * @param {String} arguments.dataType
	 *   a. JSON
	 *   b. XML
	 * @public
	 * @alias dataSourceFile
	 * @member uibinding.dataSourceFile
	 */
	uibinding.dataSourceFile = function () {
		if (arguments.length !== 1) {
			return null; 
		}

		var _self = this;
		_self.options = {
				path: "",
				dataType: "json"
		};

		var args = Array.prototype.slice.call(arguments, 0);
		var new_options = args.shift();
		_self._create(new_options);
		return _self;
	};

	uibinding.dataSourceFile.prototype = new uibinding.dataSource();

	uibinding.dataSourceFile.prototype.constructor = uibinding.dataSourceFile;

	/**
	 * @property {Object} handlers
	 * @brief handlers
	 * @public
	 * @member uibinding.dataSourceFile
	 */
	uibinding.dataSourceFile.prototype.handlers = {};

	/**
	 * @method _create
	 * @brief Init options of dataSourceFile
	 * @param {Object} obj
	 * @private
	 * @member uibinding.dataSourceFile
	 */
	uibinding.dataSourceFile.prototype._create = function (obj) {
		var _self = this;
		if (arguments.length > 0) {
			_self._updateOptions(obj, _self.options);
		}
	};

	/**
	 * @method _update
	 * @brief Update
	 * @private
	 * @member uibinding.dataSourceFile
	 */
	uibinding.dataSourceFile.prototype._update = function () {
		var _self = this;
		$.get(_self.options.path, function (data) {
			_self.data = _self._toJson(data, _self.options.dataType);
			_self.fireHandler("success");
		}).fail(function () {
			_self.fireHandler("error");
		});
	};

	/**
	 * @method update
	 * @brief Update
	 * @public
	 * @member uibinding.dataSourceFile
	 */
	uibinding.dataSourceFile.prototype.update = function () {
		var _self = this;
		_self._update();
		return this;
	};

	/**
	 * @type uibinding
	 * @namespace uibinding
	 * @global
	 */
	window.uibinding = uibinding;

	/**
	 * app
	 */
	_app.prototype.ds = {};
	_app.prototype.dm = {};

})(window, window.document, jQuery);
document.addEventListener("pagebeforechange", function() {
	/**
	 * Button
	 */
	ko.bindingSelector.add(
			"text",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					var child = element.innerHTML;
					var newChild = child.replace(/([A-Z])\w+/g, value);
					element.innerHTML = newChild;
				}
			},
			function( element ) {
				if (element.getAttribute("data-role") === "button") {
					return true;	
				}
				return false;
			}
	);

	/**
	 * Date Time Picker
	 */
	ko.bindingSelector.add(
			"value",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					$(element).datetimepicker("value", value);
				}
			},
			function( element ) {
				if ($(element).attr("type") === "datetime") {
					return true;	
				}
				return false;
			}
	);

	/**
	 * List Divider
	 */
	ko.bindingSelector.add(
			"text",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					$(".ui-btn-text", element).text(value);
				}
			},
			function( element ) {
				if ($(element).parents().andSelf().filter("[data-role='listview']")) {
					if ($(element).data("role") === "list-divider") {
						return true;
					}
				}
				return false;
			}
	);

	/**
	 * List Item
	 */
	ko.bindingSelector.add(
			"text",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					var children = $(element).children();
					$(element).text(value);
					$(element).append(children);
				}
			},
			function( element ) {
				if (element.parentElement.getAttribute("data-role") === "listview") {
					if (element.getAttribute("data-role") !== "list-divider") {
						if (element.tagName === "LI") {
							return true;
						}
					}
				}
				return false;
			}
	);

	/**
	 * Slider
	 */
	ko.bindingHandlers.slider = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var value = ko.utils.unwrapObservable(valueAccessor());
				var sliderWidget = tau.widget.TizenSlider(element);
				sliderWidget.value(value);
				sliderWidget.refresh();
				setTimeout(function () {
					var curSlider = tau.widget.TizenSlider(element);
					var elem = element;

					function setSliderValue(newValue) {
						curSlider.value(newValue);
						curSlider.refresh();
					}

					valueAccessor().subscribe(setSliderValue);
					setSliderValue(tau.widget.TizenSlider(element).value());
					elem.addEventListener("change", function () {
						valueAccessor()(curSlider.value());
					});
				}, 0);
			}
	};

	/**
	 * Submit Button
	 */
	ko.bindingSelector.add(
			"text",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					var parent = $(element).parent();
					var span = $("span > span", parent);

					$(span).text(value);
					$(element).val(value);
				}
			},
			function( element ) {
				if ($(element).attr("type") === "submit") {
					return true;
				}
				return false;
			}
	);

	/**
	 * Token Text Area
	 */
	ko.bindingSelector.add(
			"text",
			{
				"update": function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
					var value = ko.utils.unwrapObservable(valueAccessor() || {});
					$(element).tokentextarea("add", value);
				}
			},
			function( element ) {
				if ($(element).data("role") === "tokentextarea") {
					return true;
				}
				return false;
			}
	);

}, false);
