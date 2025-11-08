const lesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((data)=>display(data))
    .catch((error)=>console.log(error));
}
const display=(lessons)=>{
    const lessonContainer=document.getElementById('lesson-div');
    lessonContainer.innerHTML='';
    for(let lesson of lessons.data){
        const button=document.createElement('div');
        button.innerHTML=`
        <button class="btn btn-soft btn-primary">lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.append(button);
    }
}
lesson();