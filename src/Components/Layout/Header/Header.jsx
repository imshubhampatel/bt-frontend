import React from "react";
import styles from "./Header.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddIcon from "@mui/icons-material/Add";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { EditOutlined } from "@mui/icons-material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { InfoOutlined } from "@mui/icons-material";

export default function Header({ compName }) {
  return (
    <>
      <div className={styles.parentHeader}>
        <div className={`${styles.headerContent} ${styles.content}`}>
          <div className={`${styles.headerLeft} ${styles.left}`}>
            <div className={`${styles.text} ${styles.heading_text}`}>
              {compName}
            </div>
          </div>
          <div className={`${styles.headerRight} ${styles.right}`}>
            <div
              className={` buttons_icon ${styles.buttons} ${styles.header_button}`}
            >
              <Tooltip title="plus">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="edit">
                <IconButton>
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete">
                <IconButton>
                  <DeleteOutlineOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="info">
                <IconButton>
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
