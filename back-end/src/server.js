import expresss from "express";
import bodyParser from "body-parser";
import { MogoClient, MongoClient } from "mongodb";

const app = expresss();

app.use(bodyParser.json());

app.get("/api/articles/votes", (req, res) => {
  res.status(200).json(articlesInfo);
});

app.get("/api/articles/:name", async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const { name: articleName } = req.params;

    const db = client.db("my-blog");

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    client.close();

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
