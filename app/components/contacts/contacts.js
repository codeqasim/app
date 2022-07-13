// CONTACTS CONTROLLER
app.controller('ContactsController', ['$http','$scope','$routeParams','$location',function ($http,$scope) {

        let user_id = get('user_id');

        $('head').append("<script src='https://cdn.jsdelivr.net/npm/simple-datatables@latest' crossorigin='anonymous'></script>");
        $('head').append("<link href='https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css' rel='stylesheet' />");

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
            owner_id: user_id
        });

        $http.post(endpoint+"contacts", data, ContentConfig)
        .then(
       function(res){

         // SUCCESS CALLBACK
        //  console.log(res.data.data)
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

 app.controller('ContactController', ['$http','$scope','$routeParams','$location',function ($http,$scope,$routeParams) {

    // GET ID FROM URL
    var currentId = $routeParams.id;

    var data = $.param({ user_id: currentId });
    $http.post(endpoint+"contacts", data, ContentConfig).then(
        function(res){
        console.log(res.data.data)
        $scope.items = res.data.data;

        if (res.data.data == null) { } else {

            $('.first_name').val(res.data.data[0].first_name)
            $('.last_name').val(res.data.data[0].last_name)
            $('.email').val(res.data.data[0].email)
            $('.mobile').val(res.data.data[0].mobile)
            $('.country_code').val(res.data.data[0].country_code)

        }

    });

    // $('.country_code option[value=1]').attr('selected', 'selected');
    // var name = $scope.name = 'qasim';

    // REDIRECT BACK TO CONTACTS PAGE
    $(".cancel").on('click', function(event){
        redirect('./contacts');
    })

    // SUBMIT DATA TO THE API
    $(".saveBtn").on('click', function(event){
        event.preventDefault();

        // alert('submitted');

        // GET FORM PARAMS AND VALUES
        var first_name = $('.first_name').val();
        var last_name = $('.last_name').val();
        var email = $('.email').val();
        var mobile = $('.mobile').val();
        var country_code = $('.country_code').val();

        // VALIATION
          if(first_name.length === 0 ) { alert('First name is missing')
            } else { if(last_name.length === 0 ) { alert('Last name is missing')
                } else { if(email.length === 0 ) { alert('Email is missing')
                    } else { if(mobile.length === 0  ) { alert('Mobile number is missing')
                        } else { if(country_code.length === 0  ) { alert('Country code is missing')
                            } else {

                            // document.getElementById("submit").classList.remove('button--loading');

                            let user_id = sessionStorage.getItem('user_id');

                            var data = $.param({
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                country_code: country_code,
                                mobile: mobile,
                                owner_id: user_id,
                                user_id: currentId,
                            });

                            // CONDITION TO CHECK IF ID IS PRESENT OR NOT
                            if (currentId == null) {

                                $http.post(endpoint+"signup", data, ContentConfig)
                                .then(
                                function(res){
                                console.log(res.data)

                                // RESPONSE CONDITION
                                if (res.data.status == 'true') {
                                redirect('./contacts#contactadded');
                                } else {
                                alert(res.data.message);
                                }  })

                            } else {

                                console.log(data)

                                $http.post(endpoint+"user_update", data, ContentConfig)
                                .then(
                                function(res){
                                console.log(res.data)

                                // RESPONSE CONDITION
                                if (res.data.status == 'true') {
                                redirect('./contacts#updated');
                                } else {
                                alert(res.data.message);
                                }  })

                            }


                        }
                    }
                }
            }
        }

    })

}])