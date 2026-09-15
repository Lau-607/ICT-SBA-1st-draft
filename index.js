//open the pop up
function openModel() {
    // Show the overlay (which contains the information div)
    document.getElementById("modal-overlay").style.display = "flex";
    // Ensure the inner div is visible too
    document.getElementById("information").style.display = "block";
}

//close the pop up and reset form
function closeModel() {
    document.getElementById("modal-overlay").style.display = "none";
    const elements = document.getElementsByTagName("form");
    for (let ii = 0; ii < elements.length; ii++){
        elements[ii].reset();
    }
}


//Get Data
function collect_Stds(count = 40){
    const students = [];

    for (let i = 1; i < count; i++){
        const id = String(i).padStart(3, "0");
        const nameEl = document.getElementById(`S${id}-name`);
        const heightEl = document.getElementById(`S${id}-height`);
        const rankEl = document.getElementById(`S${id}-rank`);
        const typeEl = document.querySelector(`input[name="S${id}-type"]:checked`);

        const name = nameEl ? nameEl.value.trim() : "";
        const height = heightEl ? Number(heightEl.value) : NaN;
        const rank = rankEl ? Number(rankEl.value) : NaN;
        const behaviour = typeEl ? typeEl.value : "normal";

        if (!name && Number.isNaN(height) && Number.isNaN(rank)) {
            continue;
        }

        const student = {
            id: `S${id}`,
            name,
            height,
            rank,
            behaviour
        };

        students.push(student);
    }
    return students;
}

//Sort and output student based on their Rank
function rankStds(students){
    const studentsrank = [...students].sort((a, b) =>  a.rank - b.rank);
    const top3 = studentsrank.slice(0, 3);
    const bottom3 = studentsrank.slice(-3);
    console.log(top3);
    console.log(bottom3);
    for (let i = 0; i < top3.length; i++){
        document.getElementById(`top${i + 1}-name`).innerHTML = top3[i].name;
        document.getElementById(`bot${i + 1}-name`).innerHTML = bottom3[i].name;
    }
    const studentsAfterRank = studentsrank.slice(3, -3);
    console.log("Remaining Students after rank:", studentsAfterRank);
    return studentsAfterRank;
}

//Sort and output students based on their behaviour
function behaviourStds(studentsAfterRank){
    const studentsbehaviour = [...studentsAfterRank].sort((a,b) => a.height - b.height);
    const talktive = studentsbehaviour.filter(s => s.behaviour == "Talkative").slice(0, 6);
    const quiet = studentsbehaviour.filter(s => s.behaviour == "Quiet").slice(0, 6);
    console.log(talktive);
    console.log(quiet);
    for (let i = 0; i < talktive.length; i++){
        document.getElementById(`talk${i + 1}-name`).innerHTML = talktive[i].name;
        document.getElementById(`quiet${i + 1}-name`).innerHTML = quiet[i].name;
    }
    const studentsAfterbehaviour = studentsAfterRank.filter(s => s.behaviour !== "Talkative" && s.behaviour !== "Quiet");
    console.log("Remaining Students after behaviour:", studentsAfterbehaviour)
    return studentsAfterbehaviour        
}

//Sort and output the finalise setting plan based on their height
function heightStds(studentsAfterbehaviour){
    const studentsheight = [...studentsAfterbehaviour].sort((a,b) => a.height - b.height);
    for (let i = 0; i < studentsheight.length; i++){
        document.getElementById(`nor${i + 1}-name`).innerHTML = studentsheight[i].name;
    } 
}

//submit button clicked
function buttonSubmit(){
    const students = collect_Stds(41);
    console.log("All students collected:", students);
    console.log("Students count:", students.length);

    const studentsAfterRank = rankStds(students);

    const studentsAfterbehaviour = behaviourStds(studentsAfterRank);

    heightStds(studentsAfterbehaviour);
    
    closeModel();
}