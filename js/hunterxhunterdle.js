import "./hunters.js";

hunter_list.forEach(addToGuessList)

const guessDropdownInput = document.getElementById("guessDropdownInput")
const guessDropdownOptions = document.getElementById("guessDropdownOptions")

guessDropdownInput.addEventListener("keyup", filterList)

const last_seven = []

var answer
//var answer = ["Gon Freecss","Male",["Hunter Association"],["Enhancement"],"Black","Hunter Exam"]

getNewAnswer()

function addToGuessList(item) {
  const list_item = document.createElement("li")
  list_item.classList.add("dropdown-item")

  const list_img = document.createElement("img")
  list_img.src = `assets/img/hunters/${item[0].replace(" ","_")}.png`
  list_img.classList.add("guess-img")
  list_item.appendChild(list_img)

  const span = document.createElement("span");
  span.textContent = item[0];
  list_item.appendChild(span);

  list_item.addEventListener("click", () => {
    populateGuessCards(item[0])
  })

  document.getElementById("guessDropdownOptions").appendChild(list_item)
}

function populateGuessCards(guess) {
  for (let i = 0; i < hunter_list.length; i++) { //search through the Hunter list to find the answer
    if (hunter_list[i][0] == guess) {
      var table, table_row
      table = document.getElementById("guessTable")
      table_row = document.createElement("tr")
      table.insertBefore(table_row, table.firstChild)
      table_row.setAttribute("class","guess-row-body")
      for (let j = 0; j < hunter_list[i].length; j++) {
        createGuessCard(hunter_list[i][j], answer[j], j, table_row)
      }
      if (guess == answer[0])
      {
        winTheGame()
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
  table_column.classList.add("col")
  table_card.classList.add("card")
  if (card_num == 0) {
    table_card_body.classList.add("card-body", "card-body-name")
    table_card_text.classList.add("card-text")
    table_card_text.innerHTML = guessed_hunter.toString()
  }
  else if (card_num == 2 || card_num == 3) { //Seperates affiliation and nen type into seperate lines
    table_card_body.classList.add("card-body", "card-body-fail")
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
      if(correct_count != 0) {table_card_body.classList.add("card-body", "card-body-partial")}
      else {table_card_body.classList.add("card-body", "card-body-fail")}
    }
    else {table_card_body.classList.add("card-body", "card-body-success")}
    table_card_text.classList.add("card-text")
    table_card_text.innerHTML = guessed_hunter.toString().replace(",",'\n')
  }
  else { //Create up or down arrow depending on Arc number
    if (card_num == 5) {
      var img, arc, guess_arc_num, answer_arc_num
      img = document.createElement("img")
      table_card_text.classList.add("card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
      for (arc in arc_timeline) {
        if(arc_timeline[arc] == guessed_hunter){guess_arc_num = arc}
        if(arc_timeline[arc] == correct_hunter){answer_arc_num = arc}
      }
      if(guess_arc_num > answer_arc_num) {
        table_card_body.classList.add("card-body", "card-body-fail")
        img.classList.add("card-body-down-arrow")
        img.src = "./assets/icons/arrow-down-square.svg"
        table_card_text.append(img)
      }
      else if(guess_arc_num < answer_arc_num) {
        table_card_body.classList.add("card-body", "card-body-fail")
        img.classList.add("card-body-up-arrow")
        img.src = "./assets/icons/arrow-up-square.svg"
        table_card_text.append(img)
      }
      else {table_card_body.classList.add("card-body", "card-body-success")}
    }
    else if (correct_hunter != guessed_hunter) {
      table_card_body.classList.add("card-body", "card-body-fail")
      table_card_text.classList.add("card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
    }
    else {
      table_card_body.classList.add("card-body", "card-body-success")
      table_card_text.classList.add("card-text")
      table_card_text.innerHTML = guessed_hunter.toString()
    }
  }
}

async function getNewAnswer() { // Does this work? Unclear.
  function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  if (!answer) {
    answer = hunter_list[Math.floor(Math.random() * hunter_list.length)]
  }
  if (new Date().getUTCHours() === 23 && new Date().getUTCMinutes() === 0) {
    // Select a random hunter from hunter_list
    const filtered_list = hunter_list.filter(e => !last_seven.includes(e))
    console.log(filtered_list)
    answer = filtered_list[Math.floor(Math.random() * filtered_list.length)]

    //Sets the Last Hunter text to whatever the last hunter was
    if (last_seven.length !== 0) {
      document.getElementById("lastHunterText").innerHTML = answer[0]
    }

    //Checks if last 7 has 7 entries. Pops and replaces if so, otherwise just adds it.
    if (last_seven.length === 7) {
      last_seven.pop();
      last_seven.unshift(answer);
    } 
    else {
      last_seven.unshift(answer);
    }
  }
  await sleep(60000)

  getNewAnswer()
}

function filterList() {
  var input, filter, li, i
  input = guessDropdownInput
  filter = input.value.toUpperCase()
  li = guessDropdownOptions.getElementsByTagName("li")
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

function winTheGame() {
  
  guessDropdownInput.disabled = true
  guessDropdownInput.placeholder = "You Won!"
  guessDropdownOptions.style.display = "none"

  const modal = document.getElementById("victoryModal")
  const closeButton = modal.querySelector(".close")

  modal.style.display = "block"

  // Close the modal when clicking on the close button or outside the modal
  closeButton.onclick = function() {
    modal.style.display = "none"
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
}