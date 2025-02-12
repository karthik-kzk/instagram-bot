const  snoowrap = require("snoowrap");

 async function scrapeSubreddit() {
  const r = new snoowrap({
    userAgent: "nodejs",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  });

  const subreddit = await r.getSubreddit("funnymemes");
  const topPosts = await subreddit.getTop({ time: "day", limit: 5 });

  let data = [];

  topPosts.forEach((post) => {
    !post.is_video &&
      data.push({
        link: post.url,
        text: post.title,
        score: post.score,
      });
  });
return data;
  // console.log(data);
}

module.exports = {scrapeSubreddit};
