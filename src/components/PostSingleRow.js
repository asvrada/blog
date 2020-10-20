import React from "react";
import PostCategory from "./PostCategory";

const PostSingleRow = ({ frontmatter }) => {

  return (
    <>
      {/* show after sm */}
      <div className="row d-none d-sm-flex align-items-center">
        <small className="p-0 index-post-date">
          {frontmatter.date}
        </small>

        <PostCategory className="p-0 index-post-category"
                      category={frontmatter.category}/>

        <strong className="col">{frontmatter.title}</strong>
      </div>

      {/* show on sm */}
      <div className="row d-sm-none">
        <div className="col">
          <div className="row align-items-center">
            <strong className="">{frontmatter.title}</strong>
          </div>

          <div className="row mt-1 align-items-center">
            <PostCategory className="p-0 mr-1 index-post-category"
                          category={frontmatter.category}/>

            <small className="p-0 index-post-date">
              {frontmatter.date}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostSingleRow;