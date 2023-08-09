const { createSlice } = require("@reduxjs/toolkit");

// catSlice 초기 slice state
const initialState = {
  cats: [],
  isLoading: false,
};
const catSlice = createSlice({
  name: "catSlice",
  initialState,
  reducers: {
    // 목록호출
    getCatsFetch: (state) => {
      console.log("목록호출");
      state.isLoading = true;
    },
    // 목록호출 성공
    getCatsSuccess: (state, action) => {
      console.log("목록호출 성공");
      state.isLoading = false;
      state.cats = action.payload;
    },
    // 목록호출 실패
    getCatsFail: (state) => {
      console.log("목록호출 실패");
      state.isLoading = false;
    },
  },
});
export default catSlice.reducer;
// dispatch 용
export const { getCatsFetch, getCatsSuccess, getCatsFail } = catSlice.actions;
