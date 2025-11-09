const lesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((data)=>display(data))
    .catch((error)=>console.log(error));
}
const loadLesson=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayWords(data.data))
    .catch((error)=>console.log(error));
    
};
const displayWords=(words)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML='';
    if(words.length===0){
        wordContainer.innerHTML=`
        <div class="col-span-3 text-center space-y-6">
                <img class="w-[96px] h-[96px] mx-auto" src="assets/alert-error.png" alt="">
                <h1 class="bangla text-xl font-medium text-gray-100">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
                <h1 class="bangla text-4xl text-gray-100 font-semibold">নেক্সট Lesson এ যান</h1>
        </div>
        `
    }
    // {
    // "id": 1,
    // "level": 3,
    // "word": "Abundant",
    // "meaning": null,
    // "pronunciation": "অবানডান্ট"
    // }
    words.forEach((word)=>{
        console.log(word);
        const wordDiv=document.createElement('div');
        wordDiv.innerHTML=`
        <div class="bg-white w-[300px] rounded-xl px-6 py-4 shadow-md text-center ">
                <h1 class="text-3xl font-bold">${word.word?word.word:'word not found'}</h1>
                <h1 class="text-1xl font-semibold mt-[10px]">Meaning /Pronounciation</h1>
                <h1 class="text-xl bangla text-black mt-[10px]">${word.meaning?word.meaning:'meaning not found'}/${word.pronunciation?word.pronunciation:'pronunciation not found'}</h1>
                <div class="flex justify-between items-center mt-[30px]">
                <button class="btn rounded-[8px] bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn rounded-[8px] bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
                

            </div>
        `;
        wordContainer.appendChild(wordDiv);
    })
}

const display=(lessons)=>{
    const lessonContainer=document.getElementById('lesson-div');
    lessonContainer.innerHTML='';
    for(let lesson of lessons.data){
        const button=document.createElement('div');
        button.innerHTML=`
        <button onclick="loadLesson(${lesson.level_no})" class="btn btn-soft btn-primary">lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(button);
    }
}
lesson();