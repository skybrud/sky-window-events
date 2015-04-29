/* global angular */
interface skyWindowEvents {
	ready(): ng.IPromise<Event>;
	load(): ng.IPromise<Event>;
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

	function skyWindowEvents($q:ng.IQService, $window:ng.IWindowService) {

		var _this = this;

		var windowReady = $q.defer();
		var windowLoad = $q.defer();

		angular.element($window).on('DOMContentLoaded', (event) => windowReady.resolve(event));
		angular.element($window).on('load', (event) => windowLoad.resolve(event));

		_this.ready = () => windowReady.promise;
		_this.load = () => windowLoad.promise;

		return _this;
	}

})();