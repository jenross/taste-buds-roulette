$(document).ready(function() {

    $(document).on("submit", "#login", function() {
      event.preventDefault();
  
      let tof;
      // Grabs email & password from login page
      let email = $("#email").val().trim();
      let password = $("#password").val().trim();
      
      // loops through database
      // if email and password match do function
      $.get("/api/user", function(data) {
        for (let i = 0; i < data.length; i++) {
  
          if (email === data[i].email && password === data[i].password) {
  
            userId = data[i].id;
  
            login(userId);

            tof = "false"
  
          }
          else {
              tof = "true";
          }
          
        }
        console.log(tof)
        if (tof === "true") {
          alert("User not found!!!")
        }
      })
      
    });
    
  });
  
  
  const login = (userId) => {
    location.href = "/create-hangout?user_id=" + userId;
  }