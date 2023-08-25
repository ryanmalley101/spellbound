import React, {useEffect, useState} from "react";
import styles from "@/styles/ArmsCard.module.css"
import useBattlemapStore from "@/stores/battlemapStore";
import er_json from "../../../public/elden_ring.json";

const WeaponCard = ({slug}) => {
  const [weaponData, setWeaponData] = useState(null);
  const gameMode = useBattlemapStore((state) => state.gameMode)

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      let data
      if (gameMode === "Elden Ring") {
        console.log(er_json.filter((category) => category.name === "Weapons")[0])
        data = er_json.filter((category) => category.name === "Weapons")[0].items.filter((weapon) => weapon.slug === slug)[0]
        console.log(data)
      } else {
        const response = await fetch(`https://api.open5e.com/v1/weapons/?slug__in=&slug__iexact=${slug}`);
        const response_json = await response.json()
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
        setWeaponData(data);
      }
    }

    fetchData();
  }, [slug]);


  if (!weaponData) {
    console.log('No weapon data returned')
    return null
  } else {
    return (
      <div className={styles.armCard}>
        <div className={styles.armName}>{weaponData.name}</div>
        <hr className="divider"/>
        <div className={styles.armType}>{weaponData.category.substring(0, weaponData.category.length - 1)}</div>
        <div className={styles.armType}>{weaponData.lore}</div>
        <hr className="divider"/>
        <div className={styles.armDetails}>
          <div><strong>Damage:</strong> {weaponData.damage_dice} {weaponData.damage_type}</div>
          <div><strong>Properties:</strong> {weaponData.properties.join(', ')}</div>
        </div>
        <hr className="divider"/>
        <div className={styles.armDescription}>
          {weaponData.desc}
        </div>
      </div>
    );
  }
}

export default WeaponCard