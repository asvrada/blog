import React from "react";
import styled from "styled-components";
import { SPACE } from "../utlis/constants";

const StyledSpan = styled.span`
  background-color: ${props => props.backgroundColor}
`;

const PostCategory = ({ className, category }) => {

  const categoryUpper = category.toUpperCase();

  const colorTable = {
    "CODE": "#7ed8e8",
    "NOTE": "#ffe300",
    "LIFE": "#57e357",
    "LEETCODE": "#7ed8e8"
  };

  return (
    <StyledSpan backgroundColor={colorTable[categoryUpper]}
                className={"post-category" + SPACE + className}>
      {category}
    </StyledSpan>
  );
};

export default PostCategory;