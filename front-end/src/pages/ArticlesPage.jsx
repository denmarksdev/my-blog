import React from "react";
import { useParams } from "react-router-dom";
import articleContent from "../data/article-content";
import ArticlesList from "../components/ArticlesList";

export const ArticlePage = () => {
  const { name } = useParams();
  const currentArticle = articleContent.find((article) => article.name === name);

  if (!currentArticle) return <h1>Article does note exist!</h1>

  const otherArticles = articleContent.filter(article => article.name !== currentArticle.name )

  return (
    <>
      <h1>{currentArticle.title}</h1>
      {currentArticle.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <h3>Other articles</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
