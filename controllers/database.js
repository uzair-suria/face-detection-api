const handleDbRequest = (req, res, db) => {
  try {
    db.select("*")
      .from("users")
      .then((results) => {
        res.status(200).json(results);
      });
    // const client = await pool.connect();
    // const result = await client.query("SELECT * FROM test_table");
    // const results = { results: result ? result.rows : null };
    // client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};
