(function(){
  angular.module('getPaid')

    .controller('ClientsCtrl', ['Clients', function(Clients){
      var vm = this;
      vm.clientList = Clients.resource.get();
      console.log(vm.clientList);
    }])

    .controller('ClientCtrl', ['$state', 'Clients', '$stateParams', function($state, Clients, $stateParams){
      var vm = this;

      vm.client = Clients.resource.get({id: $stateParams['clientId']});
      console.log(vm.client);
    }])

    .controller('EditClientCtrl', ['$state', '$stateParams', 'Clients', function($state, $stateParams, Clients) {
      var vm = this;
      vm.clientForm = {};
      vm.clientFormTitle = 'Edit';
      vm.clientForm = Clients.resource.get({id: $stateParams['clientId']});
      console.log('client', vm.client, 'clientForm', vm.clientForm);
      vm.clientFormSubmit = function(){
        console.log(vm.clientForm);
        Clients.resource.update({id: vm.clientForm.organization.id}, vm.clientForm, function(){
          $state.go('a.clients.show', {clientId: vm.clientForm.organization.id});
        });
      };
    }])

    .controller('NewClientCtrl', ['$state', '$stateParams', 'Clients', function($state, $stateParams, Clients) {
      var vm = this;
      vm.clientFormTitle = 'Edit';
      vm.clientForm = new Clients.resource;
      console.log('clientForm', vm.clientForm);
      vm.clientFormSubmit = function(){
        console.log(vm.clientForm);
        vm.clientForm.$save(function(data){
          console.log(data);
          $state.go('a.clients.show', {clientId: data.organization.id});
        });
      };
    }]);

})();