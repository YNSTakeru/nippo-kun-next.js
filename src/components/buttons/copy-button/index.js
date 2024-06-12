import { useDispatch, useSelector } from "react-redux";
import { changeHome } from "../../../redux/store/modules/page";
import "./index.css";

export default function Copy() {
  const confirmReport = useSelector(
    (state) => state.confirmReporter.confirmReport
  );

  const tomorrowTodo = useSelector((state) => state.todo.tomorrow);
  const dispatch = useDispatch();

  const onClick = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(confirmReport);
      if (tomorrowTodo.length === 0) return;
      localStorage.setItem("yesterday", JSON.stringify(tomorrowTodo));
    } catch (err) {
      console.error("テキストのコピーに失敗しました", err);
    }
  };

  const onClickBack = (e) => {
    e.preventDefault();
    dispatch(changeHome());
  };

  return (
    <div className="confirm-button__wrapper">
      <button className="back-button" onClick={onClickBack}></button>
      <button className="copy-button" onClick={onClick}></button>
    </div>
  );
}
