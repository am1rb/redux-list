import React, { memo, ComponentType, Key } from "react";

export interface Props<DataProps, RowProps = DataProps> {
  rows: DataProps[];
  RowComponent: ComponentType<RowProps>;
  RowProps?: Partial<RowProps> | ((row: DataProps) => RowProps);
  rowKey: (row: DataProps) => Key;
}

function BListRows<DataProps, RowProps = DataProps>({
  rows,
  RowComponent,
  RowProps,
  rowKey,
}: Props<DataProps, RowProps>) {
  return (
    <>
      {rows.map(row => {
        const key = rowKey(row);
        
        if (key === undefined) {
          throw new Error("The rowKey returns undefined value as key");
        } else if (typeof key !== "string" && typeof key !== "number") {
          throw new Error(
            "The rowKey must returns an string or number"
          );
        }

        const rowProps = RowProps ? ( typeof RowProps==="function" ? RowProps(row) : {...row, ...RowProps}) : row;

        return (
          <RowComponent {...(rowProps as RowProps)} key={key} />
        );
      })}
    </>
  );
}

const OListRows = memo(BListRows);
export default function ListRows<DataProps, RowProps = DataProps>(
  props: Props<DataProps, RowProps>
) {
  return <OListRows {...props} />;
}
