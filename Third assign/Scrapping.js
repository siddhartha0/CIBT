const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());

app.listen(3333, () => {
  console.log("connected");
});

app.get("/getD", async (re, res) => {
  const getV = await scrap();
  res.send(getV);
});

const scrap = async () => {
  const url = "https://www.merolagani.com/LatestMarket.aspx";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("table"),
      (e) => e.querySelector("tbody")?.innerText
    ).slice(0, 1)
  );

  console.log(data.length);

  const datas = data.map((d) => d.split("\n"));
  // console.log(datas);
  const newD = datas.map((d, i) => d.slice(0, 10).map((v) => v.split("\t")));
  const companyData = newD.map((news) =>
    news.map((v) => {
      let comp = {};
      comp.company = v[0];
      comp.ltp = v[1];
      comp.change = v[2];
      comp.open = v[3];
      comp.high = v[4];
      comp.low = v[5];
      comp.number = v[6];

      return comp;
    })
  );

  // console.log(companyData);

  fs.writeFile("data.json", JSON.stringify(companyData), () => {
    console.log("ok");
  });

  browser.close();

  return companyData;

  // datas.map((d) => console.log(d.companyName));

  // const scrapedData = await page.evaluate(() => {
  //   const rows = document.querySelectorAll("tbody tr");
  //   const data = [];
  //   rows.forEach((row) => {
  //     const rowData = {};
  //     const cells = row.querySelectorAll("td");
  //     rowData.symbol = cells[0].querySelector("a")?.textContent.trim();
  //     rowData.LTP = cells[1]?.textContent.trim();
  //     rowData.percentChange = cells[2]?.textContent.trim();
  //     // Add more fields as needed...
  //     data.push(rowData);
  //   });
  //   return data;
  // });

  // Output the scraped data
  // console.log(scrapedData);
  // const da = data.map((d) => ({ each: d.html.split("\t") }));
  // console.log(da);

  // const newD = data[0].html;
  //   console.log(newD[0]);
  // const v = newD.split("\n");
  //   const newV = v.map((e) => e.split("\n"));
  //   v.map((vt) => console.log(vt[0]));
  //   fs.writeFile("data.json", JSON.stringify(data[0]), () => {
  //     console.log("ok");
  //   });
  //   const data = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll(".increase-row "), (e) => ({
  //       html: e.querySelector("td").innerText,
  //       stats: e.querySelector(".text-right")?.innerHTML,
  //     }))
  //   );

  // const data = await page.evaluate(() =>
  //   Array.slice(1, 10).from(document.querySelectorAll("table"), (e) => ({
  //     html: e.querySelector("tbody")?.innerText,
  //   }))
  // );

  // const data = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("tbody tr"), (e) => ({
  //     const rows= e.querySelectorAll("td")?.innerText,
  //   }))
  // );
};

function convertToarray() {
  fetch("./data.json")
    .then((v) => v.json())
    .then((va) => console.log(va));
}

// convertToarray();
// scrap();
