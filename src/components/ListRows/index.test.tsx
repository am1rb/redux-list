import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import ListRows, { Props as ListRowsProps } from "./index";

interface TestRowProps {
  person: { code: number };
  name: string;
  family: string;
  id: unknown;
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
    { person: { code: 11 }, name: "Sara", family: "Doe", id: 11 },
    { person: { code: 12 }, name: "John", family: "Doe", id: 12 }
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
      expect(e.message).toBe("The `invalid.key` property does not exist");
    }
  });

  test("It should throw an Error if the type of dataKey property is not number or string", () => {
    const keys = [
      { key: 11, error: false },
      { key: "11", error: false },
      { key: true, error: true },
      { key: () => {}, error: true },
      { key: new Date(), error: true },
      { key: { test: { a: "b" } }, error: true }
    ];

    console.error = jest.fn();

    keys.forEach(record => {
      let hasError = false;
      try {
        render(
          <ListRows
            {...sharedProps}
            RowProps={row => ({ ...row, id: record.key })}
            dataKey="id"
          />
        );
      } catch (e) {
        hasError =
          e.message === "The type of `id` property must be string or number";
      }

      expect(hasError).toBe(record.error);
    });
  });

  test("It should render rows correctly", () => {
    const { queryByText } = render(<ListRows {...sharedProps} />);
    expect(queryByText("11 - Sara Doe")).toBeInTheDocument();
    expect(queryByText("12 - John Doe")).toBeInTheDocument();
  });
});
