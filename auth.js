const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  parallelism: 1,
  timeCost: 5,
};
const hashPassword = async (req, res, next) => {
  const { passWord } = req.body;
  const hash = await argon2
    .hash(passWord, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendstatus(500);
    });
};

module.exports = { hashPassword };
