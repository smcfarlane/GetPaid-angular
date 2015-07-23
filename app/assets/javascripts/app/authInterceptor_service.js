(function() {
  angular.module('getPaid').factory('authInterceptor', ['$q', '$location', '$rootScope', '$window', function ($q, $location, $rootScope, $window) {
    return {
      request: function (config) {
        var authVars = JSON.parse($window.localStorage.getItem('auth_headers'));
        config.headers = config.headers || {};
        if (authVars) {
          config.headers['access-token'] = authVars['access-token'];
          config.headers['client'] = authVars['client'];
          config.headers['expiry'] = authVars['expiry'];
          config.headers['uid'] = authVars['uid'];
        }
        return config;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('auth_fail');
          $location.path('/auth/sing_in');
          $window.localStorage.removeItem('auth_headers');

        }
        return $q.reject(response);
      }
    };
  }]);
})();