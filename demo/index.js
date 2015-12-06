/*global angular*/
(function(angular) {
	'use strict';

	angular.module('JonahKatz', ['ngSlideToTheleft'])
	.controller('DemoCtrl', ['SlideToTheLeftRemote',demoCtrl]);


	function demoCtrl(SlideToTheLeftRemote) {
		var demoCtrlVm = this;

		_genData();

		demoCtrlVm.openSport = openSport;


		function _genData() {
			demoCtrlVm.sports = [
				{
					name: 'Football - NFL',
					divisions: [
						{
							name: 'AFC East',
							teams: [
								'Dolphins',
								'Patriots',
								'Jets',
								'Bills'
							]
						},
						{
							name: 'AFC North',
							teams: [
								'Bengals',
								'Steelers',
								'Ravens',
								'Browns'
							]
						},
						{
							name: 'AFC West',
							teams: [
								'Broncos',
								'Chiefs',
								'Raiders',
								'Chargers'
							]
						}
					]
				},
				{
					name: 'Basketball - NBA',
					divisions: [
						{
							name: 'Southeast Division',
							teams: [
								'Heat',
								'Hornets',
								'Magic',
								'Wizards',
								'Hawks'
							]
						},
					]
				},
				{
					name: 'Baseball - MLB',
					divisions: [
						{
							name: 'NL East',
							teams: [
								'Marlins',
								'Braves',
								'Phillies',
								'Mets',
								'Nationals'
							]
						},
					]


				}

			];
		}

		function openSport(sport) {
			SlideToTheLeftRemote.openPanel('/demo/templates/divisions.html',sport.divisions);
		}
	}

}(angular));