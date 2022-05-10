function Ffunction() { 
  nextclick();
  console.log('f');
}     
var questionBar = document.getElementById("question");
// var clickAfter = document.getElementById("next-clicker");
var answerBar = document.getElementById("answer");
// // display photo
// var photo = [];
// var pFirst = [];
// for(let i = 0; i<5; i++){
// photo[i] = document.getElementsByClassName("bigphoto")[i];
// pFirst[i] = i;
// console.log(photo[i])
// }
// var right = 1;
// var answer = 0;
// var answerr =1;
// var pCheck = 2;
// var pCurrent = 2;
// var state = 0;

function nextclick() {
  // questionBar.classList.remove("visible");
  questionBar.classList.add("invisible");
  // answerBar.classList.remove("invisible");
  answerBar.classList.add("visible-two");
  state = 0;
}

//   state = 1;

//   photo[pCurrent].classList.remove("visible");
//   photo[pCurrent].classList.add("invisible");

//   photo[pCheck].classList.add("visible");
//   photo[pCheck].classList.remove("invisible");f
// }

document.addEventListener("keydown", function (event) {
  if (event.key == "f" || event.key == "F") {
    nextclick();
    console.log('f');
    console.log("gg",questionData);
  }
});

document.addEventListener("keydown", function (event) {
  console.log('a');
  if(event.key == "a" || event.key == "A"){
    if(answer1.innerText == q.correctAnswer){
     showQuestion(1);
    }
    else{
      showQuestion(1);
    }
    console.log(right);
    backgroundChange();
    }
});
// document.addEventListener("keydown", function (event) {
// if(state==0){
//   if(event.key == "s" || event.key == "S"){
//     if(answer == right){
//         if(pCheck == 4){
//           pCheck = 4;
//         }
//         else{
//           pCurrent = pCheck;
//           pCheck = pCheck + 1;
//         }
//     }
//     else{
//         if(pCheck == 0){
//           pCheck = 0;
//         }  
//         else{
//           pCurrent = pCheck
//           pCheck = pCheck - 1;
//         }
//     }
//     console.log(right);
//     backgroundChange();
//   }
// }

// });
// document.addEventListener("keydown", function (event) {
// if(state==0){
//   if(event.key == "d" || event.key == "D"){
//     if(answerr == right){
//         if(pCheck == 4){
//           pCheck = 4;
//         }
//         else{
//           pCurrent = pCheck;
//           pCheck = pCheck + 1;
//         }
//     }
//     else{
//         if(pCheck == 0){
//           pCheck = 0;
//         }
//         else{
//           pCurrent = pCheck
//           pCheck = pCheck - 1;
//         }
//     }
//     console.log(right);
//     backgroundChange();
//   }
// }
// });