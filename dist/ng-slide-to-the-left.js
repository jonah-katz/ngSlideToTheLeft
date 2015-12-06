/**
 * @description  <
 *
 * 				Use SlideToTheLeftRemote to control
 * 					
*               <slide-to-the-left slide-to="'right'"  panel-class="'blue'">
*                 <transcluded content/home panel>
*               </slide-to-the-left>
 *                 
 */
(function() {
    'use strict';

angular.module('ngSlideToTheleft', [])

})();
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

        // not in view panels shouldn't control container height
        angular.element(document).find("panel").css({
          "height": "1px"
        })

        angular.element(document).find("panels").append(panel);

        $compile(panel)($scope)
      }

      function _closePanel() {
        angular.element(document).find("panels").css({
          "left": parseInt(angular.element(document).find('panels').css('left').slice(0, - 2))  + $scope.content_width_i + 'px'
        });

        // panel that will in the front needs its original height
        var all_panels = angular.element(document).find("panel");
        angular.element(angular.element(document).find("panel")[all_panels.length - 2]).css({height: 'inherit'});

        $timeout(function() {
          var panels  = angular.element(document).find("panel");
         panels[panels.length - 1].remove();
          angular.element(document).find("panels").css({
            "width": parseInt(angular.element(document).find('panels').css('width').slice(0, - 2)) - $scope.content_width_i + 'px'
          });
                    

        },300);
      }
    }
  }

})();
/**
 * slideToTheleft Directive
 * @description  <
 *                 <slide-to-the-left slide-to="'right'"  panel-class="'blue'"><transcluded content/home panel></slide-to-the-left>
 */

(function() {

  angular
    .module('ngSlideToTheleft')
    .service('SlideToTheLeftRemote',[SlideToTheLeftRemote]);

  function SlideToTheLeftRemote() {

    var self = this;
    
    // talk to directive
    // these functions are used by the directive only
    this.sliderDirectiveOpen = sliderDirectiveOpen;
    this.sliderDirectiveClose = sliderDirectiveClose;

    // open/close remote
    this.openPanel = openPanel;
    this.closePanel = closePanel;

    // recieve data to be passed to controller
    this.getCarePackage = getCarePackage;


    var sliderOpener = false, sliderCloser = false, dataCarePackage = {};
    function sliderDirectiveOpen(cb) {
      sliderOpener = cb;
    }

    function sliderDirectiveClose(cb) {
      sliderCloser = cb;
    }

    function openPanel(templateSource, data) {
      if(!sliderOpener) { return; }
      dataCarePackage = data;
      sliderOpener(templateSource);
    }

    function closePanel() {
      sliderCloser();
    }

    function getCarePackage() {
      return dataCarePackage;
    }

    return self;

  }
})();