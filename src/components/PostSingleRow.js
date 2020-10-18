import React from "react";
import PostCategory from "./PostCategory";

const PostSingleRow = ({ frontmatter }) => {

  return (
    <div className="row">
      <small className="col-2 p-0 index-post-date">{frontmatter.date}</small>

      <PostCategory className="p-0 index-post-category"
                    category={frontmatter.category}/>

      <strong className="col">{frontmatter.title}</strong>
    </div>
  );
};

export default PostSingleRow;