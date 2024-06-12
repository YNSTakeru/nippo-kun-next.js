import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDigressionMarkdown, setDigressionHTML } from '../../../store';
import './index.css';

const Digression = () => {
  const dispatch = useDispatch();
  const markdown = useSelector((state) => state.digression.markdown);
  const html = useSelector((state) => state.digression.html);

  const handleChange = (e) => {
    dispatch(setDigressionMarkdown(e.target.value));
  };

  return (
    <div className="digression__wrapper">
      {/* <h2 className="digression__title">余談</h2> */}
      <textarea
        className="digression__textarea"
        value={markdown}
        onChange={handleChange}
        placeholder="余談を入力してください"
      ></textarea>
    </div>
  );
};

export default Digression;
