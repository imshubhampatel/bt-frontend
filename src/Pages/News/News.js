import React from "react";
import NewsElement from "../../Components/News/NewsElement";
import Layout from "../../Components/Layout/Layout/Layout";
import { useEffectOnce } from "../../Helpers/useEffect";
import { useDispatch, useSelector } from "react-redux";
import { getAllnewses } from "../../Features/news/newsSlice";
import Loader from "../../Components/Loader/Loader";

export default function News() {
  const { token, loading } = useSelector((state) => state.auth);
  let props = {};
  props.compName = "News";
  props.addBtn = "/super-admin/create/news";

  return <Layout {...props}>{loading ? <Loader /> : <NewsElement />}</Layout>;
}
