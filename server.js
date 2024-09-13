const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const PORT = 9009;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Middleware to parse JSON request bodies
app.use(express.json());

let watchedVideos = new Set();

async function getVideoLinks(channelUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(channelUrl, { waitUntil: "networkidle2" });

  const videoLinks = await page.evaluate(() => {
    const links = [];
    document.querySelectorAll('a[href*="/watch?v="]').forEach((a) => {
      links.push(a.href);
    });
    return links;
  });

  await browser.close();
  return videoLinks;
}

app.post("/scrape", async (req, res) => {
  const { channelUrl } = req.body;

  try {
    const videoLinks = await getVideoLinks(channelUrl);

    // Remove watched videos from the list
    const availableLinks = videoLinks.filter(
      (link) => !watchedVideos.has(link)
    );

    if (availableLinks.length === 0) {
      res.json({ links: [] });
    } else {
      res.json({ links: availableLinks });
    }
  } catch (error) {
    console.error(`Failed to retrieve or parse page: ${error}`);
    res.status(500).json({ error: "Failed to retrieve video links." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
