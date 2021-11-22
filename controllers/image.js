const fetch = require("node-fetch");

const handleApiCall = (req, res) => {
  const reqBody = JSON.stringify({
    user_app_id: {
      user_id: "uzairazizsuria",
      app_id: "smart-brain",
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key 1669f156181541e0962f41530c8db8c9",
    },
    body: reqBody,
  };

  fetch(
    "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
    requestOptions
  )
    .then((response) => response.text())
    .then((data) => {
      res.end(data);
    })
    .catch((err) => res.status(400).json("ERROR: UNABLE TO WORK WITH API"));
};

const onImageSubmit = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to retrieve data");
    });
};

module.exports = {
  onImageSubmit,
  handleApiCall,
};
