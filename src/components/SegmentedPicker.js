import React from "react";
import styled from "styled-components";
import { SPACE } from "../utlis/constants";

const DivPicker = styled.div`
  position: relative;
  align-items: center;
  height: 100%;
  margin-bottom: 0.5em;
  padding: 2px;
  border-radius: 7px;
  background-color: rgb(238, 238, 239);
  overflow: hidden;
`;

const DivSeparator = styled.div`
  display: inline-block;
  opacity: ${props => props.opacity};
  transition: opacity 0.2s ease-in-out;
  background-color: rgb(212, 212, 215);
  width: 1px;
  height: 1em;
`;

const DivOption = styled.div`
  display: inline-block;
  text-align: center;
  flex-grow: 1;
  padding: 2px 20px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
`;

// options is a list of string
const SegmentedPicker = ({ options, selection, onSelectionChange }) => {

  const componentOptions = options.map((each, index) => {
    // don't show if
    // if index is 0
    // if current or previous index is selected
    const showSeparator = !(index === selection || (index - 1) === selection);

    const opacity = showSeparator ? 1 : 0;

    return (
      <>
        {index !== 0 && <DivSeparator opacity={opacity}>{SPACE}</DivSeparator>}

        <DivOption key={index}
                   className={"picker-option" + SPACE +
                   ((index === selection) ? "selected-option" : "")}
                   onClick={() => {
                     onSelectionChange(index);
                   }}
        >{each}</DivOption>
      </>
    );
  });

  return (
    <DivPicker className={"segment-picker"}>
      {componentOptions}
    </DivPicker>
  );
};

export default SegmentedPicker;
