let history = JSON.parse(localStorage.getItem('history')) || [];

// Funkcija, lai pievienotu vērtību displejam
function appendValue(value) {
  const display = document.getElementById('display');
  display.value += value;
}

// Funkcija, lai aprēķinātu izteiksmi
function calculate() {
  const display = document.getElementById('display');
  try {
    const result = eval(display.value);
    if (result !== undefined) {
      addToHistory(display.value + ' = ' + result);
      display.value = result;
    }
  } catch (error) {
    alert('Nepareiza izteiksme!');
  }
}

// Funkcija, lai notīrītu displeju
function clearDisplay() {
  document.getElementById('display').value = '';
}

// Funkcija, lai pievienotu aprēķinu vēsturei
function addToHistory(entry) {
  history.push(entry);
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

// Funkcija, lai attēlotu vēsturi
function renderHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = entry;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Dzēst';
    deleteButton.onclick = () => deleteHistoryEntry(index);
    li.appendChild(deleteButton);
    historyList.appendChild(li);
  });
}

// Funkcija, lai dzēstu konkrētu vēstures ierakstu
function deleteHistoryEntry(index) {
  history.splice(index, 1);
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

// Funkcija, lai dzēstu visu vēsturi
function clearHistory() {
  history = [];
  localStorage.removeItem('history');
  renderHistory();
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);

}

// Ielādē vēsturi, kad lapa tiek atvērta
renderHistory();