import React from "react";
import styles from "@/styles/Battlemap.module.css";

class ZoomSlider extends React.Component {
  render() {
    return <div className={styles.zoomSliderContainer}>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        value={this.props.value}
        onChange={this.props.onChange}
        className={styles.zoomSlider}
      />
    </div>;
  }
}

export default ZoomSlider