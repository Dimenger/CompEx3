import styles from "./App.module.css";
import buttonList from "./assets/button_list.json";

export function App() {
  return (
    <>
      <div className={styles.container}>
        <h1>Калькулятор</h1>
        {/* Дисплей */}
        <div className={styles.display}>Дисплей</div>
        {/* Кнопки 0 - 9, Кнопки операторы*/}
        <div className={styles.buttonsContainer}>
          {buttonList.map((button) => (
            <button
              key={button.id}
              className={`${styles.button} ${
                button.class === "bigButton" && styles.bigButton
              }`}
            >
              {button.content}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
