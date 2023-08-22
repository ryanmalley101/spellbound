import React, {useEffect, useState} from "react";
import styles from "@/styles/ArmsCard.module.css"

const ArmorCard = ({slug}) => {
  const [armorData, setArmorData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      const response = await fetch(`https://api.open5e.com/v1/armor/?slug__in=&slug__iexact=${slug}`);
      const data = await response.json()
      console.log(data.results[0])

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setArmorData(data.results[0]);
      }
    }

    fetchData();
  }, [slug]);


  if (!armorData) {
    console.log('No weapon data returned')
    return null
  } else {
    return (
      <div className={styles.armCard}>
        <div className={styles.armName}>{armorData.name} armor</div>
        <hr className="divider"/>
        <div className={styles.armType}>{armorData.category}</div>
        <hr className="divider"/>
        <div className={styles.armDetails}>
          <div><strong>AC:</strong> {armorData.ac_string}</div>
          {armorData.stealth_disadvantage ? <div><strong>Stealth: </strong> Disadvantage</div> : null}
          {armorData.strength_requirement ?
            <div><strong>Strength Required: </strong> {armorData.strength_requirement} </div> : null}
          <div><strong>Cost:</strong> {armorData.cost}</div>
        </div>
        <hr className="divider"/>
        <div className={styles.armDescription}>
          {armorData.desc}
        </div>
      </div>
    );
  }
}

export default ArmorCard