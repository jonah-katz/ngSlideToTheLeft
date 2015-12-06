/*global angular*/
(function(angular) {
	'use strict';

	angular.module('JonahKatz', ['ngSlideToTheleft'])
	.controller('DemoCtrl', ['SlideToTheLeftRemote',demoCtrl]);


	function demoCtrl(SlideToTheLeftRemote) {
		var demoCtrlVm = this;
	}

}(angular));