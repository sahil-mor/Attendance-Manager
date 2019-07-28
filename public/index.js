if(Number($("h1 em").text()) > 50){
    $(".initial").addClass("over50")
}
for(var j = 1; j <= $(".col-md-4").length ; j++){
    if(Number($("#" + j).text()) > 50){
        $("." + j).addClass("over50")
    }
    if(Number($("#" + j).text()) >= Number($("h1 em").text())){
        $("#1" + j).css("border-color","green")
        $("." + j+" #2" + j).css("background-color","green")
        var attended = Number($(".attended" + j).text())
        var total = Number($(".total" + j).text())
        var count = 0;
        var checkForAttended = attended
        var checkForTotal = total;
        console.log(checkForAttended + "  " + checkForTotal)
        while((checkForAttended/checkForTotal * 100) >= Number($("h1 em").text())){
            console.log("in looop")
            checkForTotal++;
            count++;
        }
        count--
        if(count == 0){
            $(".note" + j).html('<i class="fa fa-star" aria-hidden="true"></i>' + "  YOU CANNOT MISS ANY CLASS FROM HERE")
            $(".note" + j).css("color","#d9534f")	
        }else if(count == 1){
            $(".note" + j).html('<i class="fa fa-star" aria-hidden="true"></i>' + "  YOU CAN MISS NEXT CLASS")
            $(".note" + j).css("color","green")
        }else{
            $(".note" + j).html('<i class="fa fa-star" aria-hidden="true"></i>' + "  YOU CAN MISS NEXT " + count + " CLASSES")
            $(".note" + j).css("color","green")
        }
    }
    else{
        $("#1" + j).css("border-color","red")
        $("." + j+" #2" + j).css("background-color","red")
        var attended = Number($(".attended" + j).text())
        var total = Number($(".total" + j).text())
        var count = 0;
        var checkForAttended = attended
        var checkForTotal = total;
        while((checkForAttended/checkForTotal * 100) < Number($("h1 em").text())){
            checkForAttended++;
            checkForTotal++;
            count++;
        }
        $(".note" + j).html('<i class="fa fa-star" aria-hidden="true"></i>' + "  YOU NEED TO ATTEND NEXT " + count + " CLASSES")
        $(".note" + j).css("color","#d9534f")	
    }
}
if($(".col-md-4").length % 2 == 0){
    if($(".col-md-4").length / 2 <= 2)
        $(".col-md-4").addClass("col-lg-6")
    else if($(".col-md-4").length % 4 == 0) {
        $(".col-md-4").addClass("col-lg-3")
    }
    else if($(".col-md-4").length / 6 > 1 && $(".col-md-4").length % 6 == 0){
        $(".col-md-4").addClass("col-lg-2")
    }
}
else if($(".col-md-4").length == 1){
    $(".col-md-4").addClass("col-lg-12")
}