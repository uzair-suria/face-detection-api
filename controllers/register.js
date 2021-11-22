const handleRegistration = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  db.transaction((trx) => {
    trx("login")
      .insert({ email, hash })
      .returning("email")
      .then((loginEmail) => {
        trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegistration,
};
