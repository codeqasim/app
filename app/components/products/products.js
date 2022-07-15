// CONTACTS CONTROLLER
app.controller('ProductsController', ['$http','$scope','$routeParams','$location',function ($http,$scope) {

    let user_id = get('user_id');

    setTimeout(function() {

        const dataTable = new simpleDatatables.DataTable("#table", {
            // searchable: true,
            // fixedHeight: true,

        })

    }, 300);

    // REDIRECT BACK TO CONTACTS PAGE
    $(".search").on('click', function(event){
        var searchBy = ($('.search_by').val())
        var searchText = ($('.search_text').val())

        // VALIATION
        if(searchText.length === 0 ) { alert('Please add value') } else {

            // SEARCH BY EMAIL
            if (searchBy === 'email') {
                var data = $.param({ email: searchText, owner_id: user_id });
                $http.post(endpoint+"contacts", data, ContentConfig).then(
                    function(res){

                    // NOT FOUND MESSAGE
                    if (res.data.data == null) { $('.notfound').fadeIn(500) }

                    // console.log(res.data.data)
                    $scope.items = res.data.data;
                    $('#SearchModal').modal('hide');
               });
            }

            if (searchBy === 'mobile') {
                var data = $.param({ mobile: searchText, owner_id: user_id });
                $http.post(endpoint+"contacts", data, ContentConfig).then(
                    function(res){

                    // NOT FOUND MESSAGE
                    if (res.data.data == null) { $('.notfound').fadeIn(500) }

                    // console.log(res.data.data)
                    $scope.items = res.data.data;
                    $('#SearchModal').modal('hide');
               });
            }

            if (searchBy === 'first_name') {
                var data = $.param({ first_name: searchText, owner_id: user_id });
                $http.post(endpoint+"contacts", data, ContentConfig).then(
                    function(res){

                    // NOT FOUND MESSAGE
                    if (res.data.data == null) { $('.notfound').fadeIn(500) }

                    // console.log(res.data.data)
                    $scope.items = res.data.data;
                    $('#SearchModal').modal('hide');
               });
            }

            if (searchBy === 'last_name') {
                var data = $.param({ last_name: searchText, owner_id: user_id });
                $http.post(endpoint+"contacts", data, ContentConfig).then(
                    function(res){

                    // NOT FOUND MESSAGE
                    if (res.data.data == null) { $('.notfound').fadeIn(500) }

                    // console.log(res.data.data)
                    $scope.items = res.data.data;
                    $('#SearchModal').modal('hide');
               });
            }

            if (searchBy === 'country') {
                var data = $.param({ country_code: searchText, owner_id: user_id });
                $http.post(endpoint+"contacts", data, ContentConfig).then(
                    function(res){

                    // NOT FOUND MESSAGE
                    if (res.data.data == null) { $('.notfound').fadeIn(500) }

                    // console.log(res.data.data)
                    $scope.items = res.data.data;
                    $('#SearchModal').modal('hide');
               });
            }

        }

       $('.reset_search').fadeIn(400);
    })

    var data = $.param({
        user_id: user_id
    });

    $http.post(endpoint+"products", data, ContentConfig)
    .then(
   function(res){

     // SUCCESS CALLBACK
     console.log(res.data)
     $scope.items = res.data.data;
     if (res.data.data == null) {
        $('.contacts').hide()
        $('.notfound').fadeIn(500)
    } else {
        $('.contacts').fadeIn(500)
    }

   },
   function(res){
     // FAILURE CALLBACK
   }
);

$('.reset_search').on('click', function(event){
  redirect('./contacts');
})


$scope.selectInfo=function(id){
    // alert(id);

    let text = "Are you sure you want to delete?";

    if (confirm(text) == true) {

        var data = $.param({ user_id: id,  });
        $http.post(endpoint+"delete-user", data, ContentConfig)
        .then(
        function(res){
        console.log(res.data)

        $('.item_'+id).fadeOut(500);
        redirect('./contacts');

        })

      } else {
        // alert('something wrong hogaya!')
      }

    }

}])

// CONTACTS CONTROLLER
app.controller('ProductController', ['$http','$scope','$routeParams','$location',function ($http,$scope,$routeParams) {

    var currentId = $routeParams.id;
    let user_id = get('user_id');

    var data = $.param({ product_id : currentId });
    $http.post(endpoint+"product", data, ContentConfig).then(
        function(res){
        console.log(res.data.data)

        // $scope.items = res.data;

        if (res.data == null) { } else {

            $('.product_name').val(res.data.data[0].product_name)
            $('.product_desc').val(res.data.data[0].product_desc)

            // $('.product_desc').val(res.data.data[0].product_desc)
            // $('.last_name').val(res.data.data[0].last_name)
            // $('.email').val(res.data.data[0].email)
            // $('.mobile').val(res.data.data[0].mobile)
            // $('.country_code').val(res.data.data[0].country_code)

        }

    });

    // $scope.product_name = "New Product";
    // console.log($scope.product_names);

}])