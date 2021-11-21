import React from "react";

export interface IReactAutoScrollList<T = unknown> {
  data: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  timeInterval?: number;
  className?: string;
}
