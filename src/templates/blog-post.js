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
        <header>
          <p><span className="post-category">{postCategory}</span> {post.frontmatter.date}</p>
          <h1 className="post-title">{post.frontmatter.title}</h1>
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
