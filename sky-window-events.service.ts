/* global angular */
interface skyWindowEvents {
	ready(): ng.IPromise<any>;
	load(): ng.IPromise<any>;
}

(function () {
	'use strict';

	/**
	 * Service: skyWindowEvents 
	 * 
	 * Exposes methods for commonly used window-events. The methods return promises 
	 * that are resolved with the given event. This allows for then'ing on events, even
	 * when they have already happened when subscribing. 
	 * 
	 * Usage: skyWindowEvents.ready().then(function(event) { ... },null);
	 *
	 **/

	angular.module('skyWindowEvents').service('skyWindowEvents', skyWindowEvents);

	skyWindowEvents.$inject = ['$q','$window'];

	function skyWindowEvents($q, $window) {

		var _this = this;

		var windowReady = $q.defer();
		var windowLoad = $q.defer();

		angular.element($window).on('DOMContentLoaded', (event) => windowReady.resolve(event));
		angular.element($window).on('load', (event) => windowLoad.resolve(event));

		_this.ready = function() {
			return windowReady.promise;
		};
		_this.load = function() {
			return windowLoad.promise;
		};

		return _this;
	}

})();
