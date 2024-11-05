"use client";
import React from "react";
export const Select = ({
  option,
}: {
  option: {
    key: string;
    value: string;
  };
}) => {
  return (
    <select>
      <option value={option.key}>{option.value}</option>
    </select>
  );
};
