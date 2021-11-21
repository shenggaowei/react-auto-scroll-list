import React, { useState, useRef, useEffect } from "react";
import { useInterval, useSize } from "ahooks";
import classnames from "classnames";
import type { IReactAutoScrollList } from "./interface";

function ReactAutoScrollList<Item>(props: IReactAutoScrollList<Item>) {
  const {
    data,
    timeInterval = 1000,
    renderItem,
    keyExtractor,
    className,
  } = props;
  const [activeItemIndex, setActiveItemIndex] = React.useState<number>(0);
  const [interval, setInterval] = useState<number | null>(timeInterval);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  const containerClassName = classnames(className);

  useInterval(() => {
    if (activeItemIndex === data.length - 1) {
      setActiveItemIndex(0);
      containerRef.current?.scrollTo({
        left: 0,
        top: 0,
      });
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  }, interval);

  const handleClickItem = (item: Item, index: number) => {
    setInterval(null);
    setActiveItemIndex(index);
  };

  useEffect(() => {
    if (interval === null) {
      setInterval(timeInterval);
    }
  }, [interval]);

  // 判断是否到底
  useEffect(() => {
    const currentDom = containerRef.current?.children[
      activeItemIndex
    ] as HTMLElement;
    if (containerSize.height && currentDom.offsetHeight) {
      const itemCount = Math.floor(
        containerSize.height / currentDom.offsetHeight
      );
      const offsetTop = currentDom?.offsetTop;
      const scrollTop = containerRef.current?.scrollTop || 0;
      const lastChildToTop = containerSize.height - currentDom.offsetHeight;
      if (offsetTop - scrollTop >= lastChildToTop) {
        containerRef.current?.scrollTo({
          left: 0,
          top:
            scrollTop +
            (offsetTop - scrollTop) -
            Math.floor(itemCount / 2) * currentDom.offsetHeight,
        });
      }
    }
  }, [activeItemIndex]);

  return (
    <div className={containerClassName} ref={containerRef}>
      {data.map((ele, index) => {
        const isActive = activeItemIndex === index;
        const listNode = renderItem(ele, index, isActive);
        const key = keyExtractor(ele, index) || index;
        return (
          <div onClick={() => handleClickItem(ele, index)} key={key}>
            {listNode}
          </div>
        );
      })}
    </div>
  );
}

export default ReactAutoScrollList;
