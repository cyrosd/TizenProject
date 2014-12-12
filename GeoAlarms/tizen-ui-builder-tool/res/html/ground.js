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

/**
 * @deprecated
 * @method setBasePath
 * @param {String} path
 */
function setBasePath(path) {
	document.querySelector("base").setAttribute("href", "file:///" + path + "/");
}

/**
 * @method setCssStyle
 * @param {String} style
 */
function setCssStyle(style) {
	document.getElementById("page_style").innerHTML = style;
}

/**
 * @method scrollTo
 * @param {String} val
 */
function scrollTo(val) {
	var elem = document.querySelector(".ui-scrollview-view");
	elem.style.webkitTransform = "translateY(" + val + "px)";/* Chrome, Safari, Opera */
	elem.style.msTransform = "translateY(" + val + "px)";/* Code for IE9 */
	elem.style.transform = "translateY(" + val + "px)";

	/**
	 * TODO
	 *
	 * var tscrollview = tau.widget.ScrollHandler(elem);
	 * tscrollview.scrollTo(0, val);
	 */
}


/**
 * @deprecated
 * @method scrollTo
 * @param {String} val
 */
function getScrollPos() {
	/**
	 * TODO
	 *
	 * var page = document.querySelector("[data-role=page]");
	 * var scrollview = page.querySelector("[data-role=content]");
	 * return scrollview.getScrollPosition();
	 */
}

/**
 * Generate the Page HTML
 * @method _genPage
 * @param {String} html
 */
function _genPage(html) {
	if (html) {
		document.body.innerHTML = html;
		tau.engine.run();
	}
}
       
/**
 * @method changeBody
 * @param {String} html
 */
function changeBody(html) {
	document.body.innerHTML = "";
	_genPage(html);

	var page = document.querySelector("[data-role=page]");
	var scrollview = page.querySelector("[data-role=content]");
	var tscrollview = tau.widget.ScrollHandler(scrollview, {
		"handler" : true,
		"scroll" : "y",
		"direction" : "y"
	});

	scrollview.style.overflow = "visible";
}

/**
 * @deprecated
 * @param {String} wid
 * showBorder: (wid:String) -> ()
 */
function showBorder(wid) {
	var wgt = $("[part-id='" + wid + "']");
	var w = wgt.width(), h = wgt.height();
	wgt.addClass("showborder").width(w - 2).height(h - 2);
}

/**
 * @method getClientBound
 * @return {String} stringified WidgetPosition
 */
function getClientBound() {
	var wgt = document.querySelector(".ui-scrollview-view"),
		offset = _getElementOffset(wgt),
		position = _getElementPosition(wgt),
		content_height = wgt.offsetHeight,
		style = window.getComputedStyle(wgt, null);

	if (wgt.children.length > 0) {
		var tempstyle1 = window.getComputedStyle(wgt.firstChild, null);
		content_height += parseInt(tempstyle1.marginTop||0);
		var tempstyle2 = window.getComputedStyle(wgt.lastChild, null);
		content_height += parseInt(tempstyle2.marginBottom||0);
	}

	var bound = {
		x : offset.left,
		y : offset.top,
		w : wgt.offsetWidth||1,
		h : parseInt(content_height)||1,
		l : parseFloat(style.marginLeft||0),
		r : parseFloat(style.marginRight||0),
		t : parseFloat(style.marginTop||0),
		b : parseFloat(style.marginBottom||0),
		left : parseInt(position.left) || 0,
		top : parseInt(position.top) || 0,
		width : parseInt(style.width) || 0,
		height : parseInt(style.height) || 0,
	};
	return JSON.stringify(bound);
}

/**
 * @method getWindowBound
 * @return {String} stringified WidgetPosition
 */
function getWindowBound() {
	var wgt = document.querySelector(".ui-scrollview-clip");
	var loc = _getElementOffset(wgt);
	var pos = _getElementPosition(wgt);
	var style = window.getComputedStyle(wgt, null);

	var head_height =  document.contains(document.querySelector("[data-role=header]")) ? document.querySelector("[data-role=header]").offsetHeight : 0;
	var footer_height = document.contains(document.querySelector("[data-role=footer]")) ? document.querySelector("[data-role=footer]").offsetHeight : 0;
	var content_height = document.documentElement.clientHeight - head_height - footer_height;

	var bound = {
		x : loc.left,
		y : loc.top,
		w : wgt.offsetWidth||1,
		h : parseInt(content_height || 1),
		l : parseFloat(style.marginLeft||0),
		r : parseFloat(style.marginRight||0),
		t : parseFloat(style.marginTop||0),
		b : parseFloat(style.marginBottom||0),
		left : pos.left,
		top : pos.top,
		width : parseFloat(style.width||0),
		height : parseFloat(style.height||0)
	};
	return JSON.stringify(bound);
}

