const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.pcgamer.com/news/";

fetchData(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  const news = $(".listingResults.news > div > a");
  let resultarr = [];
  news.each(function () {
    let header = $(this).find("h3").text();
    let link = $(this).attr("href");
    if (header !== "") {
      let obj = {
        title: header.replace("\n", " "),
        link: link,
      };
      resultarr.push(obj);
    }
  });
  createJson(resultarr);
});

async function fetchData(url) {
  console.log("Crawling Data...");
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("Error occured while fetching data");
    return;
  }
  return response;
}

async function createJson(result) {
  // result = result.replace(/\r?\n|\r/g, " ");
  var json = JSON.stringify(result);
  fs.writeFile("response-pcgamer.json", json, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The File was Saved!");
  });
}
