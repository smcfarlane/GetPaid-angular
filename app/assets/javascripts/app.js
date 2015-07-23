(function(){
  angular.module('getPaid', ['templates', 'ui.router', 'ipCookie', 'ng-token-auth', 'ngResource', 'ngAnimate', 'ngMaterial'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('teal',{
          'default': '400', // by default use shade 400 from the teal palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
      .accentPalette('deep-purple', {
          'default': '200' // use shade 200 for default, and keep all other shades the same
        })
      .warnPalette('red')
      .backgroundPalette('grey');
  })
  .config(function($mdIconProvider) {
    $mdIconProvider.fontSet('fa', 'fontawesome');
  })
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:3000',
      tokenValidationPath: '/auth/validate_token',
      signOutUrl: '/auth/sign_out',
      confirmationSuccessUrl: window.location.href,
      emailSignInPath: '/auth/sign_in',
      storage: 'localStorage',
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type": "Bearer",
        "client": "{{ clientId }}",
        "expiry": "{{ expiry }}",
        "uid": "{{ uid }}"
      }
    });
  })
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
    console.log($httpProvider.interceptors);
  }])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('guest',{
        templateUrl: "guest/guest.html",
        controller: function() {
          console.log('home route');
        }
      })
      .state('guest.home', {
        url: "/",
        templateUrl: "guest/home.html",
        controller: function() {
          console.log('home route');
        }
      })
      .state('guest.about', {
        url: "/about",
        templateUrl: "guest/about.html",
        controller: function() {
          console.log('about route');
        }
      })
      .state('guest.features', {
        url: "/features",
        templateUrl: "guest/features.html",
        controller: function() {
          console.log('features route');
        }
      })

      .state('auth', {
        url: '/auth',
        templateUrl: 'auth/auth.html'
      })
      .state('auth.sign_up', {
        url: '/sign_up',
        templateUrl: 'auth/sign_up.html',
        controller: 'SignUpCtrl as vm'
      })
      .state('auth.sign_in', {
        url: '/sign_in',
        templateUrl: 'auth/sign_in.html',
        controller: 'SignInCtrl as vm'
      })

      .state('a', {
        url: '/a',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function ($auth) {
            return $auth.validateUser();
          }
        }
      })

      .state('a.dashboard',{
        url: '/dashboard',
        templateUrl: 'dashboard/index.html',
        controller: 'DashboardCtrl as vm'
      })

      .state('a.user', {
        url: '/user',
        templateUrl: 'user/user.html',
        controller: 'UserCtrl as vm'
      })
      .state('a.user.new', {
        url: '/new',
        templateUrl: 'user/new.html'
      })
      .state('a.user.yourOrg', {
        url: 'your_org',
        templateUrl: 'user/your_org.html'
      })

      .state('a.clients', {
        url: '/clients',
        templateUrl: 'clients/clients.html',
        controller: 'ClientsCtrl as vm'
      })
      .state('a.clients.index', {
        url: '/index',
        templateUrl: 'clients/index.html',
        resolve: {
          list: ['Clients', function(Clients) { console.log('resolved!!'); return Clients.resource.get();}]
        },
        controller: 'ClientsCtrl',
        controllerAs: 'vm'
      })
      .state('a.clients.show', {
        url: '/:clientId/projects',
        templateUrl: 'clients/show.html',
        controller: 'ClientCtrl as vm'
      })
      .state('a.clients.new', {
        url: '/new',
        templateUrl: 'clients/form.html',
        controller: 'NewClientCtrl as vm'
      })
      .state('a.clients.edit', {
        url: '/:clientId/edit',
        templateUrl: 'clients/form.html',
        controller: 'EditClientCtrl as vm'
      })
    });
})();
