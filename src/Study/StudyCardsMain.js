import React, { Fragment,useEffect,useState } from "react";


import {
  Link,
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Header from "../Layout/Header"
import {readDeck} from "../utils/api/index"


export const StudyCardsMain = () => {
  const [visable, setVisable] = useState(true);

  const [currentCardIdx, setCurrentCardIdx] = useState(0);



  function isEven(n) {
    return n % 2 == 0;
 }
 
 function isOdd(n) {
    return Math.abs(n % 2) == 1;
 }

 function clickHandler(){
setCurrentCardIdx(currentCardIdx+1)
}





  const {deckId} = useParams()
  const { url } = useRouteMatch()

  const [Cards, setCards] = useState([]);
  const [Title, setTitle] = useState([]);
  useEffect(() => {
    readDeck(deckId)
    .then((response)=>{
      setTitle(response.name)
      setCards(response.cards)
    })
}
  , []);


//   use the readDeck function somehow
//   reqires flip button
//   reqires next button
//   access cards within the specific deck and show them using readDeck
  let collectionOfCards = []


const cardForm = Cards.map((v,idx)=>{
let frontCard = (
  <div>
  <h1> Card {idx + 1}  of {Cards.length}</h1>
  <h2>{v.front}</h2>
  <button onClick={clickHandler}>
    Flip
  </button>
  </div> 
)
let backCard = (
  <div>
  <h1> Card {idx + 1}   of {Cards.length}</h1>
  <h2>{v.back}</h2>
  <button onClick={clickHandler}>
    Next
  </button>
  </div> 
)
collectionOfCards.push(frontCard)
collectionOfCards.push(backCard)
  })

// if(currentCardIdx > collectionOfCards.length){window.confirm()}


  
  return (
      <Fragment>   
      <Header/>
      <h1>Study:{Title}</h1>
      <div>
        {collectionOfCards[currentCardIdx]}
      </div>

{cardForm}

{/* {if(currentCardIdx > collectionOfCards.length){window.confirm()}} */}

      </Fragment>  

  );
}
  
export default StudyCardsMain;