import "./styles.css";
import { useEffect, useState } from "react";

let order = 0;
let isAllClicked = false;
export default function App() {
  const [boxState, setBoxState] = useState(getBoxes("initial"));

  useEffect(() => {
    if (boxState.some((box) => !box.isClicked)) {
      isAllClicked = false;
    } else {
      isAllClicked = true;
    }

    if (isAllClicked) {
      boxState.forEach((item, index) => {
        return setTimeout(() => {
          let tempBox = [...boxState];
          tempBox[index].isClicked = false;
          setBoxState(tempBox);
        }, 1000 * (index + 1));
      });
    }
  }, [boxState]);

  function getBoxes(type) {
    let boxData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") {
            return boxData.push({ i, j, isClicked: false, order: null });
          }
          return (
            <div
              style={{
                backgroundColor:
                  boxState?.find((item) => item.i === i && item.j === j)
                    ?.isClicked && "green"
              }}
              className="box"
              onClick={() => changeColor(i, j)}
            ></div>
          );
        }
        return <div></div>;
      });
    });
    if (type === "initial") {
      return boxData;
    }
    return boxes;
  }

  const changeColor = (i, j) => {
    let temp = [...boxState];
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = ++order;
    temp.sort((a, b) => (a.order > b.order ? 1 : -1));
    setBoxState(temp);
  };

  console.log(boxState);

  return (
    <div className="App">
      <div className="box-container">{getBoxes()}</div>
    </div>
  );
}
