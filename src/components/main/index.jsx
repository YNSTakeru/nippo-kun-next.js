"use client";

import Confirm from "@/confirm";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import AllCheckButton from "../buttons/all-check-button";
import ConfirmButton from "../buttons/confirm-button";
import DigressionAndHelp from "../digression-and-help";
import Header from "../header";
import PDCA from "../pdca";
import Tomorrow from "../tomorrow";

export default function Main() {
  const pageName = useSelector(
    (state) => state.pager && state.pager.currentPageName
  );
  const doneName = useSelector((state) => state.doneNamer.doneName);
  const pdcaList = useSelector(
    (state) => state.pdcaLister && state.pdcaLister.pdcaList
  );

  return (
    <>
      {pageName === "home" && (
        <>
          <Header />
          <MetaData />
          {pdcaList.map((item, key) => (
            <Fragment key={key}>
              {item.doneName === doneName && <PDCA />}
            </Fragment>
          ))}
          <AllCheckButton />
          <Tomorrow />
          <DigressionAndHelp />
          <ConfirmButton />
        </>
      )}
      {pageName === "confirm" && <Confirm />}
    </>
  );
}
