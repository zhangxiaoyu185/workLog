<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>
<!DOCTYPE html >
<html ng-app="telemedApiApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>workLog-api</title>

		<link rel="stylesheet" media="screen" href="./resources/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" media="screen" href="./resources/site/site.css" />

		<script src="./resources/bootstrap/js/jquery-2.0.3.js"></script>
		<script src="./resources/bootstrap/js/bootstrap.js"></script>

		<script src="./resources/angular/angular.js"></script>
		<script src="./resources/site/site.js"></script>
		<script src="./resources/site/config.js"></script>

		<script src="./resources/site/controller.js"></script>

		<script>
			$(function() {
				telemed.renderapi(config.api);
			});
		</script>

	</head>
	<body >
		<div class="container" id="restapi" ng-controller="RestApiController">
			<div class="row">
				<div class="col-md-3">
					<nav style="position: fixed; top: 5px; width: 250px;">
						<ul class="list-group" style="overflow-x:hidden; overflow-y:auto; height:680px;">
							<li ng-repeat="module in apis" class="list-group-item {{$first?'':'disabled'}}">
								<a href="{{'#'+module.id}}" class="active" ng-click="collapse($event.target)">{{module.module}}</a>
								<ul class="nav">
									<li ng-repeat="api in module.payload">
										<a href="{{'#'+api.id}}" class="active" href="/">{{api.name}}</a>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
				</div>
				<div class="col-md-9">
					<article id="payload"></article>
				</div>
			</div>
		</div>
	</body>
</html>