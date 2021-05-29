const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
let deckId = '';
$btnDrawCard = $('#btn-draw-card');
$cards = $('#cards');
//1
async function drawOne() {
    let response = await axios.get(`${BASE_URL}new/draw/`);
    console.log(`${response.data['cards'][0]['value']} of ${response.data['cards'][0]['suit']}`);
}
drawOne();


//2
async function drawTwo() {
    let res1 = await axios.get(`${BASE_URL}new/draw/`);
    let res2 = await axios.get(`${BASE_URL}${res1.data['deck_id']}/draw`);
    console.log(`${res1.data['cards'][0]['value']} of ${res1.data['cards'][0]['suit']}`);
    console.log(`${res2.data['cards'][0]['value']} of ${res2.data['cards'][0]['suit']}`);
}
drawTwo();

//3
// get a new shuffled deck
async function getShuffledDeck() {
    let response = await axios.get(`${BASE_URL}new/shuffle`)
    deckId = response.data['deck_id']
}

function endOfDeck() {
    $btnDrawCard.off('click');                  // remove the click handler that asked for a new card
    $btnDrawCard.on('click', () => {            // create a new click handler that reloads the page, effectively getting a new deck
        location.reload();
    })
    $btnDrawCard.text('New Deck')               // change the button text to reflect the new button action
    alert('That was the last card');            // let the user know they have drawn the last card from the deck
}

async function drawCard() {
    // ask the API for a new card from the deck
    let response = await axios.get(`${BASE_URL}${deckId}/draw/`)
    if(response.status === 200) {       // api responds with a success status
        if(response.data['cards'].length === 0) {       // check the cards array to see if it is empty
            endOfDeck();
        } else {
            $cards.prepend($(`<img src="${response.data['cards'][0]['image']}">`))      // add the card to the beggining of the card area
        }
    } else {
        console.log('API error');
    }
}
// hanlde user clicks on the Draw a Card button
$btnDrawCard.on('click', drawCard);
getShuffledDeck();