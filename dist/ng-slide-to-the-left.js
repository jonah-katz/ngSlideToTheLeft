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
      var anim_time = 300,
      $panels = getAngularElement("panels");

      $scope.content_width_i = 0;

      /* $timeout ensures DOM is fully loaded */
      $timeout(function() {
          $scope.content_width_i = $element[0].clientWidth;
          $panels = getAngularElement("panels");
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

        // panels container needs to increase in width to hold the new panel and
        // needs to move over to display it. 
        // This triggere animation via CSS
        $panels.css({
          "width": _getCSSWithoutPixels($panels,'width') + $scope.content_width_i + 'px',
          "left": _getCSSWithoutPixels($panels,'left')  - $scope.content_width_i + 'px'
        })

        // not in view panels shouldn't control container height
        // only care about the second to last one any given time
        $timeout(function() {
          var all_panels = getAngularElement("panel");
          // not in view panels shouldn't control container height
          angular.element(getAngularElement("panel")[all_panels.length-2]).css({
            "height": "1px"
          })
        },anim_time)

        // actually add the new panel
        $panels.append(panel);
        $compile(panel)($scope)
      }

      /**
       * _closePanel - Remove visible panel by sliding to the right than removing it from the DOM
       */
      function _closePanel() {

        // move panels over.
        // trigger animation via CSS
        $panels.css({
          "left": _getCSSWithoutPixels($panels,'left')  + $scope.content_width_i + 'px'
        });

        // panel that will in the front needs its original height
        var all_panels = getAngularElement("panel");
        angular.element(getAngularElement("panel")[all_panels.length - 2]).css({height: 'inherit'});

        // when done moving over, remove last panel
        $timeout(function() {
          var panels  = getAngularElement("panel");
         panels[panels.length - 1].remove();
          $panels.css({
            "width": _getCSSWithoutPixels($panels,'width') - $scope.content_width_i + 'px'
          });
                    

        },anim_time);
      }

      // helper for getting a CSS style as a number instead of string (ie 398 vs "398px")
      function _getCSSWithoutPixels(elem,of) {
        return parseInt(elem.css(of).slice(0, - 2));
      }

      function getAngularElement(lookup) {
        return angular.element($element).find(lookup);
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