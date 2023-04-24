import React, { Fragment,useState,useEffect } from "react";

import {
  Link,
  NavLink,BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Layout from "./Layout/index"
import StudyCardsMain from "./Study/StudyCardsMain"
import DeckProfileMain from "./DeckProfile/DeckProfileMain"
import CreateDeck from "./CreateDeck/CreateDeck"
import AddCardMain from "./AddCard/AddCardMain"
import {listDecks} from "./utils/api/index"


// import NotFound from "./common/NotFound"
// import CardList from "./home/CardList";
// import User from "./user/User";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */





function App() {
  const [Decks, setDecks] = useState([]);
  useEffect(() => {
    listDecks()
    .then((response)=>{
      console.log(response)
      setDecks(response)
    })
}
  , []);
  
  const[Cards,setCards] = useState([])

  
    function addDeck(newDeck) {
    setDecks([
      ...Decks,
      newDeck
    ]);
  }
  
      function addCard(newCard) {
    setCards([
      ...Cards,
      newCard
    ]);
  }
  
  //   function replaceBear(oldBear, newBear) {
  //   // map over the array and replace the bear we're looking for
  //   // (keeping all the other bears the same)
  //   let editCard = bears.map(bear => bear === oldBear ? newBear : bear);
  //   setBears(updatedBears);
  // }

  
  //  function deleteBear(bearToDelete) {
  //   let filteredBears = bears.filter(bear => bear !== bearToDelete);
  //   setBears(filteredBears);
  // }
  
    let initialDeckData = {
    name: '',
    description: '',
  }
    
        let initialCardData = {
    name: '',
    description: '',
  }

        
        
        
        
  return (
      <Fragment>    
    <div className="app-routes">
<Router>
      <Switch>
        <Route exact path="/">
          <Layout Decks={Decks}/>
        </Route>
                <Route exact path="/decks/new">
          <CreateDeck submitHandler={addDeck} header="Create Deck" initialFormData={initialDeckData} />
        </Route>
     <Route exact path="/decks/:deckId/cards/new">
          <AddCardMain submitHandler={addCard} header="Add Card" initialFormData={initialCardData} />
        </Route>
         <Route exact path="/decks/:deckId">
          <DeckProfileMain />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyCardsMain />
        </Route>

      </Switch>
      </Router>

    </div>
       </Fragment>
  );
}

export default App;
