import React, {useEffect, useState} from "react";
import styles from "@/styles/ArmsCard.module.css"

const WeaponCard = ({slug}) => {
  const [weaponData, setWeaponData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      const response = await fetch(`https://api.open5e.com/v1/weapons/?slug__in=&slug__iexact=${slug}`);
      const data = await response.json()
      console.log(data.results[0])

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setWeaponData(data.results[0]);
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