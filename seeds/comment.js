const { Comment } = require("../models");

const commentData = [{
    user_name: "Saya",
    post_id: 1,
    comment_text: " These methods are limited to direct matches",
}, ];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;