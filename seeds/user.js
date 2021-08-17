const { User } = require("../models");

const userData = [{
        username: "sayasarman",
        email: "zhansayasarmanova1993@gmail.com",
        password: "password1993@",
    },
    {
        username: "test 2",
        email: "test@gmail.com",
        password: "password1993@",
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;