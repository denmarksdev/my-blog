import expresss from "express";
import bodyParser from "body-parser";
import { withDB } from "./util/MongoClientDb";
import path from "path";

const app = expresss();

app.use(expresss.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

app.post(
  "/api/articles/:name/upvote",
  async (req, res) => {
    withDB(async (db) => {
      const { name: articleName } = req.params;

      const articleInfo = await db
        .collection("articles")
        .findOne({ name: articleName });

      if (articleInfo === null) return res.status(400);

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

      if (articleInfo === null) return res.sendStatus(400);
      res.status(200).json(articleInfo);
    },
    () => res.sendStatus(500)
  );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  withDB(async (db) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    const articlesInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    if (articlesInfo === null) return res.sendStatus(400);

    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articlesInfo.comments.concat({ username, text }),
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => {
  console.log("Listening on port 8000 ");
});
