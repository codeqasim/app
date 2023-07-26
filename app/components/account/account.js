
// LOGIN CONTROLLER
app.controller('LoginController', ['$http','$scope',function ($http,$scope) {

    $("#login").submit(function() {
      event.preventDefault();

      // GET FORM PARAMS AND VALUES
      var emailData = $('.email').val();
      var passwordData = $('.password').val();

      // VALIDATION
      if(emailData.length === 0 || emailData.length === 0 ){
        alert('Email and password both required to login')
        document.getElementById("submit").classList.remove('button--loading');
      } else {

        $.ajax({
          url: endpoint+"login",
          type: 'POST',
          dataType: "json",
          data: {
            email: emailData,
            password : passwordData
          },
        }).done(function(res) {
          console.log(res.data);
          if(res.status == 'true'){

            var user_id = res.data[0].user_id;

            // console.log(res.data[0].user_id);
            set('user_id',user_id)
            // sessionStorage.setItem('user_id', user_id);

            // alert(sessionStorage.getItem('user_id'));
            // REDIRECT ON SUCCESSFUL SIGNUP
            // window.location.href = "./dashboard";

            redirect("./dashboard");

            } else { // LOGIN ERROR
               alert(res);
               document.getElementById("submit").classList.remove('button--loading');
            } })
      }

    });
  }]) // LOGIN CONTROLLER


  // SIGNUP CONTROLLER
  app.controller('SignupController', ['$http','$scope',function ($http,$scope) {

    $("#signup").submit(function() {
      event.preventDefault();

      // GET FORM PARAMS AND VALUES
      var first_name = $('.first_name').val();
      var last_name = $('.last_name').val();
      var email = $('.email').val();
      var password = $('.password').val();
      var country = $('.country').val();
      var mobile = $('.mobile').val();

      $.ajax({
        url: endpoint+"signup",
        type: 'POST',
        dataType: "json",
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          passowrd_confirmation: password,
          country_code: country,
          mobile: mobile
        },
      }).done(function(res) {
        console.log(res.data);
        if(res.status == 'true'){

      var user_id = res.data.id;

      // SIGNUP EMAIL
      mailer(email,password);

      // .done(function(result) { console.log(result); })
      // .fail(function(err) { throw err; });

      // REDIRECT ON SUCCESSFUL SIGNUP
      window.location.href = "./signup-success";

         } else {
            alert(res.data.message);
            document.getElementById("submit").classList.remove('button--loading');
         }

      })

      .catch(function (error) {
      console.log(error);
      });

   });

  }]) // SIGNUP CONTROLLER


// RESET PASSWORD CONTROLLER
app.controller('ResetPasswordController', ['$http','$scope',function ($http,$scope) {

    $("#reset").submit(function() {
      event.preventDefault();

        // GET FORM PARAMS AND VALUES
        var email = $('.email').val();
        // alert(email);

        $.ajax({
            url: endpoint+"login-reset",
            type: 'POST',
            dataType: "json",
            data: {
              email: email,
            },
          }).done(function(res) {
            console.log(res.data);
            if(res.status == 'true'){

            // RESET EMAIL
              mailer(email,res.password);

              // alert(res.message)
              alert('Your password has been changed please check you mailbox for new password');

              window.location.href = "./login";

            }

        });

    });

  }])


  // RESET PASSWORD CONTROLLER
app.controller('ProfileController', ['$http','$scope',function ($http,$scope) {

      let user_id = get('user_id');

      $.ajax({
          url: endpoint+"user_profile",
          type: 'POST',
          dataType: "json",
          data: {
            user_id: user_id,
          },
        }).done(function(res) {
          // console.log(res.data);
          if(res.status == 'true'){

            $('.first_name').val(res.data[0].first_name)
            $('.last_name').val(res.data[0].last_name)
            $('.email').val(res.data[0].email)
            $('.mobile').val(res.data[0].mobile)
            $('.country_code').val(res.data[0].country_code)

          }

      });

      $("#update").on('click', function(event){
        event.preventDefault();

        // GET FORM PARAMS AND VALUES
        var first_name = $('.first_name').val();
        var last_name = $('.last_name').val();
        var email = $('.email').val();
        // var password = $('.password').val();
        var country = $('.country_code').val();
        var mobile = $('.mobile').val();

        $.ajax({
          url: endpoint+"user_update",
          type: 'POST',
          dataType: "json",
          data: {
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            // password: password,
            country_code: country,
            mobile: mobile
          },
        }).done(function(res) {
          console.log(res);

          redirect('./profile');
        }).fail(function(err) { throw err; });

      })

}])