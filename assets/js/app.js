var endpoint = "http://localhost/app/api/";
var app = angular.module('app', ['ngRoute','ngMeta','ngAnimate']);

// ======================================== MAILE FUNCTION
function mailer(email,password) {

$.ajax({
    url: "https://api.smtp2go.com/v3/email/send",
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    data: JSON.stringify({
    'api_key': "api-2428E25442A111ECA77BF23C91BBF4A0",
    'to': [
    "Hello" + '<' + email + '>'
    ],
    'sender': "WebAdmin <info@paidlance.com>",
    'subject': "Account",
    'text_body': "Your account is ready and rememeber your " + password
    }),
})}
// ======================================== MAILE FUNCTION

// FUNCTIONS
function get(item){
return window.localStorage.getItem(item);
}
function set(item, value){
window.localStorage.setItem(item, value);
}

// REDIRECT
function redirect(url) { window.location.href = url; }
url=window.location.href;

// GET LAST CHARACTER
hrefurl=$(location).attr("href");
lastURL=hrefurl.substr(hrefurl.lastIndexOf('/') + 1)

// CONTENT CONFIG
var ContentConfig = {
  headers : {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
  }
}

// APP NAME
app.run(function($rootScope) {
  $rootScope.appname = 'APP NAME';
});

app.config(['$locationProvider', '$routeProvider','ngMetaProvider', function ($locationProvider, $routeProvider,ngMetaProvider) {

$routeProvider.

// HOME PAGE
when('/', {
  templateUrl: './app/components/global/home.html',
   data: {
        meta: {
          'title': 'Home',
          'description': 'Home'
        }
      }
  }).

// CONTACT PAGE
when('/contact', {
templateUrl: './app/components/cms/contact.html'
}).

// LOGIN PAGE
when('/login', {
  templateUrl: './app/components/account/login.html',
   data: {
        meta: {
          'title': 'Login',
          'description': 'Login'
        }
      }
  }).

when('/forget-password', {
  templateUrl: './app/components/account/forget_password.html',
    data: {
        meta: {
          'title': 'Forget Password',
          'description': 'Forget Password'
        }
      }
  }).

// SIGNUP PAGE
when('/signup', {
  templateUrl: './app/components/account/signup.html',
   data: {
        meta: {
          'title': 'Signup',
          'description': 'Signup'
        }
      }
  }).

  // SIGNUP SUCCESS PAGE
when('/signup-success', {
  templateUrl: './app/components/account/signup_success.html',
   data: {
        meta: {
          'title': 'Signup Success',
          'description': 'Signup Success'
        }
      }
  }).

// CONTRACTS PAGE
when('/contacts', {
  templateUrl: './app/components/contacts/contacts.html',
   data: {
        meta: {
          'title': 'Contacts',
          'description': 'Contacts'
        }
      }
  }).

// CONTACT EDIT PAGE
when('/contacts-add', {
templateUrl: './app/components/contacts/contact.html',
// controller: 'EditContactController',
  data: {
      meta: {
        'title': 'Add Contact',
        'description': 'Add Contact'
      }
    },
}).


// CONTACT ADD PAGE
when('/contacts/:id', {
templateUrl: './app/components/contacts/contact.html',
  data: {
      meta: {
        'title': 'Add Contact',
        'description': 'Add Contact'
      }
    }
}).


// TERMS PAGE
when('/terms', {
templateUrl: './app/components/cms/terms.html',
  data: {
      meta: {
        'title': 'Terms & Condition',
        'description': 'Terms & Condition'
      }
    }
}).

// ACCOUNT PAGE
when('/dashboard', {
  templateUrl: './app/components/account/dashboard.html',
    data: {
        meta: {
          'title': 'Account',
          'description': 'Account'
        }
      }
  }).

// Logout PAGE
when('/logout', {
  templateUrl: './app/components/account/logout.html',
    data: {
        meta: {
          'title': 'Logout',
          'description': 'Logout'
        }
      }
  }).


// TERMS PAGE
when('/table', {
  templateUrl: './app/components/global/table.html',
    data: {
        meta: {
          'title': 'Table',
          'description': 'Table'
        }
      }
  }).

when('/blog', {
  templateUrl: './app/components/blog/listing.html',
  data: {
        meta: {
          'title': 'Blog',
          'description': ''
        }
      }
}).

otherwise({
redirectTo: '/'
});

$locationProvider.html5Mode(true);
}])

.run(['ngMeta', function(ngMeta) {
    ngMeta.init();
}])

.directive('headdrop', function() {
    return {
        restrict: 'E',
    templateUrl: './app/components/partcials/headdrop.html',
    };
})

