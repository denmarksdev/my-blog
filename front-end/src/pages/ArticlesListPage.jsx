import React from "react";
import articleContent from "../data/article-content";
import ArticlesList from "../components/ArticlesList";

export const ArticlesListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articleContent} />
    </>
  );
};

export default ArticlesListPage;
