const outputErrorMesage = document.getElementById("output");
const outputGerecht = document.getElementById("containerGerechten");

document.getElementById("buttonClick").addEventListener("click", ()=>{
    let food = document.getElementById("inputFood").value;
    if(outputGerecht.innerHTML != "" || outputGerecht.innerHTML != null && outputErrorMesage.innerHTML != "" || outputErrorMesage.innerHTML != null){
        outputGerecht.innerHTML = "";
        outputErrorMesage.innerHTML = "";
    }
    
    if(food == "" || food == null){
        outputErrorMesage.innerHTML = "Enter a meal!";
    }else{
        getrecepe(food);
    }
    
})

    let key = "5a96e9d54640422287e4331d708edf4a";
    function getsource(id){
        $.ajax({
            type: "GET",
            contentType : 'application/json',
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`,
            success: function (res) {
                console.log(res);
            }
        });
    }

    function getrecepe(q){
        $.ajax({
            type: "GET",
            contentType : 'application/json',
            url: `https://api.spoonacular.com/recipes/search?apiKey=${key}&number=150&query=${q}`,
            success: function (res) {
                console.log(res);
                if(res.results.length == 0){
                    outputErrorMesage.innerHTML = "Nothing found!";
                }else{

                    let aantalGerechten = res.results.length;
                    console.log(aantalGerechten);
                    
                    for(let i = 0; i <=aantalGerechten; i++){
                        let idGerecht = res.results[i].id;
                        let imageGerecht = res.results[i].image;
                        let berijdingGerecht = res.results[i].readyInMinutes;
                        let aantalPersGerecht = res.results[i].servings;
                        let sourceGerecht = res.results[i].sourceUrl; //NIET NODIG
                        let titleGerecht = res.results[i].title;

                        outputGerecht.innerHTML +=`
                            <div class="mainGerecht" >
                                <div class="imgGerecht" style="background-image: url(https://spoonacular.com/recipeImages/${imageGerecht}); background-size: cover; background-position: center;"></div>
                                <div class="titleGerecht">${titleGerecht}</div>
                                <div class="info">
                                    <div class="berijdingGerecht">Dish preparation time: ${berijdingGerecht} min</div>
                                    <div class="aantalPersGerecht">Suitable for: ${aantalPersGerecht} Persons</div>
                                    <div class="idGerecht"><a href="./receptPage/recept.html?idGerecht=${idGerecht}"><button class="idGerechtButton">Read more!</button></a></div>
                                </div>
                            </div>
                        `;
                    }
                }
            }
        });
    }