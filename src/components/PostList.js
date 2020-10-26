import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "gatsby";

import PostSingleRow from "./PostSingleRow";

const PostList = ({ posts }) => {
  return (
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
  );
};

export default PostList;
