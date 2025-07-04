import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImShuffle } from "react-icons/im";
import LayoutSelector from "./LayoutSelector";
import {
  getExtremeProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getZeroProbabilityFunction,
} from "../../src";
import styles from "./Controls.module.css";
import { HungerLevel } from "./HungerLevel";

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
  getAutoRandomSeed,
  autoRandomSeed,
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
          <HungerLevel value={hungerLevel} onChange={setHungerLevel} />
        </div>
        <div className={styles.Field}>
          <label htmlFor="randomSeed">Random Seed</label>
          <div className={styles.Inputs}>
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
            <button
              className={styles.ShuffleButton}
              type="button"
              aria-label="Randomize"
              title="Randomize"
              onClick={(event) => {
                setCustomRandomSeed(getAutoRandomSeed());
              }}
            >
              <ImShuffle />
            </button>
          </div>
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
