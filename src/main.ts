import "./style.css";

type State = {
  typeWord: string;
  word: any;
};

const state: State = {
  typeWord: "",
  word: null,
};

function getWordsForState() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${state.typeWord}`)
    .then((resp) => resp.json())
    .then((word) => {
      console.log(word);
      state.word = word[0];
      render();
    });
}

function renderSearchWord() {
  //     <div class="first-page">
  // <h2 class="english-dictionary">English Dictionary</h2>
  // <form>
  //  <input class="input" type="text" placeholder="Search a word">
  //  <button type="submit">
  //   <span class="material-symbols-outlined">
  //     search
  //   </span>
  //  </button>
  // </form>
  // <p>Type any existing word and press enter to get meaning,example,synanyms,etc</p>
  // </div>

  let main = document.querySelector(".main");
  if (main === null) return;
  main.textContent = "";

  let firstPage = document.createElement("div");
  firstPage.className = "first-page";

  let englishDictionary = document.createElement("h2");
  englishDictionary.className = "english-dictionary";
  englishDictionary.textContent = "English Dictionary";

  let formEl = document.createElement("form");

  let input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.placeholder = "Search a word";

  let buttonEl = document.createElement("button");
  buttonEl.type = "submit";

  let spanEl = document.createElement("span");
  spanEl.className = "material-symbols-outlined";
  spanEl.textContent = "search";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    state.typeWord = input.value;
    getWordsForState();
  });

  let text = document.createElement("p");
  text.textContent =
    "Type any existing word and press enter to get meaning, example, synonyms,etc";

  buttonEl.append(spanEl);
  formEl.append(input, buttonEl);
  firstPage.append(englishDictionary, formEl, text);
  main.append(firstPage);
}

function renderWordMeaning() {
  if (!state.word) return;

  let main = document.querySelector(".main");
  if (main === null) return;
  main.textContent = "";

  let secondPage = document.createElement("div");
  secondPage.className = "second-page";

  let englishDictionary = document.createElement("h2");
  englishDictionary.className = "english-dictionary";
  englishDictionary.textContent = "English Dictionary";

  let formEl = document.createElement("form");

  let input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.placeholder = state.typeWord || "Search a word";

  let buttonEl = document.createElement("button");
  buttonEl.type = "submit";

  let spanEl = document.createElement("span");
  spanEl.className = "material-symbols-outlined";
  spanEl.textContent = "search";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    let typeWord = input.value;
    state.typeWord = typeWord;
    getWordsForState();
  });

  let meaningExampleSynonymus = document.createElement("div");
  meaningExampleSynonymus.className = "menaing-example-synonyms";

  let meaning = document.createElement("div");
  meaning.className = "meaning";

  let meaningWord = document.createElement("h4");
  meaningWord.textContent = "meaning";

  let meaningP = document.createElement("p");

  let hr = document.createElement("hr");

  let example = document.createElement("div");
  example.className = "example";

  let exampleEl = document.createElement("h4");
  exampleEl.textContent = "Example";

  let exampleP = document.createElement("p");

  let hr2 = document.createElement("hr");
  let synonyms = document.createElement("div");
  synonyms.className = "synonyms";

  let synonymsH4 = document.createElement("h4");
  synonymsH4.textContent = "Synonyms";

  let synonymsP = document.createElement("p");

  let synonymsArray = [];
  for (let meaning of state.word.meanings) {
    synonymsArray.push(...meaning.synonyms);
  }

  for (let synonym of synonymsArray.slice(0, 4)) {
    let synonymA = document.createElement("a");
    synonymA.href = "#";
    synonymA.textContent = synonym;
    synonymsP.append(synonymA);

    synonymA.addEventListener("click", function () {
      state.typeWord = synonym;
      getWordsForState();
    });
  }

  let meaningData =
    state.word.meanings.find((meaning: any) =>
      meaning.definitions.some((definition: any) => definition.example)
    ) || state.word.meanings[0];

  let definitionData =
    meaningData.definitions.find((definition: any) => definition.example) ||
    meaningData.definitions[0];

  meaningP.textContent = definitionData.definition;
  exampleP.textContent = definitionData.example;

  meaning.append(meaningWord, meaningP);
  example.append(exampleEl, exampleP);
  synonyms.append(synonymsH4, synonymsP);
  meaningExampleSynonymus.append(meaning, hr, example, hr2, synonyms);
  buttonEl.append(spanEl);
  formEl.append(buttonEl, input);
  secondPage.append(englishDictionary, formEl, meaningExampleSynonymus);
  main.append(secondPage);
}

function render() {
  if (state.typeWord) renderWordMeaning();
  else renderSearchWord();
}

render();
