// started
let $ = document;
function _log(value) {
  console.log(value);
}
function _table(value) {
  console.table(value);
}

let autoComplateWrapper = $.querySelector(".search-input");
let searchInputElem = $.querySelector("input");
let autoComplateBox = $.querySelector(".autocom-box");

searchInputElem.addEventListener("keyup", function () {
  let searchValue = searchInputElem.value;

  if (searchValue) {
    autoComplateWrapper.classList.add("active");

    let filteredWords = suggestions.filter(function (word) {
      return word.toLowerCase().includes(searchValue.toLowerCase());
    //   return word.toLowerCase().startsWith(searchValue.toLowerCase());
    //   return word.toLowerCase().endsWith(searchValue.toLowerCase());
    });

    suggestionWordsGenerator(filteredWords);
  } else {
    autoComplateWrapper.classList.remove("active");
  }
});

function suggestionWordsGenerator(wordsArray) {
  let listItemsArray = wordsArray.map(function (word) {
    return "<li>" + word + "</li>";
  });

  let customListItem;
  if (!listItemsArray.length) {
    customListItem = "<li>" + searchInputElem.value + "</li>";
  } else {
    customListItem = listItemsArray.join("");
  }

  autoComplateBox.innerHTML = customListItem;
  select();
}

function select () {
    let allListItems = autoComplateBox.querySelectorAll('li');
    allListItems.forEach(function (wordItem){
        wordItem.addEventListener('click', function (event) {
            // searchInputElem.value = event.target.value;  // > 0 [false]
            // searchInputElem.value = event.target.innerHTML; // > 0 [special characters ]
            searchInputElem.value = event.target.textContent;  // > 1 [true]
            autoComplateWrapper.classList.remove("active");
        });
        
    });
}
