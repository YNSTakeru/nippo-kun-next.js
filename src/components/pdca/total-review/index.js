import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { write } from "../../../redux/store/modules/pdcaList";
import Loading from "../../loading";
import "./index.css";

export default function TotalReview() {
  const pdca = useSelector(
    (state) => state.pdcaLister && state.pdcaLister.pdcaList
  ).filter((item) => item.isOpen)[0];
  const dispatch = useDispatch();
  const doneName = useSelector((state) => state.doneNamer.doneName);

  const singleFeedbackClassNames = {
    single__feedback__body: true,
    truncate: pdca.isTruncated,
  };

  const totalReviewWrapperClassNames = {
    "total-review__wrapper": true,
    "is-loading": pdca.isLoading,
  };

  const onClick = (e) => {
    e.preventDefault();
    if (pdca.isTruncated) {
      dispatch(write({ isTruncated: false, doneName: doneName }));
      const $dom = document.querySelector(".total-review__wrapper");
    } else {
      dispatch(write({ isTruncated: true, doneName: doneName }));
    }
  };

  return (
    <div className={classnames(totalReviewWrapperClassNames)} onClick={onClick}>
      {pdca.isLoading ? <Loading /> : null}
      {!pdca.isLoading && (
        <>
          <h2 className="total-review__title">全体レビュー</h2>
          <div className="total-single__feedback__wrapper">
            <div
              dangerouslySetInnerHTML={{ __html: pdca.commonFeedbackText }}
            ></div>
            {pdca.isTruncated && !pdca.isLoading && (
              <div className="single__feedback__more">
                続きを読むにはクリック
              </div>
            )}
            <div className={classnames(singleFeedbackClassNames)}>
              <div
                className={"single__feedback hidden"}
                dangerouslySetInnerHTML={{
                  __html: pdca.addFeedbackText,
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
