/**
 * slideToTheleft Directive
 * @description  <
 *                 <slide-to-the-left>
 *                   <transcluded content/home panel>
 *                 </slide-to-the-left>
 *                 
   */
(function() {
    'use strict';

  angular
    .module('ngSlideToTheleft')
    .directive('slideToTheLeft', ['SlideToTheLeftRemote','$compile','$timeout','$window',SlideToTheLeft]);

  function SlideToTheLeft(SlideToTheLeftRemote,$compile,$timeout,$window) {
    return {
        restrict: 'E',
        transclude:true,
        scope: false,
        template: '<panels style="left:0px;"ng-style="{width: content_width_i+\'px\'}" >'+
                    '<panel ng-style="{width: content_width_i+\'px\'}"  ng-transclude>'+
                    '</panel>'+
                  '</panels>',
        controller: ['$scope', '$element', '$attrs',slideToTheLeftDirectiveController]
    } 

    function slideToTheLeftDirectiveController ($scope, $element, $attrs) {
          
      $scope.content_width_i = 0;

      /* $timeout ensures DOM is fully loaded */
      $timeout(function() {
          $scope.content_width_i = $element[0].clientWidth;
      });

      /* triggers */
      SlideToTheLeftRemote.sliderDirectiveOpen(_openNewPanel);
      SlideToTheLeftRemote.sliderDirectiveClose(_closePanel);

      /**
       * _openNewPanel - Add a panel to our slider and slide it open
       * @param  {String} src URL of template to load
       */
      function _openNewPanel(src) {
    

        var panel = angular.element('<panel ng-include="\''+src+'\'"  style="width:'+($scope.content_width_i)+'px;"></panel>');

        angular.element(document).find("panels").css({
          "width": parseInt(angular.element(document).find('panels').css('width').slice(0, - 2)) + $scope.content_width_i + 'px',
          "left": parseInt(angular.element(document).find('panels').css('left').slice(0, - 2))  - $scope.content_width_i + 'px'
        })


        angular.element(document).find("panels").append(panel);

        $compile(panel)($scope)
      }

      function _closePanel() {
        angular.element(document).find("panels").css({
          "left": parseInt(angular.element(document).find('panels').css('left').slice(0, - 2))  + $scope.content_width_i + 'px'
        });

        $timeout(function() {
          var panels  = angular.element(document).find("panel");
         panels[panels.length - 1].remove();
          console.log("HM")
          angular.element(document).find("panels").css({
            "width": parseInt(angular.element(document).find('panels').css('width').slice(0, - 2)) - $scope.content_width_i + 'px'
          });
                    

        },300);
      }
    }
  }

})();