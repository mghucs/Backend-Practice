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

async function GetPosts(tag) {
    return await axios.get(`someurl`)
    .then(
        function(response) {
            console.log(response.data.posts.slice(0,5))
            return response.data.posts

            // if (direction == "asc") {
            //     posts.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
            // }
            // else if (direction == "desc") {
            //     posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
            // }
            // res.json(posts)
        },
        function(error) {
            
        }
    )
}

app.get("/api/posts", (req, res, next) => {

    const tags = req.query.tags;
    if (typeof(tags) == "undefined") {
        res.status(400);
        res.json({
            "error": "Tags parameter is required"
        });
        return
    }
    let sortBy = req.query.sortBy ? req.query.sortBy : "id" 
    let direction = req.query.direction ? req.query.direction: "asc"

    if (sortBy != "id" && sortBy != "reads" && sortBy != "likes" && sortBy != "popularity") {
        res.status(400)
        res.json({"error": "sortBy parameter is invalid"})
        return
    }

    tags.split(",").forEach(
        function(tag) {
            GetPosts(tag)
        }
    )
    // .then(function (response) {
    //     let posts = response.data.posts
    // })

    posts = {"Me": 3}
    // if (direction == "asc") {
    //     posts.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
    // }
    // else if (direction == "desc") {
    //     posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
    // }
    res.json(posts)


    // 1: get posts from inside promise into a big array
    // 2: sort outside the axios promise
    // problem: My variables outside do not get resolved by the promise before they are hit
});
