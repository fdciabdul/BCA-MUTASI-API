const {Akun} = require("../model");
module.exports = async function (app) {
    app.put('/account/:link', async (req, res) => {
        const link = req.params.link;
        const data = {};
        if (req.body.tanggalawal) data.tanggalawal = req.body.tanggalawal;
        if (req.body.bulanawal) data.bulanawal = req.body.bulanawal;
        if (req.body.tanggalakhir) data.tanggalakhir = req.body.tanggalakhir;
        if (req.body.bulanakhir) data.bulanakhir = req.body.bulanakhir;
        console.log(data)
        try {
          const account = await Akun.update(data, {
            where: { link },
          });
    
          if (account[0] === 0) throw new Error('Account not found!');
    
          res.json({ message: `Account ${link} has been updated successfully!` });
        } catch (error) {
          console.error(error);
          const statusCode = error.message === 'Account not found!' ? 404 : 500;
          res.status(statusCode).json({ message: error.message });
        }
      });
};