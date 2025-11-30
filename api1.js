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
const loadLevelWords = (id) =>{
   const url=`https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
   .then((res)=>res.json())
   .then((jsn)=>{
    displayLevelWords(jsn.data);
   })
   .catch((err)=>{
    console.log(err);
   })
};
const displayLevelWords=(words)=>{
    const mainDiv=document.getElementById('words');
    mainDiv.innerHTML='';
    for(let word of words){
      const wordCard=document.createElement('div');
      wordCard.innerHTML=`
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md mx-auto">
  
  <!-- Word Section -->
  <div class="flex flex-col gap-3 justify-center items-center text-center">
    <h1 class="text-3xl font-bold text-gray-800">
      ${word.word}
    </h1>

    <p class="text-lg font-medium text-gray-500">
      Meaning / Pronunciation
    </p>

    <h1 class="text-2xl font-bold text-blue-600 font-bangla">
      “${word.meaning} / ${word.pronunciation}”
    </h1>
  </div>

  <!-- Action Buttons -->
  <div class="flex justify-between gap-6 mt-6">
    <button class="btn bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-3 shadow-md transition">
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
       <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary text-blue-700 hover-btn"><span><i class="fa-solid fa-graduation-cap" style="color: #0965ab;"></i></span>Lesson-${lesson.level_no}</button>
      `
      Lessonbtn.append(btnDiv);
    }
}
loadLessons();