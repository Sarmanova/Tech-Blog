const seedPosts = require("./post");
const seedUsers = require("./user");
const seedComments = require("./comment");

const sequelize = require("../config/connection");
const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log("DATABASE SYNCED")
    await seedUsers();
    console.log("USER SEEDS");
    await seedPosts();
    console.log("POST SEEDS");
    await seedComments();
    console.log("COMMENT SEEDS");
    process.exit(0);
};

seedAll();