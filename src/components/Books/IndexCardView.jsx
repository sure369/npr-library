import React from "react";
import { SampleBooksData } from '../Data\'s/booksData';
import Card from "./IndexCard";

function CardView(props) {

  return (
    <>
      {SampleBooksData.map((element) => {
        return (
          <Card
            key={element.bookIdNo}
            title={element.BookName}
            brand={element.Quantity}
            price={element.category}            
            image={element.img}
          />
        );
      })}
    </>
  );
}

export default CardView;
