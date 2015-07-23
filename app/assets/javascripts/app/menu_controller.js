(function(){
  angular.module('getPaid').controller('MenuCtrl', ['$auth', '$rootScope', '$state', 'User', function($auth, $rootScope, $state, User){
    var vm = this;
    vm.checkAuthStatus = function(){
      console.log('The user is?', $auth.validateUser());
    };
    vm.menuItems = {
      guest: [
              [
                ['Home', 'guest.home'],
                ['About', 'guest.about'],
                ['Features', 'guest.features']
              ],
              [
                ['Sign In', 'auth.sign_in'],
                ['Sign Up', 'auth.sign_up']
              ]
             ],
      login: [
               [
                 ['Dashboard', 'a.dashboard'],
                 ['Clients', 'a.clients.index'],
                 ['Vendors', 'a.vendors.index'],
                 ['Projects', 'projects.index'],
                 ['Invoices', 'invoices.index']
               ],
               [
                 ['Manage User', 'users.index'],
                 ['Reports', 'reports.index']
               ]
             ]
    };

    vm.showSignOut = false;

    vm.menu = vm.menuItems.guest;

    vm.signOut = function(){
      $auth.signOut()
        .then(function(resp){
          console.log('Sign Out Successful', resp);
          vm.showSignOut = false;
          vm.menu = vm.menuItems.guest;
          $state.go('guest.home');
        })
        .catch(function(resp){
          console.log('Sign Out Failed', resp);
        });
    };

    $rootScope.$on('auth_fail', function(){
      vm.menu = vm.menuItems.guest;
    });

    $rootScope.$on('auth:validation-success', function(e, user){
      console.log('auth:validation-success event');
      vm.menu = vm.menuItems.login;
      vm.showSignOut = true;
      User.currentAccount = user;
    });

    $rootScope.$on('auth:login-success', function(e, user){
      console.log('auth:login-success event');
      vm.menu = vm.menuItems.login;
      vm.showSignOut = true;
      User.currentAccount = user;
    });
  }]);
})();