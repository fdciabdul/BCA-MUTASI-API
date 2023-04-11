const {Akun} = require("../model");
const Generate = require("../libraries/generateCode")
module.exports = async function (app) {
    app.post('/account', async (req, res) => {
      const code = Generate.genCode(5);
      let data = {
        username: req.body.username,
        password: req.body.password,
        link : code,
        tanggalawal: req.body.tanggalawal,
        bulanawal: req.body.bulanawal,
        tanggalakhir: req.body.tanggalakhir,
        bulanakhir: req.body.bulanakhir,
     }
        try {
          const account = await Akun.create(data);
          res.json(account);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'An error occurred while creating the account.' });
        }
      });
};