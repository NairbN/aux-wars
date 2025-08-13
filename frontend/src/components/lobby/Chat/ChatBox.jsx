import React from "react";
import styles from "../../../styles/components/ChatBox.module.css";

export default function ChatBox({ children }) {
  return (
    <div className={styles.container}> 
      {children}
    </div>
  );
}
