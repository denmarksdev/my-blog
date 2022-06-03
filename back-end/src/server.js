import expresss from "express";
import bodyParser from "body-parser";
import { withDB } from "./util/MongoClientDb";

const app = expresss();
app.use(bodyParser.json());

app.post(
  "/api/articles/:name/upvote",
  async (req, res) => {
    withDB(async (db) => {
      const { name: articleName } = req.params;

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
  },
  () => res.sendStatus(500)
);

app.get("/api/articles/:name", async (req, res) => {
  withDB(
    async (db) => {
      const { name: articleName } = req.params;

      const articleInfo = await db
        .collection("articles")
        .findOne({ name: articleName });

      if (articleInfo === null) return res.sendStatus(404);
      res.status(200).json(articleInfo);
    },
    () => res.sendStatus(500)
  );
});

app.post(
  "/api/articles/:name/add-comment",
  (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    const article = articlesInfo[articleName];

    article.comments.push({ username, text });

    res.status(200).json(article);
  },
  () => res.sendStatus(500)
);

app.listen(8000, () => {
  console.log("Listening on port 8000 ");
});
