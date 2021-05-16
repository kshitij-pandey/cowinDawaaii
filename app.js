const https = require("https");
const express = require("express");
const request = require("request")

const app = express();

// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/index.html");
// });

app.get("/", function(request,response){
  var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=512&date=31-03-2021&vaccine=COVISHIELD";

  https.get(url, function(res){
      var body = "";
      res.on("data", function(chunk){
          body += chunk;
      });

      res.on("end", function(){
        const covidCenter = JSON.parse(body)
        for (i = 0; i < covidCenter.sessions.length; i++){
            response.send(covidCenter.sessions[i].name);
      }

      });

  }).on("error", function(e){
        console.log(e);
  });
});


app.listen(8080, () => {
  console.log("Server is started on port 8080");
});
