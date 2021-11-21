import React, { useState, useRef, useEffect } from "react";
import { useInterval, useSize } from "ahooks";
import classnames from "classnames";
import mockData from "./mockData";
import styles from "./index.module.less";

const ReactAutoScrollList: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = React.useState<number>(0);
  const [interval, setInterval] = useState<number>(1000);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  useInterval(() => {
    if (activeItemIndex === mockData.length - 1) {
      setActiveItemIndex(0);
      containerRef.current?.scrollTo({
        left: 0,
        top: 0,
      });
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  }, interval);

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
    <div className={styles.container} ref={containerRef}>
      {mockData.map((ele, index) => {
        const listClassName = classnames(styles.listItem, {
          [styles.active]: activeItemIndex === index,
        });
        return (
          <div className={listClassName} key={index}>
            {ele.label}
          </div>
        );
      })}
    </div>
  );
};

export default ReactAutoScrollList;
