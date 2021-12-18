const express = require("express");
const bodyp = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


const port = process.env.PORT || 3000;


app.use(bodyp.urlencoded({ extended: true }));


app.listen(port, function () {
    console.log(`The server has started on port http://localhost:${port}`);
})


app.use(express.static("public"));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/response', function (req, res) {



    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };


    const jsonData = JSON.stringify(data);


    const url = "https://us20.api.mailchimp.com/3.0/lists/7e0c9142fc";

    const options = {
        method: "POST",
        auth: process.env.API_KEY
    }

    const request = https.request(url, options, function (response) {


        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/sucess.html');
        }
        else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", function (data) {
            // console.log(JSON.parse(data));
        });


    });

    request.write(jsonData);
    request.end();
});


// f51d24a7545d3338408c42d6608da319-us20
// 7e0c9142fc