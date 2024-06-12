import classnames from "classnames";
import { marked } from "marked";
import { useState } from "react";
import Loading from "../../loading";
import Editor from "./Editor";
import "./index.css";

export default function Single({ title, order = "PDCA" }) {
  const [markdown, setMarkdown] = useState("");
  const [showFeedback, setShowFeedBack] = useState("");
  const [commonFeedbackText, setCommonFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addFeedbackText, setAddFeedbackText] = useState("");
  const [isTruncated, setIsTruncated] = useState(false);

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const onFeedbackClick = async () => {
    setShowFeedBack(true);
    setIsLoading(true);
    setCommonFeedbackText("AIがフィードバックを生成中です...");

    try {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (e) {
      console.log(e);
    }

    // try {
    //   const response = await fetch(
    //     "https://express-hello-world-a3nc.onrender.com/",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         value: markdown,
    //         order,
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     response.json().then((data) => {
    //       const { generatedText } = data;
    //       setIsTruncated(false);
    //       setIsLoading(false);

    //       if (generatedText.length > 128) {
    //         setCommonFeedbackText(marked.parse(generatedText.slice(0, 128)));
    //         setAddFeedbackText(marked.parse(generatedText.slice(128)));

    //         setIsTruncated(true);
    //       } else {
    //         setCommonFeedbackText(marked.parse(generatedText));
    //       }
    //     });
    //   } else {
    //     setIsTruncated(false);
    //     setIsLoading(false);
    //     setCommonFeedbackText(
    //       marked.parse(
    //         "エラーが発生しました\nしばらく時間を置いてから実行してください"
    //       )
    //     );
    //   }
    // } catch (e) {
    //   setIsTruncated(false);
    //   setIsLoading(false);
    //   setCommonFeedbackText(
    //     marked.parse(
    //       "エラーが発生しました\nしばらく時間を置いてから実行してください"
    //     )
    //   );
    // }
  };

  const onFeedbackTextClick = (e) => {
    e.preventDefault();

    if (isTruncated) {
      setIsTruncated(false);
      const $dom = document.querySelector(".single__feedback__wrapper");
      $dom.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsTruncated(true);
    }
  };

  const singleFeedbackClassNames = {
    single__feedback__body: true,
    truncate: isTruncated,
  };

  return (
    <div>
      <h2 className="single__title">{title}</h2>
      <div className="single__textarea__wrapper">
        <Editor order={order} setMarkdown={setMarkdown} />
      </div>
      <button className={"single__button"} onClick={onFeedbackClick}>
        フィードバックを取得する
      </button>
      {isLoading && <Loading />}
      {showFeedback && !isLoading && (
        <div
          className="single__feedback__wrapper"
          onClick={onFeedbackTextClick}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: commonFeedbackText,
            }}
          ></div>
          {isTruncated && !isLoading && (
            <div className="single__feedback__more">続きを読むにはクリック</div>
          )}
          <div className={classnames(singleFeedbackClassNames)}>
            <div
              className={"single__feedback hidden"}
              dangerouslySetInnerHTML={{
                __html: addFeedbackText,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
