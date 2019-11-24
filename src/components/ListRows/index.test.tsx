import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import ListRows, { Props as ListRowsProps } from "./index";

interface TestRowProps {
  person: { code: number };
  name: string;
  family: string;
}

function TestRow({ person: { code }, name, family }: TestRowProps) {
  return (
    <div>
      {code} - {name} {family}
    </div>
  );
}

const sharedProps: ListRowsProps<TestRowProps> = {
  RowComponent: TestRow,
  rows: [
    { person: { code: 11 }, name: "Sara", family: "Doe" },
    { person: { code: 12 }, name: "John", family: "Doe" }
  ],
  dataKey: "person.code"
};

const originalError = console.error;
afterEach(() => (console.error = originalError));

describe("The ListRows component tests", () => {
  test("It should throw an Error if the dataKey does not exist", () => {
    console.error = jest.fn();
    try {
      render(<ListRows {...sharedProps} dataKey="invalid.key" />);
    } catch (e) {
      expect(e.message).toBe("The dataKey does not exist");
    }
  });

  test("It should render rows correctly", () => {
    const { queryByText } = render(<ListRows {...sharedProps} />);
    expect(queryByText("11 - Sara Doe")).toBeInTheDocument();
    expect(queryByText("12 - John Doe")).toBeInTheDocument();
  });
});