.directive('dash_menu', function() {
  return {
      restrict: 'E',
  templateUrl: './app/components/partcials/dash_menu.html',
  };
})


// HEADER
app.controller('header', ['$http','$scope',function ($http,$scope) {

if ("user_id" in sessionStorage) {

// alert(sessionStorage.getItem('user_id'));

$('.user_account_logged').hide(400);
  } else {
$('.user_account_not_logged').hide(400);
}

}])

// app.controller('Featured', ['$http','$scope',function ($http,$scope) {

//   $('.featured').slick({
//     lazyLoad: 'ondemand',
//     infinite: true,
//     slidesToShow: 6,
//     slidesToScroll: 1
//   });

// }])

app.controller('account', ['$http','$scope',function ($http,$scope) {
  $scope.user_id = sessionStorage.getItem('user_id');

  if ("user_id" in sessionStorage) {
  } else { window.location.href = './' }

}])

.controller('logoutController', function($scope,$location){

      sessionStorage.removeItem('user_id');
      $scope.username_id = '';
      $scope.username = '';
      $scope.password = '';
      window.location.href='./';

      // $location.path('/');

})

app.controller('Home', ['$http','$scope',function ($http,$scope) {

     $http({
      method: 'GET',
      url: '',
      data: $.param({ }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(
      function(res) {

      $scope.items = res.data
      console.log('succes !',  res.data);
      },
      function(err) {
      console.log('error...', err);
      }
    );

}])


app.controller('signup', ['$http','$scope',function ($http,$scope) {

  $scope.submit_form = function(formData) {

    $scope.formData = formData;

    console.log(formData); // object
    console.log(JSON.stringify(formData)); // string

    $scope.form = {}; // clear ng-model form

}

}])

app.controller('blog', ['$http','$scope',function ($http,$scope) {

// Variables
$scope.showLoadmore = true;
$scope.row = 0;
$scope.rowperpage = 3;
$scope.buttonText = "Load More";

// Fetch data
 $scope.getPosts = function(){

    $http({
    method: 'GET',
    url: 'https://phptravels.net/api/api/blog/list?appKey=phptravels',
    data: {row:$scope.row,rowperpage:$scope.rowperpage},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function successCallback(res) {

      console.log('succes !',  res.data.response.posts);

        if(res.data.response.posts !='' ){

            $scope.row+=$scope.rowperpage;
            if($scope.blogs != undefined){
                $scope.buttonText = "Loading ...";
                setTimeout(function() {
                    $scope.$apply(function(){
                    angular.forEach(res.data.response.posts,function(item) {
                        $scope.blogs.push(item);
                    });
                    $scope.buttonText = "Load More";
                    });
                },500);
                // $scope.posts.push(response.data);

            }else{
                $scope.blogs = res.data.response.posts;
            }
        }else{
            $scope.showLoadmore = false;
        }

    });
 }

 // Call function
 $scope.getPosts();



  // // API CALL
  // $http({
  //   method: 'GET',
  //   url: 'https://phptravels.net/api/api/blog/list?appKey=phptravels',
  //   data: $.param({ }),
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  //   }).then(
  //   function(res) {

  //   $scope.blogs = res.data.response.posts
  //   console.log('succes !',  res.data.response.posts);
  //   },
  //   function(err) {
  //   console.log('error...', err);
  //   }
  // );


  // $scope.blogs = [];
  // $scope.reviewInfo = [];
  // var cnt = 6;
  // var ind = 0;

  // //for the sake of this demo, generate some dummy data
  // for (var i = 0; i < 1000; i++) {
  //   $scope.blogs.push(i);
  // }

  // $scope.loadMore = function() {

  //     ind = ind + cnt
  //     var r = cnt
  //     if (ind + cnt > $scope.blogs.length) {
  //       r = $scope.blogs.length - ind
  //     }
  //     $scope.reviewInfo = $scope.reviewInfo.concat($scope.blogs.slice(ind, r + ind))
  //   }
  //   //load the first bit right away
  // $scope.reviewInfo = $scope.blogs.slice(0, cnt);

  // $scope.resetList = function() {
  //   ind = 0
  //   $scope.reviewInfo = $scope.blogs.slice(0, cnt);
  // };


  // // $scope.blogs = [
  // //   {
  // //     "name":"friend1",
  // //     "email":"email1@gmail.com"
  // //   },
  // //   {
  // //     "name":"friend2",
  // //     "email":"email2@gmail.com"
  // //   },
  // //   {
  // //     "name":"friend3",
  // //     "email":"email4@gmail.com"
  // //   }
  // // ];

}

])