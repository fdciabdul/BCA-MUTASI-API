const {ScrapBCA} = require("mutasi-scraper");

class getMutasi {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  async getSettlement(tglawal,blnawal,tglakhir,blnakhir) {
  const scraper = new ScrapBCA(this.username, this.password);
  const settlement = await scraper.getSettlement(tglawal,blnawal,tglakhir,blnakhir);
  return settlement;
  }
}

module.exports = getMutasi;