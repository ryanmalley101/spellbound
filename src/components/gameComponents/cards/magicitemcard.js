import React, {useEffect, useState} from "react";
import styles from "@/styles/MagicItemCard.module.css"
import er_json from "../../../../public/elden_ring.json";
import useBattlemapStore from "@/stores/battlemapStore";

const MagicItemCard = ({slug}) => {
    const [magicItemData, setMagicItemData] = useState(null);
    const gameMode = useBattlemapStore((state) => state.gameMode)

    useEffect(() => {
        async function fetchData() {
            console.log(slug)
            let data
            if (gameMode === "Elden Ring") {
                console.log(er_json.filter((category) => category.name === "Magic Items")[0])
                data = er_json.filter((category) => category.name === "Magic Items")[0].items.filter((item) => item.slug === slug)[0]
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
                setMagicItemData(data);
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