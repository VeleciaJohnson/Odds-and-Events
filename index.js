const app = document.querySelector("#app");

// State variables
const state = {
  numberBank: [],
  oddNumbers: [],
  evenNumbers: [],
};

// ---------- State ----------

function addNumber(number) {
  state.numberBank.push(number);
}

function sortNumber(number) {
  if (number % 2 === 0) {
    state.evenNumbers.push(number);
  } else {
    state.oddNumbers.push(number);
  }
}

function sortOne() {
  if (state.numberBank.length === 0) {
    return;
  }

  const firstNumber = state.numberBank.shift();
  sortNumber(firstNumber);
}

function sortAll() {
  while (state.numberBank.length > 0) {
    sortOne();
  }
}

// ---------- Component ----------

function NumberList(numbers) {
  return `
    <div class="number-list">
      ${
        numbers.length > 0
          ? numbers.map((number) => `<span class="number">${number}</span>`).join("")
          : `<p class="empty-message">No numbers yet.</p>`
      }
    </div>
  `;
}

function NumberForm() {
  return `
    <form id="number-form">
      <label for="number-input">Add a number</label>
      <input
        id="number-input"
        name="number"
        type="number"
        placeholder="Enter a number"
        required
      />
      <button type="submit">Add number</button>
    </form>
  `;
}

function NumberBank() {
  return `
    <section class="card">
      <h2>Number Bank</h2>
      ${NumberList(state.numberBank)}

      <div class="button-group">
        <button id="sort-one-button" type="button">Sort 1</button>
        <button id="sort-all-button" type="button">Sort All</button>
      </div>
    </section>
  `;
}

function SortedNumbers() {
  return `
    <section class="sorted-sections">
      <article class="card">
        <h2>Odds</h2>
        ${NumberList(state.oddNumbers)}
      </article>

      <article class="card">
        <h2>Evens</h2>
        ${NumberList(state.evenNumbers)}
      </article>
    </section>
  `;
}

function App() {
  return `
    <main>
      <h1>Odds and Events</h1>
      <p class="instructions">
        Add numbers to the bank, then sort them into odd and even categories.
      </p>

      ${NumberForm()}
      ${NumberBank()}
      ${SortedNumbers()}
    </main>
  `;
}

// ---------- Render ----------

function render() {
  app.innerHTML = App();

  const form = document.querySelector("#number-form");
  const sortOneButton = document.querySelector("#sort-one-button");
  const sortAllButton = document.querySelector("#sort-all-button");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const number = Number(formData.get("number"));

    addNumber(number);
    render();
  });

  sortOneButton.addEventListener("click", () => {
    sortOne();
    render();
  });

  sortAllButton.addEventListener("click", () => {
    sortAll();
    render();
  });
}

render();