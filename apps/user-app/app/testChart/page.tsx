"use client";
import { TextInput } from "@repo/ui/textInput";
export default function Test() {
  return (
    <div>
      <TextInput
        placeholder="check"
        onChange={() => {
          console.log("hi");
        }}
        label="check1"
      ></TextInput>
    </div>
  );
}
