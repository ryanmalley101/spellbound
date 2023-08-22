import React, {useEffect, useState} from "react";
import styles from "@/styles/SpellCard.module.css"

const SpellCard = ({slug}) => {
  const [spellData, setSpellData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      const response = await fetch(`https://api.open5e.com/v1/spells/?slug__in=&slug__iexact=${slug}`);
      const data = await response.json()
      console.log(data.results[0])

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setSpellData(data.results[0]);
      }
    }

    fetchData();
  }, [slug]);

  const getComponents = () => {
    var componentString = {components}
  }

  if (!spellData) {
    console.log('No monster data returned')
    return null
  } else {
    return (
      <div className={styles.spellCard}>
        <div className={styles.spellName}>{spellData.name}</div>
        <hr className={styles.divider}/>
        <div className={styles.spellLevel}>{spellData.level} {spellData.school}</div>
        <hr className={styles.divider}/>
        <div className={styles.spellDetails}>
          <div><strong>Casting Time:</strong> {spellData.casting_time}</div>
          <div><strong>Range:</strong> {spellData.range}</div>
          <div><strong>Components:</strong> {spellData.components} ({spellData.material})</div>
          <div>
            <strong>Duration:</strong> {spellData.concentration === "yes" ? "Concentration, " : ""} {spellData.duration}
          </div>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.spellDescription}>
          {spellData.desc}

          <br/><br/>

          <b>At Higher Levels: </b> {spellData.higher_level}
        </div>
      </div>
    );
  }
}

export default SpellCard