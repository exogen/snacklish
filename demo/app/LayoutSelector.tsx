import { LuColumns2, LuRows2 } from "react-icons/lu";
import styles from "./LayoutSelector.module.css";

export default function LayoutSelector({ value, onChange }) {
  return (
    <fieldset className={styles.LayoutSelector}>
      <legend>
        <span className={styles.Label}>Layout</span>
      </legend>
      <div className={styles.Option}>
        <input
          type="radio"
          name="layout"
          id="layout-rows"
          value="rows"
          checked={value === "rows"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <label htmlFor="layout-rows">
          <LuRows2
            className={styles.LayoutIcon}
            title="Rows"
            aria-label="Rows"
          />
        </label>
      </div>
      <div className={styles.Option}>
        <input
          type="radio"
          name="layout"
          id="layout-columns"
          value="columns"
          checked={value === "columns"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <label htmlFor="layout-columns">
          <LuColumns2
            className={styles.LayoutIcon}
            title="Columns"
            aria-label="Columns"
          />
        </label>
      </div>
    </fieldset>
  );
}
