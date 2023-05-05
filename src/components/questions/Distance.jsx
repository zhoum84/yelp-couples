function Distance({onClick}) {

  return (
    <div className="question">
      <h3 className="question-title">How far are you comfortable traveling?</h3>
      <div className="form-group">
        <button className="ans" name="distance" value="1" onClick={onClick}>
          &lt; 1 mile
        </button>
        <button className="ans" name="distance" value="5" onClick={(e) => onClick(e)}>&lt; 5 miles
</button>
        <button className="ans" name="distance" value="10" onClick={onClick}>&lt; 10 miles</button>
        <button className="ans" name="distance" value="25" onClick={onClick}>&lt; 25 miles</button>
        <button className="ans" name="distance" value="50" onClick={onClick}>&lt; 50 miles</button>
        <button className="ans" name="distance" value="any" onClick={onClick}>Any</button>
      </div>
    </div>
  );
}

export default Distance;
