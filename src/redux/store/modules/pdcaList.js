import { createSlice } from "@reduxjs/toolkit";

const pdcaLister = createSlice({
  name: "pdcaLister",
  initialState: {
    pdcaList: [],
  },
  reducers: {
    add(state, { type, payload }) {
      const { doneName } = payload;

      if (state.pdcaList.some((item) => item.doneName === doneName)) return;

      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: false,
      }));

      state.pdcaList = [
        ...state.pdcaList,
        {
          doneName,
          isOpen: true,
          plan: "",
          do: "",
          check: "",
          action: "",
          isTruncated: false,
          planBlock: [],
          doBlock: [],
          checkBlock: [],
          actionBlock: [],
        },
      ];
    },
    remove(state, { type, payload }) {
      if (state.pdcaList.length === 1) return;

      const { doneName } = payload;
      state.pdcaList = state.pdcaList.filter(
        (item) => item.doneName !== doneName
      );

      console.log(state.pdcaList);
    },

    write(state, { type, payload }) {
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.doneName === payload.doneName) {
          return { ...item, ...payload, isOpen: true };
        }
        return { ...item, isOpen: false };
      });
    },

    change(state, { type, payload }) {
      const { doneName } = payload;
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.doneName === doneName) {
          return { ...item, isOpen: true };
        }
        return { ...item, isOpen: false };
      });
    },
    editDoneName(state, { type, payload }) {
      const { prevDoneName, newDoneName } = payload;
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.doneName === prevDoneName) {
          return { ...item, doneName: newDoneName };
        }
        return item;
      });
    },
  },
});

const { add, remove, write, change, editDoneName } = pdcaLister.actions;

export { add, change, editDoneName, remove, write };
export default pdcaLister.reducer;
