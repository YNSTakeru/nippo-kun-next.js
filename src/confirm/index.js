import { marked } from "marked";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CopyButton from "../components/buttons/copy-button";
import Header from "../components/header";
import Loading from "../components/loading";
import Textarea from "../components/textarea";
import { reviewWrite } from "../redux/store/modules/all-review";
import "./index.css";

const Confirm = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [isStateLoading, setIsStateLoading] = useState(isLoading);
  const [review, setReview] = useState("");
  const [firstTime, setFirstTime] = useState(true);

  const confirmReport = useSelector(
    (state) => state.confirmReporter.confirmReport
  );
  const dispatch = useDispatch();

  async function fetchReview(confirmReport) {
    try {
      setIsStateLoading(true);

      const response = await fetch(
        "https://express-hello-world-a3nc.onrender.com/all-review/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: confirmReport,
            order: "Action",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const { generatedText } = data;
        dispatch(reviewWrite(generatedText));
        setReview(marked.parse(generatedText));
        setIsStateLoading(false);
      }
    } catch (err) {
      console.error("AIのレビューに失敗しました", err);
    }
  }

  useEffect(() => {
    if (confirmReport && firstTime) {
      fetchReview(confirmReport);
      setFirstTime(false);
    }
  }, [confirmReport]);

  const onClick = () => {
    fetchReview(confirmReport);
  };

  return (
    <>
      <Header />
      <div className="confirm__wrapper">
        {isStateLoading && <Loading />}
        {!isStateLoading && review && (
          <div className="review">
            <div
              dangerouslySetInnerHTML={{
                __html: review,
              }}
            ></div>
            <button className="review-button" onClick={onClick}>
              再レビュー
            </button>
          </div>
        )}
        <Textarea />
      </div>
      <CopyButton />
    </>
  );
};

export default Confirm;
