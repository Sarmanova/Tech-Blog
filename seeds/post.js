const { Post } = require("../models");

const postData = [{
    title: "The best code editors in 2021: our guide to the top options",
    post_content: "The best code editors can have a huge impact on your productivity and workflow. Many of us stick with what we know out of habit, but shopping around can uncover fast and intuitive interfaces or killer features that can help get the work done more quickly and efficiently.",
    user_id: 1,
}, ];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;