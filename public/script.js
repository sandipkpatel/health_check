angular.module("App", []).controller("healthController", healthCtrl);
function healthCtrl($scope, $rootScope, $http, $interval) {
  
  const host = location.protocol + "//" + location.hostname + ":3030";
  $scope.whit_ash_furnishings = {
    url: "https://furnishzingrms.com",
    dir: "/root/code/furnishing/target/universal/furnishing-1.0-SNAPSHOT",
    port: "80",
    state: "NONE",
  };

  $scope.development = {
    url: "https://furnishzingrms.com:8082",
    dir:
      "/root/code/testArea/furnishing/target/universal/furnishing-1.0-SNAPSHOT",
    port: "8082",
    state: "NONE",
  };

  $scope.home_furnishing = {
    url: "https://furnishzingrms.com:8083",
    dir:
      "/root/code/franchaise2/furniture/target/universal/furnishing-1.0-SNAPSHOT",
    port: "8083",
    state: "NONE",
  };

  $scope.furniture_on_sunset = {
    url: "https://furnishzingrms.com:8084",
    dir:
      "/root/code/furnitureonsunset/furniture/target/universal/furnishing-1.0-SNAPSHOT",
    port: "8084",
    state: "NONE",
  };

  $interval(function () {
    $http
      .post(
        host + "/check",
        { url: $scope.whit_ash_furnishings.url },
        { ignoreLoadingBar: true }
      )
      .then(function (res) {
        if (res.data.status == "UP") {
          $scope.whit_ash_furnishings.state = "UP";
        } else {
          $scope.whit_ash_furnishings.state = "DOWN";
        }
      });
    $http
      .post(
        host + "/check",
        { url: $scope.development.url },
        { ignoreLoadingBar: true }
      )
      .then(function (res) {
        if (res.data.status == "UP") {
          $scope.development.state = "UP";
        } else {
          $scope.development.state = "DOWN";
        }
      });
    $http
      .post(
        host + "/check",
        { url: $scope.home_furnishing.url },
        { ignoreLoadingBar: true }
      )
      .then(function (res) {
        if (res.data.status == "UP") {
          $scope.home_furnishing.state = "UP";
        } else {
          $scope.home_furnishing.state = "DOWN";
        }
      });
    $http
      .post(
        host + "/check",
        { url: $scope.furniture_on_sunset.url },
        { ignoreLoadingBar: true }
      )
      .then(function (res) {
        if (res.data.status == "UP") {
          $scope.furniture_on_sunset.state = "UP";
        } else {
          $scope.furniture_on_sunset.state = "DOWN";
        }
      });
  }, 5000);

  $scope.server_start = function (franchaise) {
    console.log(franchaise);
    var r = confirm("Are you sure?");
    if (r == true) {
      $http
        .post(
          host + "/action",
          { dir: franchaise.dir, port: franchaise.port, action: "start" },
          { ignoreLoadingBar: true }
        )
        .then(function (res) {});
    }
  };

  $scope.server_stop = function (franchaise) {
    var r = confirm("Are you sure?");
    if (r == true) {
      $http
        .post(
          host + "/action",
          { dir: franchaise.dir, port: franchaise.port, action: "end" },
          { ignoreLoadingBar: true }
        )
        .then(function (res) {});
    }
  };

  $scope.server_restart = function (franchaise) {
    var r = confirm("Are you sure?");
    if (r == true) {
      $http
        .post(
          host + "/action",
          { dir: franchaise.dir, port: franchaise.port, action: "restart" },
          { ignoreLoadingBar: true }
        )
        .then(function (res) {});
    }
  };
}
