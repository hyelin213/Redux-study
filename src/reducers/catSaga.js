import { call, put, takeEvery } from "redux-saga/effects";
import { getCatsSuccess } from "./catSlice";

function* catSaga() {
  yield takeEvery("catSlice/getCatsFetch", workGetData);
}
function* workGetData() {
  const list = yield call(() =>
    fetch(
      "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ"
    )
  );

  const result = yield list.json();
  const resultCut = result.slice(0, 10);
  yield put(getCatsSuccess(resultCut));
}
export default catSaga;
