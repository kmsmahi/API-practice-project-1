// Load all lessons
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(jsn => displayLessons(jsn.data))
    .catch(err => console.error(err));
};

// Pronounce word
function pronounceWord(word) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// Remove active class
const removeActive = () => document.querySelectorAll('.remove-act').forEach(btn => btn.classList.remove('active'));

// Load words for a lesson
const loadLevelWords = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(jsn => {
      removeActive();
      document.getElementById(`active-btn-${id}`).classList.add('active');
      displayLevelWords(jsn.data);
    })
    .catch(err => console.error(err));
};

// Display words in cards
const displayLevelWords = (words) => {
  const mainDiv = document.getElementById('words');
  mainDiv.innerHTML = '';

  if (!words || words.length === 0) {
    mainDiv.innerHTML = `
      <div class="col-span-full text-center p-6">
        <img src="assets/alert-error.png" class="mx-auto w-24 mb-2">
        <p class="font-bangla text-gray-500">এই Lesson এ কোন Vocabulary নেই।</p>
      </div>
    `;
    return;
  }

  words.forEach(word => {
    const wordCard = document.createElement('div');
    wordCard.className = "bg-white p-6 rounded-2xl shadow-md border border-gray-100 card-hover";

    wordCard.innerHTML = `
      <div class="flex flex-col gap-3 justify-center items-center text-center">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">${word.word || "No word"}</h1>
        <p class="text-sm md:text-lg font-medium text-gray-500">Meaning / Pronunciation</p>
        <h1 class="text-xl md:text-2xl font-bold text-blue-600 font-bangla">“${word.meaning || 'not found'} / ${word.pronunciation || 'not found'}"</h1>
      </div>
      <div class="flex justify-center gap-6 mt-4">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-3 shadow-md transition">
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <button onclick="pronounceWord('${word.word}')" class="btn bg-green-100 hover:bg-green-200 text-green-700 rounded-full p-3 shadow-md transition">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
    `;
    mainDiv.appendChild(wordCard);
  });
};

// Display lessons
const displayLessons = (lessons) => {
  const lessonBtn = document.getElementById('lesson-btn');
  lessonBtn.innerHTML = '';
  lessons.forEach(lesson => {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button id="active-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary remove-act text-blue-700 hover:bg-gray-200">
        <i class="fa-solid fa-graduation-cap text-blue-600"></i> Lesson-${lesson.level_no}
      </button>
    `;
    lessonBtn.appendChild(btnDiv);
  });
};

// Load word detail in modal
const loadWordDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(jsn => displayWordDetail(jsn.data))
    .catch(err => console.error(err));
};

// Create synonym pills
const createElements = (arr) => arr.map(item => `<span class="btn btn-sm btn-outline">${item}</span>`).join(' ');

// Display word detail in modal
const displayWordDetail = (word) => {
  const modalBox = document.getElementById('word-det-container');
  modalBox.innerHTML = `
    <div class="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-xl">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        ${word.word} <span class="text-gray-500 text-xl md:text-2xl font-medium">(${word.pronunciation})</span>
      </h1>
      <div class="text-center">
        <h2 class="text-lg font-semibold text-gray-700">Meaning</h2>
        <p class="text-base font-medium text-gray-800">${word.meaning}</p>
      </div>
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-800">Example</h2>
        <p class="text-base font-medium text-gray-700 leading-relaxed">${word.sentence}</p>
      </div>
      <div class="text-center">
        <h2 class="text-lg font-bold text-gray-800">সমার্থক শব্দ গুলো</h2>
        <div class="flex flex-wrap gap-2 justify-center mt-2">${createElements(word.synonyms)}</div>
      </div>
    </div>
  `;
  document.getElementById('my_modal_5').showModal();
};

// Search functionality
document.getElementById('btn-search').addEventListener('click', () => {
  const searchValue = document.getElementById('input-search').value.trim().toLowerCase();
  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(jsn => {
      const filtered = jsn.data.filter(word => word.word.toLowerCase().includes(searchValue));
      displayLevelWords(filtered);
    });
});

// Initialize
loadLessons();
