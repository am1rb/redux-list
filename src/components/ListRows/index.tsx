import React, { memo, ComponentType, Key } from 'react';

export interface Props<T, U = T> {
  rows: T[];
  RowComponent: ComponentType<U>;
  RowProps?: (row: T) => U;
  dataKey?: string;
}

function BListRows<T, U = T>({ rows, RowComponent, RowProps, dataKey = 'id' }: Props<T, U>) {
  return (
    <>
      {rows.map(row => {
        // const key = dot.pick(dataKey, row); // dot-object
        const key = row[dataKey];

        if(typeof key!=="string" && typeof key!=="number") {
          throw new Error('Invalid row key');
        }

        const rowProps = RowProps ? RowProps(row) : row;
        return <RowComponent key={row[dataKey] as unknown as Key} {...rowProps as U} />
      })}
    </>
  );
}

const OListRows = memo(BListRows);
export default function ListRows<T, U = T>(props: Props<T, U>) {
  return <OListRows {...props} />
}
