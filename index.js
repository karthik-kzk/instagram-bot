require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");
const CronJob = require("cron").CronJob;
const { scrapeSubreddit } = require("./scrap");
// import scrapeSubreddit from "./scrap";

const postToInsta = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  // const imageBuffer = await get({
  //   url: "https://i.imgur.com/HtDqq57.jpeg",
  //   encoding: null,
  // });

  let imageArray = await scrapeSubreddit();
  for (let i = 0; i < imageArray.length; i++) {
    const imageBuffer = await get({
      url: `${imageArray[i].link}`,
      encoding: null,
    });

    setTimeout(async () => {
      await ig.publish.photo({
        file: imageBuffer,
        caption: `${imageArray[i].text}`,
      });
      // 30 second timer.
    }, 30000);
    // await ig.publish.photo({
    //     file: imageBuffer,
    //     caption: 'Really nice photo from the internet!',
    // });
  }
};
// const cronInsta = new CronJob("30 5 * * *", async () => {
postToInsta();
// });

// cronInsta.start();
