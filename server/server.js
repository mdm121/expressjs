const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const rp = require('request-promise');

let app = express();
const formSubmissions = path.join( __dirname, "../formsubmissions.json" );

app.use(express.static(path.join( __dirname, '../public' )));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(express.json()); //req.body parse
app.use(express.urlencoded({ extended: false })); // needed to parse bodies!

app.post('/form-example', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    

    fs.readFile(formSubmissions, (err, data) => {
        if(err) console.log(err);
        
        let usersArray = JSON.parse(data);

        // let newUser = req.body;
        // usersArray.push(newUser);

        fs.writeFile(formSubmissions, JSON.stringify([req.body, ...usersArray], null, 2), (err) => {
            if (err) console.log(err);

            console.log('File was written successfully!');
            console.log(req.body);
        })
    })
    
    res.redirect('/');
})

app.get('/order/:id', (req, res) => {
    let id = req.params.id;
    let email = req.query.email;
    res.send(`Your username is ${id} and your email is ${email}`);

})

app.listen(3000);