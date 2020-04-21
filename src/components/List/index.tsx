import React, { ComponentType, memo, ReactNode, ElementType } from "react";
import ListRows, { Props as ListRowsProps } from "../ListRows";
import Empty, { Props as BaseEmptyProps } from "../Empty";

export interface Props<
  DataProps,
  RowProps = DataProps,
> extends ListRowsProps<DataProps, RowProps> {
  className?: string;
  Container?: ElementType<{ className?: string; children: ReactNode }>;
  EmptyComponent?: ComponentType<BaseEmptyProps>;
  hasEmpty?: boolean;
  firstChild?: ReactNode;
  lastChild?: ReactNode;
}

function BList<
  DataProps,
  RowProps = DataProps,
>({
  className,
  Container = "div",
  EmptyComponent = Empty,
  hasEmpty = true,
  firstChild,
  lastChild,
  rows,
  ...other
}: Props<DataProps, RowProps>) {
  return (
    <Container data-testid="root" className={className}>
      {firstChild}
      <ListRows rows={rows} {...other} />
      {hasEmpty && rows.length === 0 && (
        <EmptyComponent data-testid="empty-component" />
      )}
      {lastChild}
    </Container>
  );
}

const OList = memo(BList);

export default function List<
  DataProps,
  RowProps = DataProps,
>(props: Props<DataProps, RowProps>) {
  return <OList {...props} />;
}