/**
 * @method _getElementOffset
 * @param {Element} elem
 * @return {Object}
 */
function _getElementOffset(elem) {
	var offset = {
		top : 0,
		left : 0
	};

	if (!document.documentElement.contains(elem)) {
		return offset;
	}

	offset = elem.getBoundingClientRect();

	return {
		top: offset.top += (window.pageYOffset||0) - (document.documentElement.clientTop||0),
		left: offset.left += (window.pageXOffset||0) - (document.documentElement.clientLeft||0)
	}
}
/**
 * @method _getElementPosition
 * @param {Element} element
 * @return {Object}
 */
function _getElementPosition(elem) {
	if (!elem) {
		return;
	}
	var parent;
	var offset = {
		    top : 0,
		    left : 0
	    };
	var parentOffset = {
		    top : 0,
		    left : 0
	    };
	var style = window.getComputedStyle(elem, null);

	if (style && style.position === "fixed") {
		offset = elem.getBoundingClientRect();
	} else {
		offset = _getElementOffset(elem);
		parent = elem.offsetParent;

		if (parent) {
			if (parent.nodeName && parent.nodeName.toLowerCase() !== "html") {
				parentOffset = _getElementOffset(parent);
			}

			var pstyle = window.getComputedStyle(parent, null);
			var pborderTopWidth = parseFloat(pstyle.borderTopWidth);
			var pborderLeftWidth = parseFloat(pstyle.borderLeftWidth);

			parentOffset.top += pborderTopWidth || 0;
			parentOffset.left += pborderLeftWidth || 0;
		}
	}

	return {
		top: offset.top -= parentOffset.top + parseFloat(style.marginTop||0),
		left: offset.left -= parentOffset.left + parseFloat(style.marginLeft||0)
	}
}

/**
 * @method getPageBound
 * @return {Object}
 */
function getPageBound() {
	var wgt = document.querySelector(".ui-scrollview-clip"),
	    loc = _getElementOffset(wgt),
	    pos = _getElementPosition(wgt),
	    style = window.getComputedStyle(wgt, null);
	var bound = {
		x : 0,
		y : 0,
		w : window.document.documentElement.clientWidth||1,
		h : window.document.documentElement.clientHeight||1,
		l : parseFloat(style.marginLeft||0),
		r : parseFloat(style.marginRight||0),
		t : parseFloat(style.marginTop||0),
		b : parseFloat(style.marginBottom||0),
		left : parseFloat(pos.left),
		top : parseFloat(pos.top),
		width : parseFloat(style.width||0),
		height : parseFloat(style.height||0),
	};

	return bound;
}

/**
 * @method getOneWidgetBound
 * @param {Element} wgt
 * @return {Object}
 */
function getOneWidgetBound(wgt) {
	var loc = _getElementOffset(wgt);
	var pos = _getElementPosition(wgt);
	var style = window.getComputedStyle(wgt, null);
	var origin = style.webkitTransformOrigin.split(" ");
	var bound = {
		x : loc.left,
		y : loc.top,
		w : wgt.offsetWidth||1,
		h : wgt.offsetHeight||1,
		l : parseFloat(style.marginLeft||0),
		r : parseFloat(style.marginRight||0),
		t : parseFloat(style.marginTop||0),
		b : parseFloat(style.marginBottom||0),
		left : pos.left,
		top : pos.top,
		width : parseFloat(style.width||0),
		height : parseFloat(style.height||0),
		transform : style.webkitTransform,
		transformOriginX : parseFloat(origin[0]),
		transformOriginY : parseFloat(origin[1]),
		contentWidth : wgt.clientWidth,
		contentHeight : wgt.clientHeight
	};
	return bound;
}

/**
 * @method getContentBound
 * @return {Object}
 */
function getContentBound() {
	var bound = getOneWidgetBound(document.querySelector(".ui-scrollview-clip"));
	var head_height =  document.contains(document.querySelector("[data-role=header]")) ? document.querySelector("[data-role=header]").offsetHeight : 0;
	var footer_height = document.contains(document.querySelector("[data-role=footer]")) ? document.querySelector("[data-role=footer]").offsetHeight : 0;
	var content_height = document.documentElement.clientHeight - head_height - footer_height;
	bound.h = content_height;
	return bound;
}

