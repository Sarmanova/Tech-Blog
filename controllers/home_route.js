const router = require("express").Router();
const { Post, Comment } = require("../models");
// Use withAuth middleware to prevent access to route
// GET all posts for homepage
router.get("/", async(req, res) => {
    console.log("HELLO U R ON THE HOM EPAGE 300");
    try {
        const postData = await Post.findAll({
            include: [{
                model: Comment,
                attributes: ["user_name", "comment_text", "post_id"],
            }, ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("posts for the homepage!!", posts);

        res.render("homepage", {
            posts,
            loggedIn: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/post/:id", async(req, res) => {
    try {
        // Find the logged in user based on the session ID
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: Comment,
                attributes: ["user_name", "post_id", "comment_text"],
            }, ],
        });

        const post = postData.get({ plain: true });
        console.log(post);
        res.render("post", {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Comment API
router.get("/comment/:id", async(req, res) => {
    try {
        const commentData = await Post.findByPk(req.params.id);

        const comment = commentData.get({ plain: true });
        console.log(comment);
        res.render("comment", {
            comment,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/post");
        return;
    }

    res.render("login");
});

router.get("/newpost", (req, res) => {
    res.render("newpost");
});
module.exports = router;