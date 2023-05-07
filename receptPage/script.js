const params = new URLSearchParams(window.location.search)
const outputGerecht = document.getElementById("gerechtenReceptMain");

let gerID = params.get('idGerecht');
console.log(gerID);

$(document).ready(function() {
    let key = "5a96e9d54640422287e4331d708edf4a";

    $.ajax({
        type: "GET",
        contentType : 'application/json',
        //https://api.spoonacular.com/recipes/${gerID}/information?apiKey=${key}&includeNutrition=false
        url: `https://api.spoonacular.com/recipes/${gerID}/information?apiKey=${key}&includeNutrition=false`,
        success: function (res) {
            console.log(res);

            let gerechtTitel = res.title;
            let imgUrl = res.image;
            let beshr = res.summary;

            let cooktime = res.readyInMinutes;
            let servings = res.servings;

            //info

            let hartjes = res.aggregateLikes;
            let goedkoop = res.cheap;
            let dairyInfo = res.dairyFree;
            
            let glutenInfo = res.glutenFree;
            let healtScore = res.healthScore;
            let isVegan = res.vegan;
            let isvegetarian = res.vegetarian;
            let isveryHealthy = res.veryHealthy;
            let isveryPopular = res.veryPopular;


            let dischTypesString = "";
            let discTypeArray = res.dishTypes;
            let discTypeLength = res.dishTypes.length;

            if(discTypeLength != 0){
                for(let i = 0; i <= discTypeLength-1; i++){
                if(i == 0){
                    dischTypesString += `${discTypeArray[i]}`;
                }
                else{
                    dischTypesString += `, ${discTypeArray[i]}`;
                }
                }
            }
            

            let cuisinesString = "";
            let cuisinesArray = res.cuisines;
            let cuisinesLength = res.cuisines.length;

            if(cuisinesLength != 0){
                for(let i = 0; i <= cuisinesLength-1; i++){
                if(i == 0){
                    cuisinesString += `${cuisinesArray[i]}`;
                }
                else{
                    cuisinesString += `, ${cuisinesArray[i]}`;
                }
                }
            }
            
            
            let ingrString = "";
            let ingrLenght = res.extendedIngredients.length-1;
            for(let i = 0; i <= ingrLenght; i++){
                ingrString += `
                    <div class=ingrrr><span id=bold>${res.extendedIngredients[i].amount} ${res.extendedIngredients[i].measures.metric.unitShort}</span> ${res.extendedIngredients[i].name}</div>
                `;
            }

            let stepsString = "";
            let stepsLenght = res.analyzedInstructions[0].steps.length-1;
            for(let i = 0; i <= stepsLenght; i++){
                stepsString += `
                    <div class=steps><span id=bold>Step ${i+1}:</span> ${res.analyzedInstructions[0].steps[i].step}</div>
                `;
            }
            //INGR

            outputGerecht.innerHTML = `
                <div id="mainInfo">
                    <div id="img" style="background-image: url(${imgUrl}); background-size: cover; background-position: center;"></div>
                    <div id="infotje">
                        
                        <div id="gerechtTitel">${gerechtTitel}</div>
                        <div id=preInfo>Cooking time: ${cooktime} | Servings: ${servings} | Likes: ${hartjes} | Health score: ${healtScore}</div>
                        <div id="besch">${beshr}</div>
                        
                        <div id="mainInfo2">
                            <div id="img2" style="background-image: url(${imgUrl}); background-size: cover; background-position: center;"></div>
                            <div id="infoInzet">
                                <div id="cuisines"><span id=bold>Cuisines:</span> ${cuisinesString}</div>
                                <div id="dishType"><span id=bold>Dish type: </span>${dischTypesString}</div>
                                </br>
                                
                                <div id=""><span id=bold>Cheap:</span> ${goedkoop}</div>
                                <div id=""><span id=bold>Dairyfree:</span> ${dairyInfo}</div>
                                <div id=""><span id=bold>Glutenfree:</span> ${glutenInfo}</div>
                                <div id=""><span id=bold>Healthy:</span> ${healtScore} Points</div>

                                </br>
                                <div id=""><span id=bold>Vegan:</span> ${isVegan}</div>
                                <div id=""><span id=bold>Vegetarian:</span> ${isvegetarian}</div>
                                <div id=""><span id=bold>Healthy:</span> ${isveryHealthy}</div>
                                <div id=""><span id=bold>Popular:</span> ${isveryPopular}</div>
                            </div>
                            
                        </div><div>${res.instructions}</div>
                        <div id=someContainer>
                            <div id="">
                                <div id="gerechtTitel">Ingredients</div>
                                <div id="ingrdMain">
                                    ${ingrString}
                                </div>
                            </div>

                            <div id="">
                                <div id="gerechtTitel">Steps</div>
                                <div id="stepsMain">
                                    ${stepsString}
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    
                </div>

            `;
        }
    });
});


//<div id="">${}</div>








// <div id="info1">
//                     <div id="hartjes"><span id="hhHearth">&hearts;</span> ${hartjes}</div>
//                     <div id="infoMain">
//                         <div id="headers">Disch information</div>
//                         </br>
//                         <div id="">This dish is cheap?: <span class="infoUitkomst">${goedkoop}</span></div>
//                         <div id="">This dish is dairyfree?: <span class="infoUitkomst">${dairyInfo}</span></div>
//                         <div id="">This dish is glutenfree?: <span class="infoUitkomst">${glutenInfo}</span></div>
//                         </br>
//                         <div id="">Heathscore: <span class="infoUitkomst">${healtScore}</span></div>
//                         </br>
//                         <div id="">This dish is vegan?: <span class="infoUitkomst">${isVegan}</span></div>
//                         <div id="">This dish is vegetarian?: <span class="infoUitkomst">${isvegetarian}</span></div>
//                         <div id="">This dish is healthy?: <span class="infoUitkomst">${isveryHealthy}</span></div>
//                         <div id="">This dish is popular?: <span class="infoUitkomst">${isveryPopular}</span></div>
//                     </div>
//                 </div>