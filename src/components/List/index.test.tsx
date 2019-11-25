import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import List, { Props as ListProps } from "./index";

interface TestRowProps {
  id: number;
  label: string;
}

function TestRow({ id, label }: TestRowProps) {
  return (
    <>
      {id} - {label}
    </>
  );
}

interface TestEmptyProps {
  className?: string;
  message: string;
}

function TestEmpty({ message }: TestEmptyProps) {
  return (
    <>
      <span>custom message:</span> {message}
    </>
  );
}

const sharedProps: ListProps<TestRowProps, TestRowProps> = {
  RowComponent: TestRow,
  rows: [
    { id: 10, label: "A" },
    { id: 11, label: "B" },
    { id: 12, label: "C" }
  ]
};

describe("The List component tests", () => {
  test("It should render custom EmptyComponent and message", () => {
    const { queryByText } = render(
      <List<TestRowProps, TestRowProps, TestEmptyProps>
        {...sharedProps}
        rows={[]}
        EmptyComponent={TestEmpty}
        EmptyProps={{ message: "No Data" }}
      />
    );
    expect(queryByText("custom message:")).toBeInTheDocument();
  });

  test("It should not render EmptyComponent if hasEmpty is false", () => {
    const { queryByTestId } = render(
      <List {...sharedProps} rows={[]} hasEmpty={false} />
    );
    expect(queryByTestId("empty-component")).toBeNull();
  });
});
