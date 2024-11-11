import { Icon } from "../index";
import styles from "./search.module.css";
export const Search = (props) => {
  const { value, setValue } = props;
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <label className={styles.label}>
      <Icon className={styles.icon} id="search" />
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Поиск..."
      />
    </label>
  );
};
