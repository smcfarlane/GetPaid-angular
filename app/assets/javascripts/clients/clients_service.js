(function(){
  angular.module('getPaid').factory('Clients', ['$resource', '$http', function($resource, $http){

    var clientList = {};

    return {
      resource: $resource('clients/:id.json', null, {
        update: {method: 'PUT'}
      }),
      getAll: $http.get('/clients.json'),
      clientList: clientList,
      refreshClientList: function(){
        getAll
          .success(function(data){
            clientList = data;
            console.log('clientList', clientList);
          })
          .error(function(){
            console.log('failed to get clients')
          });
      }
    };
  }]);
})();