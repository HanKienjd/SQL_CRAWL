const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto(
    "https://www.vietlod.com/342-cau-trac-nghiem-kinh-te-vi-mo-p1",
	{ waitUntil: "networkidle2"}
  );
  // await page.type('input[type="text"]', process.env.USER_NAME);
  // await page.type('input[type="password"]', process.env.PASSWORD);
  // // click and wait for navigation
  // await Promise.all([
  //   page.click("button.signin-btn "),
  //   page.waitForNavigation(
  //     "https://tracnghiem.net/cntt/on-tap/500-cau-hoi-trac-nghiem-quan-tri-co-so-du-lieu-73.html?part=1",
  //     { waitUntil: "networkidle0" }
  //   ),
  // ]);

  const examSQL = await page.evaluate(() => {
    let getExam = document.querySelectorAll("div.entry-content");
    getExam = [...getExam];
    let articles = getExam.map((link) => ({
      Cau: link.querySelector("p").innerHTML,
      question: Array.from(link.querySelectorAll("p > br")).map(
        (item) => item.innerHTML
      ),
      answer: "",
    }));
    return articles;
  });

  const jsonString = JSON.stringify(examSQL);
  fs.writeFileSync("./data/phan1.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  await browser.close();
})();
