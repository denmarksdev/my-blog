import expresss from "express";
import bodyParser from "body-parser";

const app = expresss();

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

app.use(bodyParser.json());

app.get("/api/articles/votes", (req, res) => {
  res.status(200).json(articlesInfo);
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
