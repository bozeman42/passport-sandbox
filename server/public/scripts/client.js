var app = angular.module('app',[]);

app.controller('main',function($http) {
  const vm = this;

  vm.userInfo = {
    username: '',
    password: ''
  }
  vm.message = 'Please log in!';

  vm.submit = function() {
    $http.post('/user',vm.userInfo)
    .then(response => {
      vm.message = "Logged in!"
    })
    .catch(error => vm.message = "Username or password is incorrect");
  }

  vm.amIAuthenticated = function() {
    $http.get('/authentication-test')
    .then((response) => {
      vm.message = "Thank you! You are authenticated!";
    })
    .catch((error) => {
      vm.message = "You are not authenticated!";
    })
  }

  vm.logOut = function() {
    $http.get('/logout')
    .then(response => {
      vm.message = "Logged out. Thank you!";
    });
  }

  vm.register = function() {
    $http.post('/newuser',vm.userInfo)
    .then(response => {
      vm.message = "Registered"
    })
    .catch(error => "failed to register");
  }
})