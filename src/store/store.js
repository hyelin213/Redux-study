import { configureStore } from "@reduxjs/toolkit";
import catSlice from "../reducers/catSlice";
// sags
import createSagaMiddleware from "@redux-saga/core";
import catSaga from "../reducers/catSaga";
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cats: catSlice,
  },
  middleware: [saga],
});
saga.run(catSaga);

export default store;
