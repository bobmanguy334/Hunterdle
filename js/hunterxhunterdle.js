import "./hunters.js";

hunter_list.forEach(addToGuessList)

document.getElementById("guessDropdownInput").addEventListener("keyup", filterList)

var last_seven = []

var answer

setInterval(getNewAnswer,10)

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
  var table_data, table_column, table_card, table_card_body, table_card_text
  table_data = row.appendChild(document.createElement("td"))
  table_column = table_data.appendChild(document.createElement("div"))
  table_card = table_column.appendChild(document.createElement("div"))
  table_card_body = table_card.appendChild(document.createElement("div"))
  table_card_text = table_card_body.appendChild(document.createElement("div"))
  table_column.setAttribute("class","col")
  table_card.setAttribute("class","card")
  if (card_num == 0) {
    table_card_body.setAttribute("class","card-body card-body-name")
    table_card_text.setAttribute("class","card-text")
    table_card_text.innerHTML = guessed_hunter.toString()
  }
  else if (card_num == 2 || card_num == 3) { //do something on affiliation and nen type
    table_card_body.setAttribute("class","card-body card-body-fail")
    let correct_count = 0
    for (let i = 0; i < guessed_hunter.length; i++) {
      for (let j = 0; j < correct_hunter.length; j++) {
        if (guessed_hunter[i] == correct_hunter[j]) {
          correct_count++
          break
        }
      }
    }
    if (correct_count != correct_hunter. length) {
      if(correct_count != 0) {table_card_body.setAttribute("class","card-body card-body-partial")}
      else {table_card_body.setAttribute("class","card-body card-body-fail")}
    }
    else {table_card_body.setAttribute("class","card-body card-body-success")}
    table_card_text.setAttribute("class","card-text")
    table_card_text.innerHTML = guessed_hunter.toString().replace(",",'\n')
  }
  else {
    
    if (card_num == 5) {
      var img, arc, guess_arc_num, answer_arc_num
      img = document.createElement("img")
      table_card_text.setAttribute("class","card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
      for (arc in arc_timeline) {
        if(arc_timeline[arc] == guessed_hunter){guess_arc_num = arc}
        if(arc_timeline[arc] == correct_hunter){answer_arc_num = arc}
        console.log("Guess: "+guess_arc_num+"\nAnswer: "+answer_arc_num+"\nGuessed Hunter: "+guessed_hunter+"\nCorrect Hunter: "+correct_hunter)
      }
      if(guess_arc_num > answer_arc_num) {
        table_card_body.setAttribute("class","card-body card-body-fail")
        img.setAttribute("class","card-body-down-arrow")
        img.setAttribute("src","./assets/icons/arrow-down-square.svg")
        table_card_text.append(img)
      }
      else if(guess_arc_num < answer_arc_num) {
        table_card_body.setAttribute("class","card-body card-body-fail")
        img.setAttribute("class","card-body-up-arrow")
        img.setAttribute("src","./assets/icons/arrow-up-square.svg")
        table_card_text.append(img)
      }
      else {table_card_body.setAttribute("class","card-body card-body-success")}
    }
    else if(correct_hunter != guessed_hunter) {
      table_card_body.setAttribute("class","card-body card-body-fail")
      table_card_text.setAttribute("class","card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
    }
    else {
      table_card_body.setAttribute("class","card-body card-body-success")
      table_card_text.setAttribute("class","card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
    }
  }
}

async function getNewAnswer() { // bits and pieces right now
  function sleep(ms = 0) {return new Promise(resolve => setTimeout(resolve, ms))}
  if ((new Date().getUTCHours() == 11 && new Date().getUTCMinutes() == 0) || last_seven.length == 0) {
    answer = hunter_list[Math.floor(Math.random() * (hunter_list.length-1))]
    if (last_seven.length != 0) {document.getElementById("lastHunterText").innerHTML = answer[0]}
    if (last_seven.length == 7) {
      last_seven.pop()
      last_seven.unshift(answer)
    }
    else {last_seven.unshift(answer)}
    sleep(60000)
  }
}

function filterList() {
  var input, filter, ul, li, i
  input = document.getElementById("guessDropdownInput")
  filter = input.value.toUpperCase()
  ul = document.getElementById("guessDropdownOptions")
  li = ul.getElementsByTagName("li")
  for (i = 0; i < li.length; i++) {
    let txtValue = li[i].textContent || li[i].innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""
    }
    else {
      li[i].style.display = "none"
    }
  }
}