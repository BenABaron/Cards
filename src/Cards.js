import { useState } from "react";


function Cards() {

  const [card, setCard] = useState('');
  const [deck, setDeck] = useState('');
  const [deckCount, setDeckCount] = useState(0);
  const [error, setError] = useState('');

  function increaseDeckCount() {
    setDeckCount(deckCount + 1)
  }

  function newDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(
        (result) => {
          setDeck(result.deck_id)
          setDeckCount(deckCount + 1)
        },
        (error) => {
          setError(error)
        }
      )
  }

  function drawCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(response => response.json())
    .then(
      (result) => {
        let newCard = result.cards[0].value + " of " + result.cards[0].suit;
        let newCardLowercase = newCard.toLowerCase();
        setCard(newCardLowercase)
      },
      (error) => {
        setError(error)
      }
    )

  }

  return(
    <div>
      <button onClick={() => newDeck()}>Get Deck</button>
      <button onClick={() => drawCard()}>Draw a card</button>
      <p>Your card is the {card}</p>
    </div>
  )
}

export default Cards;