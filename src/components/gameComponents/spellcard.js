import React, {useEffect, useState} from "react";
import styles from "@/styles/SpellCard.module.css"
import er_json from "../../../public/elden_ring.json"
import useBattlemapStore from "@/stores/battlemapStore";

const SpellCard = ({slug}) => {
  const [spellData, setSpellData] = useState(null);
  const gameMode = useBattlemapStore((state) => state.gameMode)


  useEffect(() => {
    async function fetchData() {
      console.log(slug)

      let data
      if (gameMode === "Elden Ring") {
        console.log(er_json.filter((category) => category.name === "Spells")[0])
        data = er_json.filter((category) => category.name === "Spells")[0].items.filter((spell) => spell.slug === slug)[0]
        console.log(data)
      } else {
        const response = await fetch(`https://api.open5e.com/v1/spells/?slug__in=&slug__iexact=${slug}`);
        const response_json = response.json()
        if (response_json.results) {
          data = response_json.results[0]
          console.log(data.results[0])
        } else {
          console.log(`No response found for spell slug ${slug}`)
        }
      }


      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setSpellData(data);
      }
    }

    console.log(gameMode)
    fetchData();
  }, [slug]);

  if (!spellData) {
    return null
  } else {
    return (
      <div className={styles.spellCard}>
        <div className={styles.spellName}>{spellData.name}</div>
        <hr className={styles.divider}/>
        <div
          className={styles.spellLevel}>{spellData.level} {spellData.school} {spellData.type ? `${spellData.type}` : ""}</div>
        <div className={styles.spellLevel}>{spellData.lore}</div>
        <hr className={styles.divider}/>
        <div className={styles.spellDetails}>
          <div><strong>Casting Time:</strong> {spellData.casting_time}</div>
          <div><strong>Range:</strong> {spellData.range}</div>
          <div><strong>Components:</strong> {spellData.components} {spellData.material ? `(${spellData.material})` : ""}
          </div>
          <div>
            <strong>Duration:</strong> {spellData.concentration === "yes" ? "Concentration, " : ""} {spellData.duration}
          </div>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.spellDescription}>
          {spellData.desc}

          <br/><br/>
          <b>
            {spellData.higher_level ? `At Higher Levels:  ${spellData.higher_level}` : ""}
          </b>
        </div>
      </div>
    );
  }
}

export default SpellCard