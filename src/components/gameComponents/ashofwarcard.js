import React, {useEffect, useState} from "react";
import styles from "@/styles/SpellCard.module.css"
import er_json from "../../../public/elden_ring.json"
import useBattlemapStore from "@/stores/battlemapStore";

const AshOfWarCard = ({slug}) => {
  const [ashOfWarData, setAshOfWarData] = useState(null);
  const gameMode = useBattlemapStore((state) => state.gameMode)


  useEffect(() => {
    async function fetchData() {
      console.log(slug)

      let data
      console.log(er_json.filter((category) => category.name === "Ashes of War")[0])
      data = er_json.filter((category) => category.name === "Ashes of War")[0].items.filter((spell) => spell.slug === slug)[0]
      console.log(data)

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setAshOfWarData(data);
      }
    }

    console.log(gameMode)
    fetchData();
  }, [slug]);

  if (!ashOfWarData) {
    return null
  } else {
    return (
      <div className={styles.spellCard}>
        <div className={styles.spellName}>{ashOfWarData.name}</div>
        <hr className={styles.divider}/>
        <div
          className={styles.spellLevel}><strong>Affinity</strong> {ashOfWarData.affinity}</div>
        <div className={styles.spellLevel}>{ashOfWarData.lore}</div>
        <hr className={styles.divider}/>
        <div className={styles.spellDetails}>
          <div><strong>Spell Point Cost:</strong> {ashOfWarData.sp}</div>
          <div><strong>Casting Time:</strong> {ashOfWarData.activation_time}</div>
          <div><strong>Applicable Arms:</strong> {ashOfWarData.applicable_arms}</div>
          <div><strong>Duration:</strong> {ashOfWarData.duration}</div>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.spellDescription}>
          {ashOfWarData.description}
        </div>
      </div>
    );
  }
}

export default AshOfWarCard