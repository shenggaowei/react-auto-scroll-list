import classnames from "classnames";
import ReactAutoScrollList from "./list";
import mockData from "./mockData";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.app}>
      <ReactAutoScrollList<{ label: string; value: number }>
        className={styles.container}
        renderItem={(item, index, active) => {
          const classNames = classnames(
            styles.listItem,
            active ? styles.active : styles.normal
          );
          return <div className={classNames}>{item.label}</div>;
        }}
        keyExtractor={(item, index) => `${index}`}
        data={mockData}
        timeInterval={1000}
      />
    </div>
  );
}

export default App;
