import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { getCatsFetch } from "./reducers/catSlice";

function App() {
  const { cats } = useSelector((state) => state.cats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatsFetch());
  }, []);
  return (
    <div>
      <h1>고양이 갤러리</h1>
      <p>이미지</p>
      <hr />
      <div className="gallery">
        {cats.map((item) => (
          <div key={item.id} className="box">
            <div className="left">
              <img
                src={item.image.url}
                alt={item.name}
                width="200"
                height="200"
              />
            </div>
            <div className="right">
              <h2>{item.name}</h2>
              <h3>설명 1: {item.description}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
