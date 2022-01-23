import bcrypt from 'bcrypt';

const users = [
  {
    name: 'AdminOne',
    email: 'adminOne@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'AdminTwo',
    email: 'adminTwo@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
