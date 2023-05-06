import { useState } from "react";
import Price from "../components/questions/Price";
import Cuisine from "../components/questions/Cuisine";
import Distance from "../components/questions/Distance";

//the state keeps reseting upon button press. Need to fix that
const FormPage = () => {
  const [inputs, setInputs] = useState({
    price: "",
    cuisine: "",
    distance: "",
  });

  const [index, setIndex] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    setInputs((prevState) => {
      const newData = {
        ...prevState,
        [e.target.name]: e.target.value,
      };

      setInputs(newData);

      handleNext(e);
      return newData;
    });
  };

  const [display, setDisplay] = useState({
    0: <Cuisine onClick={handleClick} />,
    1: <Price onClick={handleClick} />,
    2: <Distance onClick={handleClick} />,
  });

  const handlePrev = (e) => {
    setIndex(index - 1);
  };

  const handleNext = (e) => {
    setIndex(index + 1);
  };

  // submit the data and do something with it
  const handleSubmit = () => {
    console.log(inputs);
  };

  const seePrev = index !== 0;
  const seeNext = index !== Object.keys(display).length - 1;
  const disableSubmit = index !== Object.keys(display).length - 1;
  return (
    <div>
      <form className="form">
        <button
          className="btn btn-submit"
          disabled={disableSubmit}
          type="button"
          title="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {display[index]}
        <div className="button-container">
          <button
            className="btn btn-blue"
            style={!seePrev ? { display: "none" } : {}}
            type="button"
            title="Prev"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="btn btn-blue btn-right"
            style={!seeNext ? { display: "none" } : {}}
            type="button"
            title="Next"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
