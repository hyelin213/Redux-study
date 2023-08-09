import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer, {
  COUNT_DOWN,
  COUNT_INIT,
  COUNT_UP,
  initialState,
} from "./modules/counter";

// 1. createSlice 모듈 로드
// slice 의 개념이 중요합니다.
// 각 기능별 전역 객체를 만들때 slice 를 사용합니다.
// 예,
// login 을 위한 slice,
// todo 을 위한 slice,
// bucket 을 위한 slice
// .....
// 원래 redux 는 store 를 1개를 사용합니다.
// slice 는 작은 store 를 말한다. (store 쪼개서 쓴다)
// store 를 쪼개서 각각의 영역(slice)에 state 를 별도로 관리한다.
import { createSlice } from "@reduxjs/toolkit";

// 3. slice들을 모아서 store에 전달한다.
import { configureStore } from "@reduxjs/toolkit";

// 2. 그래서 createSlice 를 진행
const counterSlice = createSlice({
  // 반드시 slice의 이름이 있어야 합니다.
  name: "counterSlice",
  // 반드시 slice의 초기 값을 작성한다.
  initialState: {value: 0},
  // 반드시 slice에 state를 업데이트하는 Reduce 함수
  // 이전에 사용된 Reducer 함수는 action 타입으로 구분해서 사용했음.
  reducers: {
    up: (state) => {
      // return { ...state, value: state.value + 1 };
      // Redux toolkit에는 내장되어있다.
      // 원본을 지키고 복사본으로 작업한다.(불변성 유지)
      state.value = state.value + 1;
    },
    down: (state, action) => {
      // return { ...state, value: state.value - 1 };
      state.value = state.value - 1;
    },
    init: (state, action) => {
      // return { ...state, value: action.payload };
      state.value = action.payload;
    }
  },
});
const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {todo: []},
  reducers: {
    go: (state) => {
      console.log("gogo");
    }
  }
});
// const bucketSlice = createSlice();

// 3-1. Store 생성
// configureStore 함수에 {} 객체를 전달한다.
const store = configureStore({
  // 반드시 reducer가 있어야 한다.
  reducer: {
    // 키 명을 통해서 slice의 reducers에 접근한다.
    counter: counterSlice.reducer,
    todo: todoSlice.reducer,
  }
});

const App = () => {
  return (
    <div>
      <h1>책예제 응용</h1>
      <div>
        {/* 4. Provide 로 store 의 state 활용 범위지정 */}
        <Provider store={store}>
          <Counter />
        </Provider>
      </div>
    </div>
  );
};

const Counter = () => {
  // 5. store 의 state 를 읽어온다.
  // 매개변수로 전달되는 state 는 초기값 객체가 들어가 있다.
  // state 는 현재 { value:0 } 을 리턴한다.

  // slice를 활용한 경우에는 configureStore에 등록한 reducer의 키 명을 활용하면 {}를 리턴 받는다.
  const { value } = useSelector((state) => state.counter);

  const obj = useSelector((state) => state);
  console.log(obj);

  // 6. store 의 state 를 업데이트 한다.
  // 업데이트 시 액션을 만들어서 전달한다.(액션 크리에이터)
  const dispatch = useDispatch();
  const up = () => {
    // 마치 폴더로 접근하는 경우처럼 dispatch하기
    // dispatch({type:"counterSlice/up"});
    dispatch(counterSlice.actions.up());

    // dispatch 는 reducer 함수로 액션을 전달한다.
    // dispatch({ type: COUNT_UP });
  };
  const down = () => {
    dispatch({type:"counterSlice/down"});
    // dispatch 는 reducer 함수로 액션을 전달한다.
    // dispatch({ type: COUNT_DOWN });
  };
  const init = () => {
    dispatch({type:"counterSlice/init", payload: 0});
    // dispatch({ type: COUNT_INIT, payload: 0 });
  };
  return (
    <>
      카운터
      <p>
        숫자가 나와요. <strong>{value}</strong>
      </p>
      <button onClick={up}>증가</button>
      <button onClick={down}>감소</button>
      <button onClick={init}>초기화</button>
    </>
  );
};

export default App;