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
    // wordContainer.innerHTML='';
    words.forEach((word)=>{
        console.log(word);
        const wordDiv=document.createElement('div');
        wordDiv.innerHTML=`
        
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