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
    
    this.sliderDirectiveOpen = sliderDirectiveOpen;
    this.onCloseSlider = onCloseSlider;
    this.openPanel = openPanel;
    this.closePanel = closePanel;
    this.getCarePackage = getCarePackage;


    var sliderOpener = false, sliderCloser = false, dataCarePackage = {};
    function sliderDirectiveOpen(cb) {
      sliderOpener = cb;
    }

    function onCloseSlider(cb) {
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