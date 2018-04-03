var telemedApiApp = angular.module('telemedApiApp', []);

telemedApiApp.controller('RestApiController', function($scope) {
	//console.log(config);
	$scope.apis = config.api;
	// $scope.$on('$viewContentLoaded', telemed.collapse);

	$scope.collapse = function(target) {
		$('nav .list-group-item').addClass('disabled');
		$(target).parent().removeClass('disabled');
		return false;
	};
});

