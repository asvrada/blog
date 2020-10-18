import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";
import ListGroup from "react-bootstrap/ListGroup";
import PostSingleRow from "../components/PostSingleRow";

// Home page
const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Dashboard"/>

      <div>
        <h1>Latest <Link className="link-view-all" to="/posts/">View All</Link>
        </h1>
        <ListGroup variant="flush">
          {posts.map(({ node }) => {
            const postSlug = node.fields.slug;

            return (
              <ListGroup.Item action key={postSlug}
                              as={Link} to={postSlug}>
                <PostSingleRow frontmatter={node.frontmatter}/>
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
            title,
            category
          }
        }
      }
    }
  }
`;
