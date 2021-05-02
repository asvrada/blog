import React, { useState } from "react";
import styled from "styled-components";
import { graphql, withPrefix } from "gatsby";
import * as queryString from "query-string";
import SegmentedPicker from "react-segmented-picker";

import Layout from "../layout";
import SEO from "../components/seo";
import PostList from "../components/PostList";

function buildSelectionToType(postCategory) {
  let INVERSE_SELECTION_TO_TYPE = {};
  let SELECTION_TO_TYPE = {};
  let TEXTS = [];

  for (let i = 0; i < postCategory.length; i++) {
    const category = postCategory[i];
    INVERSE_SELECTION_TO_TYPE[category.id] = category.name;
    SELECTION_TO_TYPE[category.name] = category.id;
    TEXTS.push(category.text);
  }

  return { INVERSE_SELECTION_TO_TYPE, SELECTION_TO_TYPE, TEXTS };
}

const InlineH1 = styled.h1`
  display: inline-block;
  margin-right: 0.5em;
`;

// Shows all posts
const Posts = ({ data, location, navigate }) => {
  const {
    INVERSE_SELECTION_TO_TYPE,
    SELECTION_TO_TYPE,
    TEXTS
  } = buildSelectionToType(
    data.categories.siteMetadata.postCategory);

  const [selection, setSelection] = useState(() => {
    const { filter } = queryString.parse(location.search);
    return SELECTION_TO_TYPE[filter] || 0;
  });

  const postsAll = data.allPosts.edges;
  const postsCode = data.categoryCode.edges;
  const postsNote = data.categoryNote.edges;
  const postsLife = data.categoryLife.edges;
  const postsLeetCode = data.categoryLeetCode.edges;

  const selectedPosts = [
    postsAll,
    postsCode,
    postsNote,
    postsLife,
    postsLeetCode];

  return (
    <Layout>
      <SEO title="All Posts"/>

      <div>
        <InlineH1>All Posts</InlineH1>
        <SegmentedPicker className={"posts-category-picker"}
                         options={TEXTS}
                         selection={selection}
                         onSelectionChange={(newSelection) => {
                           navigate(withPrefix(
                             `/posts/?filter=${INVERSE_SELECTION_TO_TYPE[newSelection]}`)
                           );
                           setSelection(newSelection);
                         }}
        />
        <PostList posts={selectedPosts[selection]}/>
      </div>
    </Layout>
  );
};

export default Posts;

export const pageQuery = graphql`
  query {
    categories: site {
      siteMetadata {
        postCategory {
          id,
          name,
          text
        }
      }
    },
    allPosts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
    },
    categoryCode: allMarkdownRemark(filter: {frontmatter: {category: {eq: "code"}}},
                                    sort: { fields: [frontmatter___date], order: DESC }) {
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
    },
    categoryNote: allMarkdownRemark(filter: {frontmatter: {category: {eq: "note"}}},
                                    sort: { fields: [frontmatter___date], order: DESC }) {
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
    },
    categoryLife: allMarkdownRemark(filter: {frontmatter: {category: {eq: "life"}}},
                                    sort: { fields: [frontmatter___date], order: DESC }) {
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
    },
    categoryLeetCode: allMarkdownRemark(filter: {frontmatter: {category: {eq: "leetcode"}}},
                                    sort: { fields: [frontmatter___date], order: DESC }) {
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
