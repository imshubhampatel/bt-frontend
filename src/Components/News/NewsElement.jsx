import React from "react";
import styles from "./NewsElement.module.css";
import Card from "../Cards/NewsCard";
import { useEffectOnce } from "../../Helpers/useEffect";
import { useDispatch, useSelector } from "react-redux";
import { getAllnewses } from "../../Features/news/newsSlice";
import { getToken } from "../../Features/auth/authSlice";

export default function NewsElement() {
  const { token } = useSelector((state) => state.auth);
  const { allNews } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffectOnce(() => {
    dispatch(getAllnewses());
  }, []);
  return (
    <div>
      <div className={`${styles.parent_news} ${styles.news}`}>
        <div className={`${styles.cards} ${styles.news_cards}`}>
          {allNews &&
            allNews.length !== 0 &&
            allNews.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className={`${styles.card}  ${styles.card_item}`}
                >
                  <Card item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
