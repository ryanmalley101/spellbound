import {Line} from "react-konva";

const GridOverlay = ({width, height, gridSize}) => {
    // // Adjust the grid size and color as per your requirements
    // // const gridSize = 25;
    // const gridColor = 'rgba(0, 0, 0, 0.3)';
    //
    // const overlayStyle = {
    //     backgroundImage: `linear-gradient(${gridColor} 3px, transparent 3px),
    //                   linear-gradient(90deg, ${gridColor} 3px, transparent 3px)`,
    //     backgroundSize: `${gridSize}px ${gridSize}px`,
    // };
    //
    // return <div className={styles.gridOverlay} style={overlayStyle}></div>;

    const verticalLines = [];
    const horizontalLines = [];

    // Create vertical grid lines
    for (let x = gridSize; x < width; x += gridSize) {
        verticalLines.push(
            <Line
                key={`vertical-${x}`}
                points={[x, 0, x, height]}
                stroke={"black"}
            />
        );
    }

    // Create horizontal grid lines
    for (let y = gridSize; y < height; y += gridSize) {
        horizontalLines.push(
            <Line
                key={`horizontal-${y}`}
                points={[0, y, width, y]}
                stroke={"black"}
            />
        );
    }

    return <>
        {horizontalLines}
        {verticalLines}
    </>
};

export default GridOverlay