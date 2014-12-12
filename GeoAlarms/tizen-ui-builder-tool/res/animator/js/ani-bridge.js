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

var animatorModel = "";

var aniPlayIsIDE = true;

var AniBridge = {
	updateCallTime : (new Date()).getTime(),
	initFW : function(model, css) {
		console.log('AniBridge.initFW()');
		this.setAnimationJs(model);
		this.setAnimationCss(css);
		AniPlay.loadPlayModel(animator_cfg);
	},
	/* when edit existing timeline*/
	updateFW : function(aniGroupId, nodeId, animateId, duration, delay, msec){
		console.log('AniBridge.updateFW()');
		var delta = (new Date()).getTime() - this.updateCallTime;
		console.log('delta = '+delta);
		if(delta < 100){
			return;
		}
		this.updateCallTime = (new Date()).getTime();
		AniPlay.updateAnimation(aniGroupId, nodeId, animateId, duration, delay);
		setTimeout(function(aniGroupId, msec){
			AniBridge.setCurrentTime(aniGroupId, msec);
		},50, aniGroupId, msec);
	},
	/* when insert new timeline*/
	updateFWAndDetect : function(aniGroupId, nodeId, animateId, duration, delay, msec){
		console.log('AniBridge.updateFWAndDetect()');
		AniPlay.updateAnimation(aniGroupId, nodeId, animateId, duration, delay);
		setTimeout(function(nodeId, animateId, aniGroupId, msec) {
			AniPlay.applyAnimation(nodeId, animateId);
			setTimeout(function(aniGroupId, msec){
				AniBridge.setCurrentTime(aniGroupId, msec);
			}, 50, aniGroupId, msec);
		}, 30, nodeId, animateId, aniGroupId, msec);
	},
	setAnimationCss : function(css) {
		console.log('AniBridge.setAnimationCss()');
		document.getElementById('animationCss').innerHTML = css;
	},
	setAnimationJs : function(model) {
		console.log('AniBridge.setAnimationJs()');
		if (model.indexOf('var ') == 0) {
			model = model.substring(4, model.length);
		}
		eval(model);
	},
	play : function(pageId, animationId, infinite) {
		console.log('AniBridge.play()');
		AniPlay.playAniGroupsById(pageId, animationId, infinite);
	},
	pause : function(pageId) {
		console.log('AniBridge.pause()');
		AniPlay.pausePageById(pageId);
	},
	setCurrentTime : function(animationGroupId, msec) {
		console.log('AniBridge.setCurrentTime()');
		AniPlay.setCurrentTime(msec, animationGroupId);
	},
	getCurrentCss : function(animationGroupId) {
		console.log('AniBridge.getCurrentCss()');
		AniPlay.getCssByGroupId(animationGroupId);
	},
	setVisible : function(id, isVisible) {
		console.log('AniBridge.setVisible()');
		AniPlay.setVisible(id, isVisible);
	}
};
