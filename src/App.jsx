import { useState } from "react";
import styles from "./App.module.css";
import buttonList from "./assets/button_list.json";

export function App() {
  const [display, setDisplay] = useState("0");
  const [getResult, setGetResult] = useState(false); // флаг для сброса результата перед новым циклом

  function currentDisplay(button) {
    switch (button.content) {
      case "=":
        try {
          const result = eval(display);
          setDisplay(result.toString());
          setGetResult(true);
        } catch (error) {
          console.error.log("error", `${error.message}`);
          setDisplay("Ошибка вычисления!");
        }
        break;
      case "+":
      case "-":
        // позволяем работать с предыдущим результатом
        if (getResult) {
          setGetResult(false);
        }
        // запрещаем ввод если "0". т.е вначале работы
        if (display === "0") {
          return;
        }
        // Проверяем, не нажималась ли та же самая операция дважды подряд
        if (display.endsWith("+") || display.endsWith("-")) {
          return; // Игнорируем нажатие, если это тот же оператор
        }
        setDisplay(display + button.content);
        break;
      case "C":
        setDisplay("0");
        break;

      default:
        if (getResult) {
          setDisplay(button.content); // Начало нового числа после результата
          setGetResult(false); // Удаляем флаг, чтобы разрешить ввод следующего числа
        } else {
          setDisplay(
            display === "0" ? button.content : display + button.content
          );
        }
        break;
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Калькулятор</h1>
        {/* Дисплей */}
        <div className={styles.display}>{display}</div>
        {/* Кнопки 0 - 9, Кнопки операторы*/}
        <div className={styles.buttonsContainer}>
          {buttonList.map((button) => (
            <button
              onClick={() => currentDisplay(button)}
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
