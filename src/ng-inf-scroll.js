/**
 *    Angular directive to trigger callback when scrolled to bottom of overflow-scrolled container
 *
 *    @param bind (angular bound value to append) REQUIRED
 *    @param ellipsisAppend (string) string to append at end of truncated text after ellipsis, can be HTML OPTIONAL
 *    @param ellipsisSymbol (string) string to use as ellipsis, replaces default '...' OPTIONAL
 *    @param ellipsisAppendClick (function) function to call if ellipsisAppend is clicked (ellipsisAppend must be clicked) OPTIONAL
 *
 *    @example <p data-ellipsis data-ng-bind="boundData"></p>
 *    @example <p data-ellipsis data-ng-bind="boundData" data-ellipsis-symbol="---"></p>
 *    @example <p data-ellipsis data-ng-bind="boundData" data-ellipsis-append="read more"></p>
 *    @example <p data-ellipsis data-ng-bind="boundData" data-ellipsis-append="read more" data-ellipsis-append-click="displayFull()"></p>
 *
 */
angular.module('detroix.ng-inf-scroll', [])

    .directive('scrollToBottom',
    ['$timeout', '$window', '$log', '$q',
        function ($timeout, $window, $log, $q) {
            return {
                restrict: 'A',
                scope: {
                    scrollToBottomContainer: '=',
                    scrollToBottomDistance: '=',
                    scrollToBottomCallback: '&'
                },
                replace: true,

                link: function (scope, element, attr, ctrl) {

                    //$log.debug('elem scrolling is ', element);

                    //TODO: get parameter to enable watch for change fo view port height. affects performance
                    var height = $window.innerHeight;
                    //$log.debug('viewport height is ', height);

                    var scrollContainer = angular.element(scope.scrollToBottomContainer)
                    var distanceLeft;
                    var enableCallsOnReach = true;

                    scrollContainer.on('scroll', function () {
                        //$log.debug('the distance is ', scope.scrollToBottomDistance);
                        $timeout(function () {
                                //$log.debug('scrolled to ', scrollContainer.scrollTop());
                                //$log.debug('scroll height ', scrollContainer[0].scrollHeight);

                                distanceLeft = scrollContainer[0].scrollHeight
                                - scope.scrollToBottomDistance
                                - scrollContainer.scrollTop()
                                - height;

                                //$log.debug('distance left ', distanceLeft);

                                if (distanceLeft <= 0 && enableCallsOnReach && scope.scrollToBottomCallback) {
                                    enableCallsOnReach = false;

                                    $q.when(scope.scrollToBottomCallback()).then(
                                        function () {
                                            $log.debug('external call is success');
                                            enableCallsOnReach = true;
                                        },
                                        function () {
                                            $log.debug('external call has failed');
                                            enableCallsOnReach = true;
                                        }
                                    )
                                }
                            }
                        )

                    })

                    /*
                     var $win = angular.element($window);
                     $win.bind('resize', onResize);

                     //TODO: Clean up after ourselves

                     scope.$on('$destroy', function() {
                     $win.unbind('resize', onResize);
                     });
                     */

                }
            }
        }]);