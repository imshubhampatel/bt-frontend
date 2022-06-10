import React from "react";
import styles from "./CreateNews.module.css";
import Layout from "../../Layout/Layout/Layout";
import Loader from "../../Loader/Loader";
import axios from "axios";
import Axios, { handleCancellation, cancelToken } from "../../../Axios";

import { useSelector } from "react-redux";
import {
  TextField,
  InputLabel,
  FormHelperText,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";

export default function CreateNews() {
  const { loading } = useSelector((state) => state.news);
  const { token } = useSelector((state) => state.auth);
  const changeHandler = (name) => async (e) => {
    debugger;
    console.log(name, e.target.value);
  };

  const callApps = async () => {
    if (typeof cancelToken != typeof undefined) {
      handleCancellation();
    }
    let result = await Axios.get(`http://localhost:5001/api/v1/news/all-news`);
    alert(JSON.stringify(result));
    console.log(result);
  };
  const redirectHandler = () => {
    console.log("redirected");
  };
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {redirectHandler()}
          <div>
            <TextField
              id="outlined-basic"
              label="error"
              variant="outlined"
              onChange={changeHandler("date")}
            />
          </div>
          <button onClick={() => callApps()} className={styles.saveBtn}>
            Save
          </button>
        </div>
      )}
    </Layout>
  );
}
