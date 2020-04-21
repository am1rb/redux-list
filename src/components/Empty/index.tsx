import React, { memo } from "react";

export interface Props {
  className?: string;
}

function Empty({ className, ...other }: Props) {
  return <div className={className} { ...other}>No data is listed here</div>;
}

export default memo(Empty);
