import React, {
  useState,
  useRef,
  RefObject,
  useCallback,
  useEffect,
} from "react";
import { useInterval, useSize } from "ahooks";
import classnames from "classnames";
import mockData from "./mockData";
import styles from "./index.module.less";

const ReactAutoScrollList: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = React.useState<number>(0);
  const [interval, setInterval] = useState<number>(1000);
  const containerRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef(null);
  const containerSize = useSize(containerRef);
  const listItemSize = useSize(listItemRef);

  useInterval(() => {
    if (activeItemIndex === mockData.length - 1) {
      setActiveItemIndex(0);
    } else {
      setActiveItemIndex(activeItemIndex + 1);
    }
  }, interval);

  useEffect(() => {
    if (containerSize.height && listItemSize.height) {
      const count = Math.ceil(containerSize?.height / listItemSize?.height);
      if (activeItemIndex % (count - 1) === 0) {
        // containerRef.current?.scrollTop(3);
        console.log("我到底了");
      }
    }
  }, [containerSize, listItemSize, activeItemIndex]);
  return (
    <div className={styles.container} ref={containerRef}>
      {mockData.map((ele, index) => {
        const listClassName = classnames(styles.listItem, {
          [styles.active]: activeItemIndex === index,
        });
        return (
          <div className={listClassName} key={index} ref={listItemRef}>
            {ele.label}
          </div>
        );
      })}
    </div>
  );
};

export default ReactAutoScrollList;
