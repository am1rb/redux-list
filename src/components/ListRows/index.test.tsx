import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
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
  rowKey: (row) => row.person.code,
};

const originalError = console.error;
afterEach(() => (console.error = originalError));

describe("The ListRows component tests", () => {
  it("Should throw an Error if the rowKey returns invalid key", () => {
    console.error = jest.fn();
    try {
      render(<ListRows {...sharedProps} rowKey={row => row['invalid.key']} />);
    } catch (e) {
      expect(e.message).toBe("The rowKey returns undefined value as key");
    }
  });

  it("Should throw an Error if rowKey props does not return a number or string", () => {
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
            rows={[{...sharedProps.rows[0], id: record.key}]}
            rowKey={row => row.id as React.Key}
          />
        );
      } catch (e) {
        hasError =
          e.message === "The rowKey must returns an string or number";
      }

      expect(hasError).toBe(record.error);
    });
  });

  it("Should render rows correctly", () => {
    const { queryByText } = render(<ListRows {...sharedProps} />);
    expect(queryByText("11 - Sara Doe")).toBeInTheDocument();
    expect(queryByText("12 - John Doe")).toBeInTheDocument();
  });
});
