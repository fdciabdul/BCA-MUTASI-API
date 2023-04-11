const express = require('express');
const Scraper = require('./lib/scraper');
const fs = require("fs");
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;
var CronJob = require('cron').CronJob;
const {Akun ,Mutasi} = require("./app/model/");
app.use(express.json());
app.use(require('compression')());

async function scrapeAccount(account) {
  try {
    console.log(`Scraping account with link ${account.link}`);

    const today = new Date();
    const twoDaysBefore = new Date(today);
    twoDaysBefore.setDate(today.getDate() - 2);
    
    const bank = new Scraper(account.username, account.password);
    const mutasi = await bank.getSettlement(twoDaysBefore, today.getMonth , today.getDay(), today.getMonth);
    
    const [_, wasCreated] = await Mutasi.upsert({
      link: account.link,
      mutasi: mutasi
    });

    //console.log(mutasi);
    console.log(`Mutasi ${wasCreated ? 'created' : 'updated'} at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error(error);
  }
}

async function startScrapingAccounts() {
  const accounts = await Akun.findAll();
  try {
   // loop account win cron
   // cron every 1 minute
    const job = new CronJob('*/5 * * * *', async () => {
      for (const account of accounts) {
        await scrapeAccount(account);
      }
    }, null, true, 'Asia/Jakarta');



  job.start();
  } catch (error) {
   
  }
}

startScrapingAccounts();


function includeRouter(folderName) {
  console.log(" ======================================= ")
  fs.readdirSync(folderName).forEach(function (file) {
    var fullName = path.join(folderName, file);
    var stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      includeRouter(fullName);
    } else if (file.toLowerCase().indexOf(".js")) {
      require("./" + fullName)(app);
      console.log(" Found Router => '" + fullName + "'");
    }
  });
  console.log(" ======================================= ")
}

// =================== Set Interval Refresh Check email Blast
includeRouter("app/controller/");


app.listen(port, () => console.log(`Server running on port ${port}.`));
