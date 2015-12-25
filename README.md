ngSlideToTheLeft
==================
ngSlideToTheLeft is a killer AngularJS module for creating dynamic, and triggerable, sliding panels!

##Requirements


AngularJS v1.3+

##Screen
![ngSlideToTheLeft](http://google.com)

###Browser support


![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
 ✔ | ✔ | IE10 + | ✔ | ✔ |

And mobile!

## Load

To use nfSlideToTheLeft include the (un)minified js and css files.
```html
<!DOCTYPE HTML>
<html>
<head>
  <link href="dist/angular-tooltips.min.css" rel="stylesheet" type="text/css" />
   <link href="dist/ng-slide-to-the-left.min.css" rel="stylesheet" type="text/css" >

</head>
<body ng-app="app">
  //.....
  <script src="dist/ng-slide-to-the-left.min.js"></script>
</body>
</html>
```

##Installation

####Bower

```
$ bower install ngSlideToTheLeft --save
```

_then load the js files in your html_

####Add module dependency

Add the 720kb.tooltips module dependency

```js
angular.module('app', [
  'ngSlideToTheleft'
 ]);
```

Wrap your 'first slide' with the ngSlideToTheLeft directive. Make sure your panel (and all panels) have exactly one root element.

```html

  <div ng-controller="DemoCtrl as demoCtrlVM">
    <slide-to-the-left>
      <div class="panel-content">
        <p ng-click="demoCtrlVM.openPanel(1)">Open panel 1</p>
      </div>
    </slide-to-the-left>
  </div>
  
```

Open any additional slides using the `SlideToTheLeftRemote` service.

```js

	angular.module('app')
	.controller('DemoCtrl', ['SlideToTheLeftRemote',demoCtrl]);
	
	function demoCtrl(SlideToTheLeftRemote) {
	  var demoCtrlVM = this;
	  demo.openPanel = openPanel;
		demoCtrlVM.closePanelFn = SlideToTheLeftRemote.closePanel;

	  
	  function openPanel(panelNumber) {
	    if(panelNumber == 1) {
	      SlideToTheLeftRemote.openPanel('/demo/templates/panels/1.html',{data: 'came from panel 0');
	    }
	  }
	}

```


## Example

  View a live demo by serving the 'example' directory:
  
  1. clone repo
  2. npm install
  3. grunt develop
  4. open http://localhost:8100 

##Theming
ngSlideToTheLeft comes with minimal styling (really, nothing at all). The tranisition speed is .3 seconds by default, which you can change by overriding the style on panels.

```css
  body slide-to-the-left  panels {
  	-webkit-transition: left .3s ease;
  	-moz-transition: left .3s ease;
  	-ms-transition: left .3s ease;
  	-o-transition: left .3s ease;
  	transition: left .3s ease;
  }
  
```

##Contributing

Contribution welcome. Just fork, work and open a PR.
  
  #### To do
    
    1. directive parameters
      * slide speed
      * slide direction
    2. event broadcasts/callbacks
      * opened
      * closed
      * opening
      * closing
      * will open
      * will close



## License

The MIT License (MIT)

Copyright (c) 2015 Jonah Katz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
