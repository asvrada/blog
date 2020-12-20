import React, { useState } from "react";
import styled from "styled-components";
import { graphql, withPrefix } from "gatsby";
import * as queryString from "query-string";
import SegmentedPicker from "react-segmented-picker";

import Layout from "../layout";
import SEO from "../components/seo";
import PostList from "../components/PostList";

const INVERSE_SELECTION_TO_TYPE = {
  0: "all",
  1: "code",
  2: "note",
  3: "life"
};

const SELECTION_TO_TYPE = {
  "all": 0,
  "code": 1,
  "note": 2,
  "life": 3
};

const InlineH1 = styled.h1`
    display: inline-block;
    margin-right: 0.5em;
`;

// Shows all posts
const Posts = ({ data, location, navigate }) => {
  const { filter } = queryString.parse(location.search);
  const initialSelection = SELECTION_TO_TYPE[filter] || 0;
  const [selection, setSelection] = useState(initialSelection);

  const postsAll = data.allPosts.edges;
  const postsCode = data.categoryCode.edges;
  const postsNote = data.categoryNote.edges;
  const postsLife = data.categoryLife.edges;

  const selectedPosts = [postsAll, postsCode, postsNote, postsLife];

  return (
    <Layout>
      <SEO title="All Posts"/>

      <div>
        <InlineH1>All Posts</InlineH1>
        <SegmentedPicker className={"posts-category-picker"}
                         options={["All", "Code", "Note", "Life"]}
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
    }
  }
`;
