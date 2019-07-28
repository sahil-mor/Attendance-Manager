if(Number($(".lectureP").text()) >= 50){
    $(".circleLec").addClass("over50")
}       
if(Number($(".tutP").text()) >= 50){
    $(".circleTut").addClass("over50")
}   
if(Number($(".labP").text()) >= 50){
    $(".circleLab").addClass("over50")
}         
$(".progress-circle.over50 .first50-bar ").css("background-color","#337ab7")
$(".value-bar").css("border-color","#337ab7")