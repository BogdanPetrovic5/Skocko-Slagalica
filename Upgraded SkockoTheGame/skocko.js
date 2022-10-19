
$(document).ready(function(){
    
    $(".slika").addClass("disabled")
   
    $("#undo_button").addClass("disabled")
    let seconds = 120
    let odbrojavanje

    popuniSimbole()
   
    
    let finalnaKombinacija = []
    function promesajSimbole(niz){
        let index = niz.length - 1;
        while(index>0){
            let nasumicnaPozicija=Math.floor(Math.random() * index);
            let temp=niz[index];
            niz[index]=niz[nasumicnaPozicija];
            niz[nasumicnaPozicija]=temp;
            index--;
        }
        return niz;
    }
    function popuniSimbole() {
        let simboli = []
        for(let i = 1; i < 7; i++){
            simboli.push("slike/" + i + ".png")
            simboli.push("slike/" + i + ".png")
            simboli.push("slike/" + i + ".png")
            
        }
        simboli = promesajSimbole(simboli)
        for(let i = 1; i < 5; i++){
            $("#" + i).append($("<img>").attr("src", simboli[i]).attr("id", "slika1" + i).css({
                "width" : "50px",
                "height" : "50px",
                
            
            }).attr("class", "fSymbols").hide())
        }
    }   

    let i = 1;
    let j = 1;
    let n = 1
    let m = 1
    let x = 1
    let c = 0
    let counter = 0
    let counterPonavljanja = 0;
    let kombinacijaTacnih = []
    let kombinacijaNeTacnih = []
    let zutaKombinacijaNiz = []
    let kombinacijaOstaloTacno = []
    $(".slika").click(function(){
        
        if($(this).attr("id") !="undo_button" ){
            $("#" + i + j).append($("<img>").attr("src", $(this).attr("src")).attr("id", "slika" + i + j).css({
                "width" : "50px",
                "height" : "50px",
            }))
            j++
            $("#undo_button").removeClass("disabled")
        }
        
        if(($(this).attr("id") == "undo_button")){
            $("#slika" + i + (j - 1)).remove()
            j-=1
            if(j == 1){
                $("#undo_button").addClass("disabled")
            }

        }
        if( j > 4){
            provera() 
            zutaKombinacijaNiz = []
            kombinacijaTacnih = []
            kombinacijaNeTacnih = []
            counter = 0
            counterPonavljanja = 0
            kombinacijaOstaloTacno = []
            finalnaKombinacija = []
            x++
            n++
            m = 1
            i ++
            j = 1
            $("#undo_button").addClass("disabled")
        }
    })

    function provera(){
        
            for(let j = 1; j < 5; j++){
                finalnaKombinacija.push($("#" + j).find("img").filter("#slika1" + j ).attr("src"))
            }

            
            for(let j = 1; j < 5; j ++){
                if($("#" + x + j).find("img").filter("#slika" + x + j).attr("src") == $("#" + j).find("img").filter("#slika1" + j).attr("src")){
                    $("#field" + n + m).css("background-color", "red")
                    kombinacijaTacnih.push($("#" + x + j).find("img").filter("#slika" + x + j).attr("src"))
                    counter++
                    m++
                
                }else{
                    kombinacijaNeTacnih.push($("#" + x + j).find("img").filter("#slika" + x + j).attr("src"))
                    kombinacijaOstaloTacno.push($("#" + j).find("img").filter("#slika1" + j).attr("src"))
                }
            }
            for( let i = 0; i < kombinacijaNeTacnih.length; i++){
                    for(let j = 0; j < kombinacijaOstaloTacno.length; j++){
                        if(kombinacijaNeTacnih[i] == kombinacijaOstaloTacno[j]){
                            $("#field" + n + m).css("background-color", "yellow")
                            m++
                            kombinacijaNeTacnih.splice(i, 1)
                            kombinacijaOstaloTacno.splice(j, 1)
                        j--
                        i--
                        }
                    }
            }
        if(counter == 4 || (j > 4 && i == 6)){
            $(".fSymbols").show(1000)
            $(".slika").addClass("disabled")
        }
        if(counter == 4 ){
            $(".timer1").hide(1000)
            $(".timer").html("YOU WON").css({"font-size" : "70px",
                "text-align" : "center",
                "padding-top" : "25px"
            })
            $(".slika").addClass("disabled")
            clearInterval(odbrojavanje)
            
        }
        if((j > 4 && i == 6 && counter != 4)){
            $(".timer1").hide(1000)
            $(".timer").html("YOU LOST").css({"font-size" : "70px",
                "text-align" : "center",
                "padding-top" : "25px"
            })
            $(".slika").addClass("disabled")
            clearInterval(odbrojavanje)
        }
        
        
    }
    $("#play").click(function(){
        $(".slika").removeClass("disabled")
        $("#undo_button").addClass("disabled")
        $("#play").addClass("disabled")
        $("#dobro_vece").get(0).play()
            odbrojavanje = setInterval(function(){
            
            if(seconds == 0 ){
                $(".slika").addClass("disabled")
                $(".fSymbols").show(1000)
                clearInterval(odbrojavanje)
                $("#tajmer").hide(1000)
                $(".timer1").hide(1000)
                $(".timer").html("YOU LOST").css({"font-size" : "70px",
                "text-align" : "center",
                "padding-top" : "25px"
            })   
                    
                
                
            }
            $(".timer1").html(seconds).css({"font-size" : "100px",
                "text-align" : "center",
            })
            seconds--;
            
        }, 1000)
    
    })


    
})