import styles from '../../styles/Battlemap.module.css'

const GridOverlay = ({gridSize}) => {
  // Adjust the grid size and color as per your requirements
  // const gridSize = 25;
  const gridColor = 'rgba(0, 0, 0, 0.3)';

  const overlayStyle = {
    backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px),
                      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
    backgroundSize: `${gridSize}px ${gridSize}px`,
  };

  return <div className={styles.gridOverlay} style={overlayStyle}></div>;
};

export default GridOverlay