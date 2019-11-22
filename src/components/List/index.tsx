import React, { ComponentType, memo, ReactNode } from "react";
import ListRows, { Props as ListRowsProps } from "../ListRows";
import Empty, { Props as EmptyProps } from "../Empty";

export interface Props<T, U = T, V extends EmptyProps = EmptyProps>
  extends ListRowsProps<T, U> {
  className?: string;
  EmptyComponent?: ComponentType<V>;
  EmptyProps?: V;
  hasEmpty?: boolean;
  firstChild?: ReactNode;
  lastChild?: ReactNode;
}

function BList<T, U = T, V extends EmptyProps = EmptyProps>({
  className,
  EmptyComponent = Empty,
  EmptyProps,
  hasEmpty = true,
  firstChild,
  lastChild,
  rows,
  ...other
}: Props<T, U, V>) {
  return (
    <div className={className}>
      {firstChild}
      <ListRows rows={rows} {...other} />
      {hasEmpty && rows.length === 0 && (
        <EmptyComponent {...(EmptyProps as V)} />
      )}
      {lastChild}
    </div>
  );
}

const OList = memo(BList);

export default function List<T, U = T, V extends EmptyProps = EmptyProps>(
  props: Props<T, U, V>
) {
  return <OList {...props} />;
}
