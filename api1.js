// load all the lessons and display in console
const loadLessons=()=>{
  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then((res)=>res.json())
  .then((jsn)=>{
    displayLessons(jsn.data);
  })
  .catch((error)=>{
    console.log(error);
  })
};
const removeactive=()=>{
  const allBtn=document.querySelectorAll('.remove-act');
  allBtn.forEach((btn)=>{
    btn.classList.remove('active');
  })
};
const loadLevelWords = (id) =>{
   const url=`https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
   .then((res)=>res.json())
   .then((jsn)=>{
    removeactive();
    const clickBtn=document.getElementById(`active-btn-${id}`);
    clickBtn.classList.add('active');
    displayLevelWords(jsn.data);
   })
   .catch((err)=>{
    console.log(err);
   })
};
const displayLevelWords=(words)=>{
    const mainDiv=document.getElementById('words');
    mainDiv.innerHTML='';
    if(words.length===0){
      mainDiv.innerHTML=`
      <div class="flex flex-col gap-3 justify-center items-center col-span-full p-4">
       <img src="assets/alert-error.png" alt="">
      <p class="font-bangla text-[18px] font-medium text-[#79716b] text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="font-bangla text-[34px] font-semibold text-[#292524] text-center">নেক্সট Lesson এ যান </h1>
    </div>
      `
    }
    for(let word of words){
      const wordCard=document.createElement('div');
      wordCard.innerHTML=`
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md mx-auto">
  
  <!-- Word Section -->
  <div class="flex flex-col gap-3 justify-center items-center text-center">
    <h1 class="text-3xl font-bold text-gray-800">
      ${word.word ? word.word : "No word found"}
    </h1>

    <p class="text-lg font-medium text-gray-500">
      Meaning / Pronunciation
    </p>

    <h1 class="text-2xl font-bold text-blue-600 font-bangla">
      “${word.meaning ? word.meaning : 'not found'} / ${word.pronunciation ? word.pronunciation : 'not found'}"
    </h1>
  </div>

  <!-- Action Buttons -->
  <div class="flex justify-between gap-6 mt-6">
    <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-3 shadow-md transition">
      <i class="fa-solid fa-circle-info"></i>
    </button>

    <button class="btn bg-green-100 hover:bg-green-200 text-green-700 rounded-full p-3 shadow-md transition">
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>

</div>

      `
    mainDiv.append(wordCard);
    };
    
};

const displayLessons=(lessons)=>{
    const Lessonbtn=document.getElementById('lesson-btn');
    Lessonbtn.innerHTML='';
    for(let lesson of lessons){
      const btnDiv=document.createElement('div');
      btnDiv.innerHTML=`
       <button id="active-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary text-blue-700 hover-btn remove-act"><span><i class="fa-solid fa-graduation-cap" style="color: #0965ab;"></i></span>Lesson-${lesson.level_no}</button>
      `
      Lessonbtn.append(btnDiv);
    }
};
    const loadWordDetail=(id)=>{
        const url=`https://openapi.programming-hero.com/api/word/${id}`;
        fetch(url)
        .then((res)=>res.json())
        .then((jsn)=>{
          displayWordDetail(jsn.data);
        })
    };
//     {
//   "status": true,
//   "message": "successfully fetched a word details",
//   "data": {
//     "word": "Tranquil",
//     "meaning": "শান্ত / নিরিবিলি",
//     "pronunciation": "ট্রাঙ্কুইল",
//     "level": 6,
//     "sentence": "The park was a tranquil place to relax.",
//     "points": 4,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//       "peaceful",
//       "calm",
//       "serene"
//     ],
//     "id": 20
//   }
// }
const createlements=(arr)=>{
 const htmlElements= arr.map((item)=>`<span class="btn">${item}</span>`);
 return (htmlElements.join(' '));
}
    const displayWordDetail=(word)=>{
      const modalBox=document.getElementById('word-det-container');
      modalBox.innerHTML=`
      <div class="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-xl max-w-lg mx-auto">

  <!-- Word + Pronunciation -->
  <h1 class="text-4xl font-bold text-gray-800 text-center">
    ${word.word}
    <span class="text-gray-500 text-2xl font-medium">(${word.pronunciation})</span>
  </h1>

  <!-- Meaning Section -->
  <div class="text-center">
    <h2 class="text-lg font-semibold text-gray-700 mb-1">Meaning</h2>
    <p class="text-base font-medium text-gray-800">${word.meaning}</p>
  </div>

  <!-- Example Section -->
  <div class="text-center">
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Example</h2>
    <p class="text-base font-medium text-gray-700 leading-relaxed">
      ${word.sentence}
    </p>
  </div>

  <!-- Synonyms Section -->
  <div class="text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-3">
      সমার্থক শব্দ গুলো
    </h2>

    <div class="flex flex-wrap gap-2 justify-center">
      ${createlements(word.synonyms)}
    </div>
  </div>

</div>

      `;
      document.getElementById('my_modal_5').showModal();
    };
    
loadLessons();