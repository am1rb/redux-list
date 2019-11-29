import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import List, { Props as ListProps } from "./index";

interface TestRowProps {
  id: number;
  label: string;
}

function TestRow({ id, label }: TestRowProps) {
  return (
    <div>
      {id} - {label}
    </div>
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

  test("It should render firstChild and lastChild at correct positions", () => {
    const firstChild = <span data-testid="first-child" />;
    const lastChild = <span data-testid="last-child" />;
    const { getByTestId } = render(
      <List {...sharedProps} firstChild={firstChild} lastChild={lastChild} />
    );
    expect(getByTestId("root").firstChild).toBe(getByTestId("first-child"));
    expect(getByTestId("root").lastChild).toBe(getByTestId("last-child"));
  });

  test("It should render custom container", () => {
    function CustomContainer({ children }: { children: ReactNode }) {
      return (
        <section data-testid="custom-root">
          {children}
        </section>
      );
    }
    const { getByTestId } = render(
      <List {...sharedProps} Container={CustomContainer} />
    );

    expect(getByTestId("custom-root")).toBeInTheDocument();
  });
});
