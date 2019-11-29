import React, { ComponentType, memo, ReactNode, ElementType } from "react";
import ListRows, { Props as ListRowsProps } from "../ListRows";
import Empty, { Props as EmptyComponentProps } from "../Empty";

export interface Props<
  DataProps,
  RowProps = DataProps,
  EmptyProps extends EmptyComponentProps = EmptyComponentProps
> extends ListRowsProps<DataProps, RowProps> {
  className?: string;
  Container?:
    | ComponentType<{ className?: string; children: ReactNode }>
    | ElementType;
  EmptyComponent?: ComponentType<EmptyProps>;
  EmptyProps?: EmptyProps;
  hasEmpty?: boolean;
  firstChild?: ReactNode;
  lastChild?: ReactNode;
}

function BList<
  DataProps,
  RowProps = DataProps,
  EmptyProps extends EmptyComponentProps = EmptyComponentProps
>({
  className,
  Container = "div",
  EmptyComponent = Empty,
  EmptyProps,
  hasEmpty = true,
  firstChild,
  lastChild,
  rows,
  ...other
}: Props<DataProps, RowProps, EmptyProps>) {
  return (
    <Container data-testid="root" className={className}>
      {firstChild}
      <ListRows rows={rows} {...other} />
      {hasEmpty && rows.length === 0 && (
        <EmptyComponent
          data-testid="empty-component"
          {...(EmptyProps as EmptyProps)}
        />
      )}
      {lastChild}
    </Container>
  );
}

const OList = memo(BList);

export default function List<
  DataProps,
  RowProps = DataProps,
  EmptyProps extends EmptyComponentProps = EmptyComponentProps
>(props: Props<DataProps, RowProps, EmptyProps>) {
  return <OList {...props} />;
}
