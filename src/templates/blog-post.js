import React from "react";
import { graphql } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;

  const postCategory = post.frontmatter.category;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt}/>

      <article className="markdown-body">
        <header className="post-header">
          <span className="post-category">{postCategory}</span>
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <p className="post-date"><span role="img" aria-label="calendar icon">📅</span> {post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }}/>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title,
        date(formatString: "MMMM DD, YYYY"),
        category
      }
    }
  }
`;
