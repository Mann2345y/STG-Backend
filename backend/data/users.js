import bcrypt from "bcrypt";

const users = [
  {
    name: "AdminOne",
    email: "adminOne@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    image: "/defaultAvatar.png",
  },
  {
    name: "AdminTwo",
    email: "adminTwo@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    image: "/defaultAvatar.png",
  },
  {
    name: "UserOne",
    email: "userOne@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    image: "/defaultAvatar.png",
  },
  {
    name: "UserTwo",
    email: "userTwo@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    image: "/defaultAvatar.png",
  },
  {
    name: "UserThree",
    email: "userThree@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    image: "/defaultAvatar.png",
  },
  {
    name: "UserFour",
    email: "userFour@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    image: "/defaultAvatar.png",
  },
];

export default users;
