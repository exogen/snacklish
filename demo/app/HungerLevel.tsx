import Slider from "rc-slider";
import styles from "./HungerLevel.module.css";

export function HungerLevel({ value, onChange }) {
  return (
    <Slider
      id="hungerLevel"
      className={styles.Slider}
      min={1}
      max={3}
      value={value}
      onChange={onChange}
    />
  );
}
