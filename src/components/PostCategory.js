import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import { SPACE } from "../utlis/constants";

function buildColorTable(postCategory) {
  let colorTable = {};

  for (let idx in postCategory) {
    const category = postCategory[idx];
    colorTable[category["name"].toUpperCase()] = category["color"];
  }

  return colorTable;
}

const StyledSpan = styled.span`
  background-color: ${props => props.backgroundColor}
`;

const PostCategory = ({ className, category }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            postCategory {
              name,
              color
            }
          }
        }
      }
    `
  );

  const colorTable = buildColorTable(data.site.siteMetadata.postCategory);

  const categoryUpper = category.toUpperCase();

  return (
    <StyledSpan backgroundColor={colorTable[categoryUpper]}
                className={"post-category" + SPACE + className}>
      {category}
    </StyledSpan>
  );
};

export default PostCategory;