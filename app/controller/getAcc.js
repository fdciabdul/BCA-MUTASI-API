const {Akun} = require("../model")
module.exports = async function (app) {
    app.get('/account/:link', async (req, res) => {
        const link= req.params.link
      
        // Find account that matches given username and password
        Akun.sync()
        
        try {
          const account = await Akun.findOne({
            where: {
              link
            }
          });
      
          if (!account) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          // Return account info on successful authentication
          res.json({
            corpid: account.corpid,
            username: account.username,
            link: account.link,
            tanggalawal: account.tanggalawal,
            bulanawal: account.bulanawal,
            tanggalakhir: account.tanggalakhir,
            bulanakhir: account.bulanakhir
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while authenticating user' });
        }
      });
};