import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import ListGroup from "react-bootstrap/ListGroup";

// Home page
const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Dashboard"/>

      <div>
        <h1>Latest <Link className="link-view-all" to="/posts/">View All</Link></h1>
        <ListGroup variant="flush">
          {posts.map(({ node }) => {
            const postSlug = node.fields.slug;
            const postDate = node.frontmatter.date;
            const postTitle = node.frontmatter.title;
            return (
              <ListGroup.Item action key={postSlug}
                              as={Link} to={postSlug}>
                <div>
                  <strong className="m-0">{postTitle}</strong>
                </div>
                <div>
                  <small className="m-0">{postDate}</small>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 5, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
