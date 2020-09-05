const express = require("express");
const app = express();
const users = require("./db/user.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//get, post, pathc, delete => express methods
//127.0.0.1:3000 => localhost:3000/home
// get all => admin
// get => particular to a user
// post => create a user
// update => update a user
// delete a user
// nmae, password, handle, image_url, uid(User Id)
app.use(express.json());  // for accepting data in req.body
//Create
app.post("/user", (req,res) => {
    let user = req.body;
    user.uid = uuidv4();
    console.log(user);

    users.push(user);
    fs.writeFileSync("./db/user.json", JSON.stringify(users));
    res.status(201).json({
        status : "Success",
        user: req.body
    })
})

//get all
app.get("/user", (req,res) => {
    res.status(201).json({
        status:"Success",
        user : users
    })
})
//get by uid
app.get("/user/:uid", (req,res) => {
    //req parameter -> user id
    let cUid  = req.params.uid;
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status : "Success",
        user: userArr.length == 0 ? "No User":userArr[0]
    })
})

//update - --
app.patch("/user/:uid", (req, res) => {
    let user = getUserById(req.params.uid);

})


app.listen(3000, () => {
    console.log("Server Started at port 3000");
})