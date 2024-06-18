import "./hunters.js";

hunter_list.forEach(addToGuessList)

var answer = ["Pokkle","Male",["None"],["Unknown"],"Brown","Hunter Exam"]

var guess_button = document.getElementById("guessButton")

guess_button.addEventListener("click", function guessEvent() {
    populateGuessCards(document.getElementById("guessDatalist").value)
  }
)

function addToGuessList(item) {
  var list = document.getElementById("guessDatalistOptions")
  var option = document.createElement("option")
  option.value=item[0]
  list.appendChild(option)
}

function populateGuessCards(guess) {
 for (let i = 0; i < hunter_list.length; i++)
  {
    if(hunter_list[i][0] == guess)
      {
        const table_row = document.getElementById("guessTable").appendChild(document.createElement("tr"))
        table_row.setAttribute("class","guess-row-body")
        for (let j = 0; j < hunter_list[i].length; j++)
          {
            createGuessCard(hunter_list[i][j], answer[j], j, table_row)
          }
      }
  }
}

function createGuessCard(guessed_hunter, correct_hunter, card_num, row) {
  const table_data = row.appendChild(document.createElement("td"))
  const table_column = table_data.appendChild(document.createElement("div"))
  const table_card = table_column.appendChild(document.createElement("div"))
  const table_card_body = table_card.appendChild(document.createElement("div"))
  const table_card_text = table_card_body.appendChild(document.createElement("div"))
  table_column.setAttribute("class","col")
  table_card.setAttribute("class","card")
  if (card_num == 0) {table_card_body.setAttribute("class","card-body card-body-name")}
  else if (card_num == 2 || card_num == 3) {
    table_card_body.setAttribute("class","card-body card-body-fail")
    for (let i = 0; i < guessed_hunter.length; i++) {
      for (let j = 0; j < correct_hunter.length; j++) {
        if (guessed_hunter[i] == correct_hunter[j]) {
          table_card_body.setAttribute("class","card-body card-body-success")
          break;
        }
      }
    }
  }
  else {
    if(correct_hunter != guessed_hunter) {table_card_body.setAttribute("class","card-body card-body-fail")}
    else {table_card_body.setAttribute("class","card-body card-body-success")}
  }
  table_card_text.setAttribute("class","card-text")
  table_card_text.innerHTML = guessed_hunter.toString().replace(",","\n")
}