import "./hunters.js";

hunter_list.forEach(addToGuessList)

var last_seven = []

var answer = ["Isaac Netero","Male",["Hunter Association","Shingen-ryu Dojo"],["Enhancement"],"White","Hunter Exam"]

function addToGuessList(item) {
  let list_item = document.getElementById("guessDropdownOptions").appendChild(document.createElement("li")).appendChild(document.createElement("span"))
  list_item.setAttribute("class","dropdown-item")
  let list_img = list_item.appendChild(document.createElement("img"))
  let img_string = "assets/img/hunters/" + item[0].replace(" ","_") + ".png"
  list_img.setAttribute("src",img_string)
  list_img.setAttribute("class","guess-img")
  list_item.append(item[0])
  list_item.addEventListener("click", function guessEvent() {
    populateGuessCards(item[0])
  }
)
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
  else if (card_num == 2 || card_num == 3) { //do something on affiliation and nen type
    table_card_body.setAttribute("class","card-body card-body-fail")
    let correct_count = 0
    for (let i = 0; i < guessed_hunter.length; i++) {
      for (let j = 0; j < correct_hunter.length; j++) {
        if (guessed_hunter[i] == correct_hunter[j]) {
          correct_count++
          break;
        }
      }
    }
    if (correct_count != correct_hunter. length) {
      if(correct_count != 0) {
        table_card_body.setAttribute("class","card-body card-body-partial")
      }
      else {
        table_card_body.setAttribute("class","card-body card-body-fail")
      }
    }
    else {
      table_card_body.setAttribute("class","card-body card-body-success")
    }
  }
  else {
    if(correct_hunter != guessed_hunter) {table_card_body.setAttribute("class","card-body card-body-fail")}
    else {table_card_body.setAttribute("class","card-body card-body-success")}
  }
  table_card_text.setAttribute("class","card-text white-space: pre-line")
  table_card_text.innerHTML = guessed_hunter.toString().replace(",",'\n')
}

function getAnswer() { // bits and pieces right now
  let time = new Date().getUTCHours()
  if (Date.get)

  if (last_seven.length == 7) {
    last_seven.pop()
    last_seven.unshift(answer)
  }
  else {last_seven.unshift(answer)}
}