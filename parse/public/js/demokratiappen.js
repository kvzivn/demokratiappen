NOT_LOGGED_IN = 0;
LOGGED_IN = 1;

angular.module('democracy-app', [])

.factory('ParseInitializer', function() {
  Parse.initialize("p7Nu6RZkIlnGUfofyOvms99yDnehPjzHg18OuFra",
                   "A4aLf9YRKErwAeX444zdMTXHE1dUj5AAvBfHDTeL");
})

.factory('LoginService', function($rootScope, ParseInitializer) {
  var obj = {};
  obj.setLoginState = function(newState) {
    obj.state = newState;

    if (newState == LOGGED_IN) {
      obj.username = '';
      obj.password = '';
    }
  };

  if (Parse.User.current()) {
    obj.state = LOGGED_IN;
  } else {
    obj.state = NOT_LOGGED_IN;
  }

  return obj;
})

.controller('MainController', function($scope, LoginService) {
  $scope.loginService = LoginService;
})

.controller('LoginController', function($scope, LoginService) {
  $scope.oldFillerHeight = 0;

  window.onresize = function() {
    // So that fillerHeight() is evaluated.
    $scope.$apply();
  }

  $scope.fillerHeight = function() {
    var newFillerHeight = Math.max(0, ($(window).height() - $('#modallogin').outerHeight(true)) / 2);
    if (Math.abs(newFillerHeight - $scope.oldFillerHeight) > 1) {
      $scope.oldFillerHeight = newFillerHeight;
    }
    
    return {height: $scope.oldFillerHeight + 'px'};
  };

  $scope.loginService = LoginService;
  $scope.login = function() {
    Parse.User.logIn(
      $scope.loginService.username,
      $scope.loginService.password,
      {
        success: function(user) {
          LoginService.setLoginState(LOGGED_IN);
          $scope.$apply();
        },
        error: function(user, error) {
          LoginService.setLoginState(NOT_LOGGED_IN);
          $scope.$apply();
        }
      });
  };
  $scope.signUp = function() {
    Parse.User.signUp(
      $scope.loginService.username,
      $scope.loginService.password,
      { ACL: new Parse.ACL() },
      {
        success: function(user) {
          LoginService.setLoginState(LOGGED_IN);
          $scope.$apply();
        },
        error: function(user, error) {
          LoginService.setLoginState(NOT_LOGGED_IN);
          $scope.$apply();
        }
      });
  };
  $scope.logout = function() {
    Parse.User.logOut();
    LoginService.setLoginState(NOT_LOGGED_IN);
  };
})

.factory('AddPageService', function($rootScope, ParseInitializer) {
  var obj = {}
  obj.url = '';
  obj.messageClass = '';

  return obj;
})

.controller('AddPageController', function($scope, AddPageService) {
  $scope.addPageService = AddPageService;
  $scope.post = function () {
    var Page = Parse.Object.extend("Page");
    var page = new Page();
 
    page.set("url", $scope.addPageService.url);
 
    page.save(null, {
      success: function(page) {
      },
      error: function(page, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
        alert('Failed to create new object, with error code: ' + error.description);
      }
    });
  };

  var query = new Parse.Query("Tag");
  query.find().then(function(tags) {
    $scope.tags = _.map(tags, function(tag) {
      return tag.get("name");
    });
    $scope.$apply();
  });
});

