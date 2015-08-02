ng-inf-scroll
================
A simple Angular directive that triggers a user-specified callback when the user scrolls to the bottom of a overflow:scroll-ed container.

FEATURES
--------
* Simple - Built for a simple purpose. Detects height of container, binds scroll listener, yells back with callback when distance is attained.

INSTALL
--------
Get it via Bower and inject ``detroix.ng-inf-scroll`` into your project's dependencies i.e. ``app.module();``

BASIC USAGE
--------
1. Identify the container that will have its content scrolled. It needs to have overflow:scroll as a CSS attribute
2. Declare the directive ``scroll-to-bottom`` as an attribute of your container's DOM. i.e. ``<div id='thisContainer' scrollToBottom></div>``
  a. Provide the id/class name of your container to ``scroll-to-bottom-container`` e.g. ``scroll-to-bottom-container=" '#thisContainer' "``
  b. Provide the function as a callback to `scroll-to-bottom-callback` e.g. ``scroll-to-bottom-callback="myFunction()"``
  c. Provide a numeric value to `scroll-to-bottom-distance` to define distance from bottom of container before callback is triggered. e.g. e.g. ``scroll-to-bottom-distance="0"``
3. Done

### Simple example

```
<div class="mainPane">
  <div id="collectionList"
         scroll-to-bottom
            scroll-to-bottom-container="'.mainPane'"
            scroll-to-bottom-distance = '100'
            scroll-to-bottom-callback = "loadMoreData()">
  </div>
</div>

```

OPTIONAL USAGE
--------
1. (TODO) Enable $log.debug if nothing is being triggered. For now, uncomment $log.debug(). Future release will include an option.


DEMO
--------
http://www.goshlist.com


OPTIONS
--------
* **Custom ?**
Enable/Disable $log debug. Example:
``<p data-ng-bind="option"></p>``

* **Custom ?**
??????
``<p data-ng-bind="option"></p>``


COMPATIBILITY
--------
Works on modern versions of Chrome. Other browsers have yet to be tested.


TODO's
--------
* Set default of scroll-to-bottom-distance to zero.
* Get parameter to enable watch for change fo view port height. this has to be an option since it may affect performance
* Append Jasmine test specs to module's Gulp
* Perform cross browser test with PhantomJS.