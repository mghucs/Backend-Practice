var express = require('express');
var app = express();
const axios = require('axios');

app.listen(3000, () => {
    console.log("Hello Me: running on port 3000");
});

app.use(express.json())
app.get("/api/ping", (req, res, next) => {
    res.json({
        "success": true
    })
});

async function GetPosts(url) {
    return await axios.get(url)
}

app.get("/api/posts", (req, res, next) => {

    const tag = req.query.tag;

    GetPosts(`someurl`)
    .then(function (response) {
        let posts = response.data.posts
        let sortBy = req.query.sortBy ? req.query.sortBy : "id" 
        let direction = req.query.direction ? req.query.direction: "asc"

        if (direction == "asc") {
            posts.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
        }
        else if (direction == "desc") {
            posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
        }
        res.json(posts)
    })
    
});