/**
 * @param wgt
 * @return {Object}
 */
function getWidgetRecursiveBound(wgt) {
	var children = wgt.children;
	var bound = getOneWidgetBound(wgt);
	var style = window.getComputedStyle(wgt, null);
	if (style.overflow != "hidden") {
		for ( var i = 0; i < children.length; i++) {
			var ch = children[i];
			var cstyle = window.getComputedStyle(ch, null);
			if (cstyle.visibility === "visible") {
				var cbound = getWidgetRecursiveBound(ch);

				if (cbound != null) {
					if (cbound.x < bound.x) {
						bound.w += (bound.x - cbound.x);
						bound.x = cbound.x;
					}
					if (cbound.y < bound.y) {
						bound.h += (bound.y - cbound.y);
						bound.y = cbound.y;
					}
					if ((cbound.x + cbound.w) > (bound.x + bound.w)) {
						bound.w += (cbound.x + cbound.w) - (bound.x + bound.w);
					}
					if ((cbound.y + cbound.h) > (bound.y + bound.h)) {
						bound.h += (cbound.y + cbound.h) - (bound.y + bound.h);
					}
				}
			}
		}
	}
	return bound;
}

/**
 * TODO
 * @param wgt
 * @param prev_wgt_style
 * @return {Object}
 */
function getWidgetBoundIncludeAbove(wgt, prev_wgt_style) {
	var bound = getOneWidgetBound(wgt);
	var ch = wgt.prev();
	if (ch != null) {
		if (prev_wgt_style != null && ch.is(prev_wgt_style)) {
			var cbound = getOneWidgetBound(ch);
			if (cbound != null) {
				if (cbound.x < bound.x) {
					bound.w += (bound.x - cbound.x);
					bound.x = cbound.x;
				}
				if (cbound.y < bound.y) {
					bound.h += (bound.y - cbound.y);
					bound.y = cbound.y;
				}
			}
		}
	}
	return bound;
}


/**
  *  자기 자식의 bound를 모두 포함하고, 크기가 최소 1px * 1px 이상이 되도록 반환
 * @method getWidgetBound
 * @param {Element} wgt
 * @return {x:number, y:number, w:number, h:number, l:h:number, r:h:number, t:number, b:number}
 */
function getWidgetBound(wgt) {
	var role = wgt.getAttribute("data-role");
	if (role === "page") {
		return getPageBound();
	} else if (role === "content") {
		return getContentBound();
	} else if (role === "colorpicker") {
		return getWidgetRecursiveBound(wgt);
	} else if (role === "list") {
		return getWidgetBoundIncludeAbove(wgt, "form[role=search]:visible");
	} else {
		var positionSelector = wgt.getAttribute("position-selector");
		var selectedWgt = wgt.querySelector(positionSelector);
		
		if (selectedWgt !== null && selectedWgt !== undefined) {
			return getWidgetRecursiveBound(selectedWgt)
		}
		
		return getWidgetRecursiveBound(wgt);
	}
}

/**
 * @deprecated
 * getWidgetPosition: (wid:String) -> stringified WidgetPosition
 */
function getWidgetPosition(wid) {
	console.log(">>> G : getWidgetPosition()");
	var wgt = $("[part-id='" + wid + "']");
	if (wgt !== null && wgt !== undefined && wgt.length > 0) {
		if (wgt.attr("cg-bound") !== undefined) {
			return wgt.attr("cg-bound");
		}
		return JSON.stringify(getWidgetBound(wgt));
	}
	return null;
}
/**
 * @method getAllWidgetPositions
 * @return stringified [{wid:String, rectangle:WidgetPosition}]
 */
function getAllWidgetPositions() {
	var result = [],
	    widgets = document.querySelectorAll("[part-id]");

	for (var i = 0; i < widgets.length; i++) {
		elem = widgets[i];
		if (elem.hasAttribute("cg-excluded")) {
			result.push({
				wid : elem.getAttribute("part-id"),
				rectangle : JSON.parse(elem.getAttribute("cg-bound"))
			});
		} else {
			result.push({
				wid : elem.getAttribute("part-id"),
				rectangle : getWidgetBound(elem)
			});
		}
	}

	var h = document.querySelector("[data-role=header]:not([part-id])");
	if (h) {
		result.push({
			wid : ":header",
			rectangle : getWidgetBound(h)
		});
	}

	var f = document.querySelector("[data-role=footer]:not([part-id])");
	if (f) {
		result.push({
			wid : ":footer",
			rectangle : getWidgetBound(f)
		});
	}
	return JSON.stringify(result);
}

