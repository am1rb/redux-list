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
        const rowProps = RowProps ? RowProps(row) : row;
        const key = dot.pick(dataKey, rowProps);

        if(key===undefined) {
          throw new Error("The `"+ dataKey +"` property does not exist");
        } else if (typeof key !== "string" && typeof key !== "number") {
          throw new Error("The type of `"+ dataKey +"` property must be string or number");
        }
        
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
