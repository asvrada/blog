import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  // post node
  // previous: 更老的文章
  // next: 更新的文章
  // todo:
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt}/>

      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }}/>
      </article>

      {/*<nav>*/}
      {/*  <div>*/}
      {/*    {previous && (*/}
      {/*      <div>*/}
      {/*        <span>上一篇</span>*/}
      {/*        <Link to={previous.fields.slug} rel="prev">*/}
      {/*          {previous.frontmatter.title}*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    {next && (*/}
      {/*      <div>*/}
      {/*        <span>下一篇</span>*/}
      {/*        <Link to={next.fields.slug} rel="next">*/}
      {/*          {next.frontmatter.title}*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</nav>*/}
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
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
