import React, { memo, ComponentType, Key } from "react";
import dot from "dot-object";

export interface Props<DataProps, RowProps = DataProps> {
  rows: DataProps[];
  RowComponent: ComponentType<RowProps>;
  RowProps?: (row: DataProps) => RowProps;
  dataKey?: string;
}

function BListRows<DataProps, RowProps = DataProps>({
  rows,
  RowComponent,
  RowProps,
  dataKey = "id"
}: Props<DataProps, RowProps>) {
  return (
    <>
      {rows.map(row => {
        const rowProps = RowProps ? RowProps(row) : row;
        const key = dot.pick(dataKey, rowProps);

        if (key === undefined) {
          throw new Error("The `" + dataKey + "` property does not exist");
        } else if (typeof key !== "string" && typeof key !== "number") {
          throw new Error(
            "The type of `" + dataKey + "` property must be string or number"
          );
        }

        return (
          <RowComponent key={(key as unknown) as Key} {...(rowProps as RowProps)} />
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
