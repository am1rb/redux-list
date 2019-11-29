import React, { memo } from "react";

export interface Props {
  className?: string;
}

function Empty({ className, ...other }: Props) {
  return <div className={className} { ...other}>There is no data</div>;
}

export default memo(Empty);
