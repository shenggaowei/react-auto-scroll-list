import ReactAutoScrollList from "./list";
import mockData from "./mockData";
import styles from "./App.module.less";

function App() {
  return (
    <div className="App">
      <ReactAutoScrollList<{ label: string; value: number }>
        className={styles.container}
        renderItem={(item, index, active) => {
          return (
            <div className={active ? styles.active : styles.listItem}>
              {item.label}
            </div>
          );
        }}
        keyExtractor={(item, index) => `${index}`}
        data={mockData}
        timeInterval={1000}
      />
    </div>
  );
}

export default App;
