const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log('hash:', hash);
//   });
// });

const hashedPassword = '$2a$10$7gDB2.rlVjKhYOU0By5ZM.dK2RnTF/Solv0i2Il2ZA6bRgzHp7SoC';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log('result:', result);
});

// const data = {
//   id: 10
// };

// const token = jwt.sign(data, '123abc');
// console.log('token: ', token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded:', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// console.log('Token hash:', token.hash);
// console.log('Result Hash:', resultHash);

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }

