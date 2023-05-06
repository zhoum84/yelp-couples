import React from "react";

function Cuisine({onClick}) {

  return (
    <div className="question">
      <h3 className="question-title">What cuisine are you craving for?</h3>
      <div className="form-group">
        <button className="ans" name="cuisine" value="Italian" onClick={onClick}>
          Italian
        </button>
        <button className="ans" name="cuisine" value="chinese" onClick={(e) => onClick(e)}>Chinese</button>
        <button className="ans" name="cuisine" value="american" onClick={onClick}>American</button>
        <button className="ans" name="cuisine" value="french" onClick={onClick}>French</button>
        <button className="ans" name="cuisine" value="spanish" onClick={onClick}>Spanish</button>
        <button className="ans" name="cuisine" value="indian" onClick={onClick}>Indian</button>
        <button className="ans" name="cuisine" value="mediterranean" onClick={onClick}>Mediterranean</button>
        <button className="ans" name="cuisine" value="thai" onClick={onClick}>Thai</button>
        <button className="ans" name="cuisine" value="african" onClick={onClick}>African</button>
        <button className="ans" name="cuisine" value="other" onClick={onClick}>Other</button>

      </div>
    </div>
  );
}

export default Cuisine;
