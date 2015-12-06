/*global angular*/
(function(angular) {
	'use strict';

	angular.module('JonahKatz')
	.controller('DivisionsController', ['SlideToTheLeftRemote',divisionsController]);


	function divisionsController(SlideToTheLeftRemote) {
		var DivisionsCtrlVM = this;

		DivisionsCtrlVM.closePanel = SlideToTheLeftRemote.closePanel;
		DivisionsCtrlVM.openDivision = openDivision;

		// get data
		DivisionsCtrlVM.divisions = SlideToTheLeftRemote.getCarePackage();

		function openDivision(division) {
			SlideToTheLeftRemote.openPanel('/demo/templates/teams.html',division.teams);
		}
	}



}(angular));
