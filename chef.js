// Ingredients list
var ingredients = {
  bread: ["corn bread","ciabatta bread","rice milk rolls"],
  main:  ["salmon","camembert","pumpkin chips"],
  sauce: ["mustard","honey","hummus"]
};


// Not allowed ingredients per type
var ingredientsNotAllowed = {
  bread: {
    //                 pumpkin chips         honey
    'corn bread'     : [ingredients.main[2], ingredients.sauce[1]],
    //                 salmon                honey                 mustard
    'rice milk rolls': [ingredients.main[0], ingredients.sauce[1], ingredients.sauce[0]],
  },
  main: {
    //                 rice milk rolls        honey
    'salmon'         : [ingredients.bread[2], ingredients.sauce[1]],
    "camembert"      : ["hummus"],
    "pumpkin chips"  : ["corn bread", "honey"],
  }
};


// This function make the sandwich
function makeMeASandwich() {

  // create or empty `sandwich`
  var recipe = [];

  var b = pickRandom(ingredients.bread);
  var m = pickRandom(ingredients.main);
  var s = pickRandom(ingredients.sauce);

  recipe = {
    bread: b,
    main: m,
    sauce: s
  };

  return recipe;
}


// This function pick a random element from the ingredients list
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// This function evaluates the rules
function judgeSandwich(sandwich) {

  var valid = true;

  var currentBread = sandwich.bread;
  var currentMain  = sandwich.main;
  var currentSauce = sandwich.sauce;

  // CHECK bread/main
  var checkBreadMain = ingredientsNotAllowed.bread[currentBread];

  if (checkBreadMain !== undefined && checkBreadMain.indexOf(currentMain) >= 0) {
    valid = false;
  }


  // CHECK bread/sauce
  var checkBreadSauce = ingredientsNotAllowed.bread[currentBread];

  if (checkBreadSauce !== undefined && checkBreadSauce.indexOf(currentSauce) >= 0) {
    valid = false;
  }


  // CHECK main/sauce
  var checkMainSauce = ingredientsNotAllowed.main[currentMain];

  if (checkMainSauce !== undefined && checkMainSauce.indexOf(currentSauce) >= 0) {
    valid = false;
  }

  // log some info
  if (valid) {
    
    var sandwichTmpl = [
      '<div class="ingredient bread" data-key="', currentBread, '">', currentBread, '</div>',
      '<div class="ingredient main" data-key="', currentMain, '">', currentMain, '</div>',
      '<div class="ingredient sauce" data-key="', currentSauce, '">', currentSauce, '</div>',
      '<div class="ingredient bread" data-key="', currentBread, '">', currentBread, '</div>'
    ].join('');
    
    var hook = document.querySelector('#sandwich');
    
    hook.innerHTML = sandwichTmpl;
  }
  

  return valid;

} // end judgeSandwich

//clear sandwich
function clearSandwich() {
  var hook = document.querySelector('#sandwich');
  hook.innerHTML = '';
}


// let's get a good sandwich
function orderSandwich() {
  // create the first sandwich
  var sandwich = makeMeASandwich(ingredients);

  // check if it's good
  while (judgeSandwich(sandwich) === false) {
    // create a new sandwich
    sandwich = makeMeASandwich(ingredients);
  }

  return sandwich;
}

// toggle info

$( document ).ready(function() {
  // toggle info
    $("#overlay").toggle();
    $(".info-toggle").click(function() {
    $("#overlay").slideToggle();
  });

  $("#overlay-close").click(function() {
    $("#overlay").slideToggle();
  });

  //minimize nav
$(".make-sandwich").click(function() {
  $(".logo").addClass("logo-minimize");
  //order sandwich
  orderSandwich();
});

});








