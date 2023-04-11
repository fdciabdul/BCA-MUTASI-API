const {Mutasi} = require("../model")
module.exports = async function (app) {
    app.get('/account/:link/getMutasi', async (req, res) => {
        const link= req.params.link
      
        // Find account that matches given username and password
      
        try {
          const account = await Mutasi.findOne({
            where: {
              link
            }
          });
      
          if (!account) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          // Return account info on successful authentication
          res.json(JSON.parse(account.mutasi));
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while authenticating user' });
        }
      });
};