import React, { memo, ComponentType, Key } from "react";
import dot from "dot-object";

export interface Props<T, U = T> {
  rows: T[];
  RowComponent: ComponentType<U>;
  RowProps?: (row: T) => U;
  dataKey?: string;
}

function BListRows<T, U = T>({
  rows,
  RowComponent,
  RowProps,
  dataKey = "id"
}: Props<T, U>) {
  return (
    <>
      {rows.map(row => {
        const key = dot.pick(dataKey, row);

        if (typeof key !== "string" && typeof key !== "number") {
          throw new Error("The dataKey does not exist");
        }

        const rowProps = RowProps ? RowProps(row) : row;
        return (
          <RowComponent
            key={(key as unknown) as Key}
            {...(rowProps as U)}
          />
        );
      })}
    </>
  );
}

const OListRows = memo(BListRows);
export default function ListRows<T, U = T>(props: Props<T, U>) {
  return <OListRows {...props} />;
}
