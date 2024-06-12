"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../../store";
import Main from "../main";

export default function StoreProvider() {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <Main />
    </Provider>
  );
}
