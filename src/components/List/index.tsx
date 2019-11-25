import React, { ComponentType, memo, ReactNode, ElementType } from "react";
import ListRows, { Props as ListRowsProps } from "../ListRows";
import Empty, { Props as EmptyProps } from "../Empty";

export interface Props<T, U = T, V extends EmptyProps = EmptyProps>
  extends ListRowsProps<T, U> {
  className?: string;
  ContainerComponent?: ComponentType<{ className?: string }> | ElementType;
  EmptyComponent?: ComponentType<V>;
  EmptyProps?: V;
  hasEmpty?: boolean;
  firstChild?: ReactNode;
  lastChild?: ReactNode;
}

function BList<T, U = T, V extends EmptyProps = EmptyProps>({
  className,
  ContainerComponent = 'div',
  EmptyComponent = Empty,
  EmptyProps,
  hasEmpty = true,
  firstChild,
  lastChild,
  rows,
  ...other
}: Props<T, U, V>) {
  return (
    <ContainerComponent className={className}>
      {firstChild}
      <ListRows rows={rows} {...other} />
      {hasEmpty && rows.length === 0 && (
        <EmptyComponent data-testid="empty-component" {...(EmptyProps as V)} />
      )}
      {lastChild}
    </ContainerComponent>
  );
}

const OList = memo(BList);

export default function List<T, U = T, V extends EmptyProps = EmptyProps>(
  props: Props<T, U, V>
) {
  return <OList {...props} />;
}
