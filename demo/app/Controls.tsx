import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import LayoutSelector from "./LayoutSelector";
import {
  getExtremeProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getZeroProbabilityFunction,
} from "../../src";
import styles from "./Controls.module.css";

const probabilityFns = [
  getZeroProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getExtremeProbabilityFunction,
];

export function Controls({
  layout,
  setLayout,
  barSize,
  setBarSize,
  hungerLevel,
  setHungerLevel,
  customRandomSeed,
  setCustomRandomSeed,
  autoRandomSeed,
  setProbabilityFunction,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.Controls} data-state={isOpen ? "open" : "closed"}>
      <button
        className={styles.ToggleButton}
        type="button"
        onClick={(event) => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <FaPlus className={styles.ToggleIcon} /> Chocontrols
      </button>
      <div className={styles.Fields}>
        <LayoutSelector value={layout} onChange={setLayout} />
        <div className={styles.Field}>
          <label htmlFor="hungerLevel">Hunger Level</label>
          <input
            id="hungerLevel"
            type="range"
            min={1}
            max={3}
            value={hungerLevel}
            onChange={async (event) => {
              const value = +event.target.value;
              setHungerLevel(value);
              const fn = await probabilityFns[value]();
              setProbabilityFunction(() => fn);
            }}
          />
        </div>
        <div className={styles.Field}>
          <label htmlFor="randomSeed">Random Seed</label>
          <input
            className={styles.Input}
            id="randomSeed"
            type="text"
            size={6}
            value={customRandomSeed}
            placeholder={autoRandomSeed}
            onChange={(event) => {
              setCustomRandomSeed(event.target.value);
            }}
          />
        </div>
        <div className={styles.Field}>
          <label htmlFor="barSize">Bar Size</label>
          <input
            className={styles.Input}
            id="barSize"
            type="number"
            min={1}
            max={30}
            value={barSize}
            onChange={(event) => {
              setBarSize(+event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
