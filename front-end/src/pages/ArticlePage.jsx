import "whatwg-fetch";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articleContent from "../data/article-content";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";

export const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  const { name } = useParams();
  const currentArticle = articleContent.find(
    (article) => article.name === name
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };

    fetchData();
  }, [name]);

  if (!currentArticle) return <NotFoundPage />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== currentArticle.name
  );

  return (
    <>
      <h1>{currentArticle.title}</h1>
      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />
      {currentArticle.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other articles</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
