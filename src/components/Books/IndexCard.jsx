import React from "react";

const Card = (props) => {
    console.log(props)
  return (
    <div className="card">
      <img className="cardImage" src={props.image} alt="" />
      <h1 className="cardTitle">{props.title} </h1>
      <h4 className="cardSubtitle">{props.brand}</h4>
      <h3 className="cardPrice"> {props.price}</h3>
    </div>
  );
};

export default Card;
