/**
 * slideToTheleft Directive
 * @description  <
 *                 <slide-to-the-left slide-to="'right'"  panel-class="'blue'">
 *                   <transcluded content/home panel>
 *                 </slide-to-the-left>
 *                 
   */
(function() {
    'use strict';

  angular
    .module('ngSlideToTheleft')
    .directive('slideToTheleft', ['slideTheLeftRemote','$compile','$timeout',SlideToTheLeft]);

  function SlideToTheLeft(slideTheLeftRemote,$compile,$timeout) {
    return {
        restrict: 'E',
        transclude:true,
        scope: false,
        template: '<panels class="clearfix" style="height:100%;display:block;width:{{ content_width_i+1 }}px;">'+
                    '<panel style="width: {{ content_width_i }}px;height:100%;" ng-transclude>'+
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
      ContentSliderRemote.onOpenSlider(_openNewPanel);
      ContentSliderRemote.onCloseSlider(_closePanel);

      /**
       * _openNewPanel - Add a panel to our slider and slide it open
       * @param  {String} src URL of template to load
       */
      function _openNewPanel(src) {
    
        angular.$element("panel").css("height", "1px");
        var panel = angular.element('<panel ng-include="\''+src+'\'"  style="width:'+($scope.content_width_i)+'px;"></panel>');

        angular.$element("panels").css({
          "width": "+="+($scope.content_width_i+1),
          "left": "-="+($scope.content_width_i+1)
        })
        angular.$element("panels").append(panel);
    
        $compile(panel)($scope);

        $(window).trigger('resize');

      }

      function _closePanel() {
        angular.$element("panels").css({
          "left": "+="+($scope.content_width_i+1)
        });

        /* when open, the cover panel has an inline height style. hidden panels shouldn't */
        angular.$element("panel:nth-last-child(2)").css({
          "height": ""
        });

        $timeout(function() {
          angular.$element("panel:last-child").remove();
          angular.$element("panels").css({
            "width": "-="+($scope.content_width_i+1)
          });
        },300)
      }
    }
  }

})();