/**
 * @deprecated
 * @param wids
 * @return
 * // getWidgetPositions: (wid:[String]) -> stringified [{wid:String,
 * // rectangle:WidgetPosition}]
 */
function getWidgetPositions(wids) {
	console.log(">>> G : getWidgetPositions()");
	var result = [];

	for ( var i = 0; i < wids.length; i++) {
		result.push({
			wid : wids[i],
			rectangle : getWidgetBound($("[part-id='" + wids[i] + "']"))
		});
	}
	return JSON.stringify(result);
}

/**
 * @deprecated
 * @param dom
 * @return
 * // widgetId: (dom:jQuery) -> (wid:String)
 */
function widgetId(dom) {
	console.log(">>> G : widgetId()");
	if (dom.length === 0) {
		return null;
	}
	if (dom.attr("part-id") !== undefined) {
		return dom.attr("part-id");
	} else {
		return widgetId(dom.parent());
	}
}


/**
 * @deprecated
 * // includeAllWidgets: () -> ()
 */
function includeAllWidgets() {
	console.log(">>> G : includeAllWidgets()");
	$("[cg-excluded]").each(function(index, elem) {
		$(elem).css("opacity", "1.0");
	});
	$("[cg-excluded]").removeAttr("cg-excluded").removeAttr("cg-bound");
}

/**
 * @deprecated
 * @param {Array} (wids:[String])
 */
function excludeWidgets(wids) {
	console.log(">>> G : excludeWidgets()");
	var i, widget;
	for (i = 0; i < wids.length; i++) {
		widget = $("[part-id='" + wids[i] + "']");
		widget.attr("cg-bound", getWidgetPosition(wids[i]));
	}
	for (i = 0; i < wids.length; i++) {
		widget = $("[part-id='" + wids[i] + "']");

		widget.attr("cg-excluded", "true");
		widget.css("opacity", "0.2");
	}
}

/**
 * @param {String} id
 * @return {Element}
 */
function getElementDom(id) {
	return document.getElementById(id).outerHTML;
}

/**
 * @method createSelectionElement
 */
function createSelectionElement() {
	var selection = document.createElement("span");
	document.body.appendChild(selection);

	selection.setAttribute("id", "selectorSpan");
	selection.style.position = "absolute";
	selection.style.opacity = "0.5";
	selection.style.backgroundColor = "red";
	selection.style.zIndex = "10000";
}

/**
 * @method removeSelectionElement
 */
function removeSelectionElement() {
	var selection = document.getElementById("selectorSpan");
	document.body.removeChild(selection);
}

/**
 * @method getSelectedElementRect
 * @param {String} id
 * @param {Array} tags
 * @param {Array} indexes
 * @return
 */
function getSelectedElementRect(id, tags, indexes) {
	var selectorSpan = document.getElementById("selectorSpan");
	var rect = {
		top : 0,
		left : 0,
		width : 0,
		height : 0
	}

	selectorSpan.style.top = "0px";
	selectorSpan.style.left = "0px";
	selectorSpan.style.width = "0px";
	selectorSpan.style.height = "0px";

	var resultElement = document.getElementById(id);
	var selected = resultElement;
	if (tags.length > 0 && indexes.length > 0 && tags.length == indexes.length) {
		for (i = 0; i < tags.length; i++) {
			var tag = selected.children;
			selected = tag[indexes[i]];
		}
	}
	var rects = selected.getClientRects();

	if (rects.length > 0) {
		var clientRect = rects.item(0);
		rect.top = clientRect.top;
		rect.left = clientRect.left;
		rect.width = clientRect.width;
		rect.height = clientRect.height;
	}

	var selectorSpan = document.getElementById("selectorSpan");
	selectorSpan.style.top = rect.top + "px";
	selectorSpan.style.left = rect.left + "px";
	selectorSpan.style.width = rect.width + "px";
	selectorSpan.style.height = rect.height + "px";

	return JSON.stringify(rect);
}

/**
 * @method modifyStyle
 * @param {String} style
 */
function modifyStyle(style) {
	document.getElementById('modified_style').innerHTML = style;
}
