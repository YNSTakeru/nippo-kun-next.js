import { useDispatch } from "react-redux";
import { changeConfirm } from "../../../redux/store/modules/page";
import "./index.css";

export default function Confirm() {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.preventDefault();
    dispatch(changeConfirm({}));
  };

  return (
    <div className="confirm-button__wrapper">
      <button className="confirm-button" onClick={onClick}></button>
    </div>
  );
}
