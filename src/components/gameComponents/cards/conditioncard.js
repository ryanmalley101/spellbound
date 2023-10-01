import React, {useEffect, useState} from "react";
import styles from "@/styles/ArmsCard.module.css"

const ConditionCard = ({slug}) => {
  const [conditionData, setConditionData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      const name = slug.charAt(0).toUpperCase() + slug.slice(1);

      const response = await fetch(`https://api.open5e.com/v1/conditions/?name=${name}`);
      const data = await response.json()
      console.log(data.results[0])

      // Validate the API response against the schema
      // const isValid = validate(data, Monster);
      const isValid = true
      if (isValid) {
        setConditionData(data.results[0]);
      }
    }

    fetchData();
  }, [slug]);


  if (!conditionData) {
    return null
  } else {
    return (
      <div className={styles.armCard}>
        <div className={styles.armName}>{conditionData.name}</div>
        <hr className="divider"/>
        <div className={styles.armDescription}>
          <ul>
            {conditionData.desc.split('*').map((effect, index) => {
              if (index !== 0) {
                return <li key={effect}>{effect}</li>
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ConditionCard