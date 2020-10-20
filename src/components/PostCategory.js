import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  background-color: ${props => props.backgroundColor}
`;

const PostCategory = ({ className, category }) => {

  const categoryUpper = category.toUpperCase();

  const colorTable = {
    "CODE": "#7ed8e8",
    "NOTE": "#ffff0045",
    "LIFE": "#57e357"
  };

  return (
    <StyledSpan backgroundColor={colorTable[categoryUpper]}
                className={"post-category" + " " + className}>
      {category}
    </StyledSpan>
  );
};

export default PostCategory;