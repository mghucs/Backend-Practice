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

    /* I tried a lot of things here. using a variable outside of the promise.then just does not work
        I can make a variable before the promise but then assign it inside of the promise.then and then
        return it at the end of the function. This doesn't work because the promise is asynchronous. Thus
        you have to work with everything asynchronous and everything has to be done within the promise.then

        Call axios.get for each promise individually does not work because, that would require appending
        to all_posts separately which is a variable that exists outside the promise. Thus I have to use
        promise.all to do all the promises at the same time since this is asynchronous.
    */  
    let promises = []
    tags.split(",").forEach(
        function(tag) {
            promises.push(axios.get(`some url`))
        })
    Promise.all(promises)
        .then(function(responses) {
            let all_posts = []
            responses.forEach((response) => {
                // console.log("in", response.data.posts.slice(0,3))
                all_posts.push(response.data.posts)
            })

            // if (direction == "asc") {
            //     all_posts.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
            // }
            // else if (direction == "desc") {
            //     all_posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
            // }
            res.json(all_posts)
        })
    

    // 1: get posts from inside promise into a big array 
    // 2: sort outside the axios promise 
    // problem: My variables outside do not get resolved by the promise before they are hit
});
