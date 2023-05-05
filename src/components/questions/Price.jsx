import React from "react";

function Price({onClick}) {

  return (
    <div className="question">
      <h3 className="question-title">What is your price range?</h3>
      <div className="form-group">
        <button className="ans" name="price" value="$" onClick={onClick}>
          $
        </button>
        <button className="ans" name="price" value="$$" onClick={(e) => onClick(e)}>$$</button>
        <button className="ans" name="price" value="$$$" onClick={onClick}>$$$</button>
        <button className="ans" name="price" value="$$$$" onClick={onClick}>$$$$</button>
        <button className="ans" name="price" value="any" onClick={onClick}>Any</button>
      </div>
    </div>
  );
}

export default Price;
