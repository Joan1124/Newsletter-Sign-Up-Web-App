const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})



app.post("/", function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members:[{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const url = "https://us14.api.mailchimp.com/3.0/lists/73d0654637";
  const jsonData = JSON.stringify(data);
  const options ={
  method: "POST",
  auth: "Joan:b9e506e92c45a33944856bd8451d8881-us14"
  }

  const request = https.request(url, options, function(response){

      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");

      }

  response.on("data", function(data){
    console.log(JSON.parse(data));
    })
  })

  request.write(jsonData)
  request.end();

})
app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on heroku or 3000");
})

//b9e506e92c45a33944856bd8451d8881-us14 Api key
//73d0654637 ListId

//IMPORTANT
//**you fixed error on heroku by removing package.lock jason and changing to Json file baxck to the course default!**
