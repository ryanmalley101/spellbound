import React, {useEffect, useState} from "react";
import styles from "@/styles/MagicItemCard.module.css"

const MagicItemCard = ({slug}) => {
  const [magicItemData, setMagicItemData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      const response = await fetch(`https://api.open5e.com/v1/magicitems/?slug__in=&slug__iexact=${slug}`);
      const data = await response.json()
      console.log(data.results[0])

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setMagicItemData(data.results[0]);
      }
    }

    fetchData();
  }, [slug]);


  if (!magicItemData) {
    console.log('No magic item data returned')
    return null
  } else {
    return (
      <div className={styles.magicItemCard}>
        <div className={styles.itemName}>{magicItemData.name}</div>
        <hr className={styles.divider}/>
        <div
          className={styles.itemType}>{magicItemData.type}, {magicItemData.rarity} {magicItemData.requires_attunement}</div>
        <hr className={styles.divider}/>
        <div className={styles.itemDescription}>
          {magicItemData.desc}
        </div>
      </div>
    );
  }
}

export default MagicItemCard