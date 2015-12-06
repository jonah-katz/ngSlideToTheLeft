/*global angular*/
(function(angular) {
	'use strict';

	angular.module('JonahKatz')
	.controller('TeamsController', ['SlideToTheLeftRemote',teamsController]);


	function teamsController(SlideToTheLeftRemote) {
		var TeamsCtrlVM = this;

		TeamsCtrlVM.closePanel = SlideToTheLeftRemote.closePanel;

		// get data
		TeamsCtrlVM.teams = SlideToTheLeftRemote.getCarePackage();
		console.log("HM",TeamsCtrlVM.teams)
	}

}(angular));
