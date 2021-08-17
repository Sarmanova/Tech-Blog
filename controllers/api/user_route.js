const router = require("express").Router();
const { User, Post } = require("../../models");

// Post will create a new post
router.post("/addpost", async(req, res) => {
    console.log("REQ .body!!!", req.body);
    console.log('session;,', req.session)
    try {
        const postData = await Post.create({
            title: req.body.user,
            post_content: req.body.text,
            user_id: req.session.user_id,
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post("/login", async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/signup", async(req, res) => {
    try {
        console.log("new user data", req.body);
        const userData = await User.create(req.body);

        console.log("new user we made", userData);



        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        console.log("WHAT EWENT WRONG!!!", err);
        res.status(400).json(err);
    }
});
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;