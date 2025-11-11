const lesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => display(data))
    .catch(error => console.log(error));
};
const manageSpinner=(status)=>{
    if(status===true) {
      document.getElementById('spinner').classList.remove('hidden');
      document.getElementById('word-container').classList.add('hidden');

    }
    else{
      document.getElementById('spinner').classList.add('hidden');
      document.getElementById('word-container').classList.remove('hidden');
    }
}

const loadLesson = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeAct();
      if (!data.data) {
        console.log("No words found for this lesson");
        return;
      }
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      if (clickBtn) clickBtn.classList.add("active");

      displayWords(data.data);
    })
    .catch(error => console.log(error));
};

const removeAct = () => {
  const buttons = document.getElementsByClassName("lesson-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadWordDetails = async (wordId) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.data) {
      openModalWithWordDetails(data.data);
    } else {
      console.log("No detail found for this word");
    }
  } catch (error) {
    console.log(error);
  }
};

const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="col-span-3 text-center space-y-6">
        <img class="w-[96px] h-[96px] mx-auto" src="assets/alert-error.png" alt="">
        <h1 class="bangla text-xl font-medium text-gray-100">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
        <h1 class="bangla text-4xl text-gray-100 font-semibold">নেক্সট Lesson এ যান</h1>
      </div>
    `;
    return;
  }

  words.forEach(word => {
    const wordDiv = document.createElement("div");
    // assume word.id is the unique word id in API
    const wordId = word.id; 
    wordDiv.innerHTML = `
      <div class="bg-white w-[300px] rounded-xl px-6 py-4 shadow-md text-center">
        <h1 class="text-3xl font-bold">${word.word || "word not found"}</h1>
        <h1 class="text-1xl font-semibold mt-[10px]">Meaning /Pronunciation</h1>
        <h1 class="text-xl bangla text-black mt-[10px]">
          ${word.meaning || "meaning not found"} / ${word.pronunciation || "pronunciation not found"}
        </h1>
        <div class="flex justify-between items-center mt-[30px]">
          <button onclick="loadWordDetails(${wordId})" class="btn rounded-[8px] bg-[#1A91FF10] hover:bg-[#1A91FF60]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn rounded-[8px] bg-[#1A91FF10] hover:bg-[#1A91FF60]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.appendChild(wordDiv);
  });
};

const display = (lessons) => {
  const lessonContainer = document.getElementById("lesson-div");
  lessonContainer.innerHTML = "";

  for (let lesson of lessons.data) {
    const button = document.createElement("div");
    button.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}"
              onclick="loadLesson(${lesson.level_no})"
              class="btn btn-soft btn-primary lesson-btn">
        Lesson - ${lesson.level_no}
      </button>
    `;
    lessonContainer.append(button);
  }
};

// Modal helper functions (from initial code above)
const openModalWithWordDetails = (wordObj) => {
  const modal = document.getElementById('info-modal');
  document.getElementById('modal-word').textContent = wordObj.word || 'Not Found';
  document.getElementById('modal-meaning').textContent = 'Meaning: ' + (wordObj.meaning || 'Not available');
  document.getElementById('modal-pronunciation').textContent = 'Pronunciation: ' + (wordObj.pronunciation || 'Not available');
  document.getElementById('modal-example').textContent = wordObj.example || '';
  document.getElementById('modal-synonyms').textContent = wordObj.synonyms ? 'Synonyms: ' + wordObj.synonyms.join(', ') : '';
  
  modal.classList.remove('hidden');
};

const closeModal = () => {
  document.getElementById('info-modal').classList.add('hidden');
};

document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('info-modal').addEventListener('click', (e) => {
  if (e.target.id === 'info-modal') {
    closeModal();
  }
});

lesson();
