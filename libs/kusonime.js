const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const striptags = require("striptags");
const puppeteer = require("puppeteer");

const listAnime = async (judulAnime) => {
  const dataWrap = await axios.get(judulAnime);
  const $ = cheerio.load(dataWrap.data);
  let namaAnime = [];
  $(".venutama .kover .thumb").each((i, el) => {
    $(el)
      .find("a")
      .each((index, el) => {
        namaAnime[i] = $(el).attr("title") + " : " + $(el).attr("href");
      });
  });

  return namaAnime;
};

const searchAnime = async (judulAnime) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://kusonime.com", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("input[name=s]");
  await page.$eval("input[name=s]", (el, judulAnime) => (el.value = judulAnime), judulAnime);
  await page.click('button[type="submit"]');
  await page.waitForSelector(".venutama");
  const text = await page.evaluate(() => {
    const anchor = document.querySelector(".venutama");
    return anchor.baseURI;
  });
  await browser.close();
  return text;
};

const getAnime = async (linkGan) => {
  const dataWrap = await axios.get(linkGan);
  const $ = cheerio.load(dataWrap.data);
  //   fs.writeFileSync("apa/halamanUtama.html", $(".venutama").html());
  let info = [];
  let link = {};
  $(".lexot .info p").each((i, el) => {
    info[i] = $(el).toString().trim();
  });

  //   link
  const scrapLink = $(".lexot .smokeurl");

  //   scrapLink.find("a").each((i, el) => {
  //     link[i] = $(el).attr("href");
  //   });

  scrapLink.each((i, el) => {
    let linkWi = [];

    $(el)
      .find("a")
      .each((h, r) => {
        linkWi[h] = $(r).text() + " : " + $(r).attr("href");
      });

    link[$(el).find("strong").text()] = linkWi;
  });

  //   console.log(link);
  info = info.map((v) => striptags(v));

  return { info, link };
};

module.exports = { listAnime, getAnime, searchAnime };
