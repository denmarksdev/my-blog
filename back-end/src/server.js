import expresss from "express";
import bodyParser from "body-parser";
import ClientDb from "./util/MongoClientDb";

const app = expresss();
app.use(bodyParser.json());

app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name: articleName } = req.params;
  const db = await ClientDb("my-blog");

  const articleInfo = await db
    .collection("articles")
    .findOne({ name: articleName });

  if (articleInfo === null) return res.status(202);

  await db.collection("articles").updateOne(
    { name: articleName },
    {
      $set: {
        upvotes: ++articleInfo.upvotes,
      },
    }
  );

  res.status(200).json(articleInfo);
});

app.get("/api/articles/:name", async (req, res) => {
  try {
    const { name: articleName } = req.params;

    const db = await ClientDb("my-blog");

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    if (articleInfo === null) return res.sendStatus(404);
    res.status(200).json(articleInfo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  const article = articlesInfo[articleName];

  article.comments.push({ username, text });

  res.status(200).json(article);
});

app.listen(8000, () => {
  console.log("Listening on port 8000 ");
});
