import React, { memo } from "react";

export interface Props {
  className?: string;
}

function Empty({ className }: Props) {
  return <div className={className}>There is no data</div>;
}

export default memo(Empty);
