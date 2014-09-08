// Ingredients list
var ingredientsDB = {
  bread: [{
    id: "01",
    title: "corn bread",
    description: "Description corn bread",
    badMatch: ["pumpkin chips", "honey"]
  }, {
    id: "02",
    title: "ciabatta bread",
    description: "Description ciabatta bread",
    badMatch: [""]
  }, {
    id: "03",
    title: "rice milk rolls",
    description: "Description rice milk rolls",
    badMatch: ["salmon", "honey", "mustard"]
  }],
  
  main: [{
    id: "04",
    title: "salmon",
    description: "Description salmon",
    badMatch: ["rice milk rolls", "honey"]
  }, {
    id: "05",
    title: "camembert",
    description: "Description camembert",
    badMatch: ["hummus"]
  }, {
    id: "06",
    title: "pumpkin chips",
    description: "Description pumpkin chips",
    badMatch: ["corn bread", "honey"]
  }], 
  
  sauce: [{
    id: "07",
    title: "mustard",
    description: "Description mustard",
    badMatch: ["rice milk rolls"]
  }, {
    id: "08",
    title: "honey",
    description: "Description honey",
    badMatch: ["corn bread", "rice milk rolls", "salmon", "pumpkin chips"]
  }, {
    id: "09",
    title: "hummus",
    description: "Description hummus",
    badMatch: ["camembert"]
  }]
};

// This function helps us to get the key inside the array
function _findIndex(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] == value) {
            return i;
        }
    }
    return null;
}

// This function pick a random element from the ingredients list
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// This function make the sandwich
function makeMeASandwich() {
 
  // create or empty `sandwich`
  var recipe = [];

  var b = pickRandom(ingredientsDB.bread);
  var m = pickRandom(ingredientsDB.main);
  var s = pickRandom(ingredientsDB.sauce);

  recipe = {
    bread: b.title,
    main: m.title,
    sauce: s.title
  };

   return recipe;
};

// This function evaluates the rules
function judgeSandwich(sandwich) {

  var valid = true;

  var currentBread = sandwich.bread;
  var currentMain  = sandwich.main;
  var currentSauce = sandwich.sauce;  

  var indexBread = _findIndex(ingredientsDB.bread, "title", currentBread);
  var indexMain = _findIndex(ingredientsDB.main, "title", currentMain);
  var indexSauce = _findIndex(ingredientsDB.sauce, "title", currentSauce);

  var desBread = ingredientsDB.bread[indexBread].description;
  var desMain = ingredientsDB.main[indexMain].description;
  var desSauce = ingredientsDB.sauce[indexSauce].description;

  var titlBread = ingredientsDB.bread[indexBread].title;
  var titlMain = ingredientsDB.main[indexMain].title;
  var titlSauce = ingredientsDB.sauce[indexSauce].title;
  
  // CHECK bread/main
  var checkBreadMain = ingredientsDB.bread[indexBread].badMatch;

//   console.log(checkBreadMain);
  
  if (checkBreadMain !== undefined && checkBreadMain.indexOf(currentMain) >= 0) {
    valid = false;
  }


  // CHECK bread/sauce
  var checkBreadSauce = ingredientsDB.bread[indexBread].badMatch;

  if (checkBreadSauce !== undefined && checkBreadSauce.indexOf(currentSauce) >= 0) {
    valid = false;
  }


  // CHECK main/sauce
  var checkMainSauce = ingredientsDB.main[indexMain].badMatch;

  if (checkMainSauce !== undefined && checkMainSauce.indexOf(currentSauce) >= 0) {
    valid = false;
  }

  // log some info
  if (valid) {

    var sandwichTmpl = [
    '<div class="ingredient bread" data-key="', currentBread,'">', currentBread, '</div>',
    '<div class="ingredient main" data-key="', currentMain, '">', currentMain, '</div>',
    '<div class="ingredient sauce" data-key="', currentSauce, '">', currentSauce, '</div>',
    '<div class="ingredient bread" data-key="', currentBread, '">', currentBread, '</div>'
    ].join('');
    
    var hook = document.querySelector('#JSsandwich');
    
    hook.innerHTML = sandwichTmpl;

    var recipeTmpl = [
    '<div class="recipe bread"><h1>', titlBread, '</h1>', desBread, '</div>',
    '<div class="recipe main"><h1>', titlMain, '</h1>', desMain, '</div>',
    '<div class="recipe sauce"><h1>', titlSauce, '</h1>', desSauce, '</div>'
    ].join('');
    
    var hook = document.querySelector('#JSrecipe');
    // console.log(descriptionSauce);
    hook.innerHTML = recipeTmpl;
  }
  return valid;
} // end judgeSandwich

//clear sandwich
function clearSandwich() {
  var hook = document.querySelector('#JSsandwich');
  hook.innerHTML = '';
}

//clear recipe
function clearRecipe() {
  var hook = document.querySelector('#JSrecipe');
  hook.innerHTML = '';
}


// let's get a good sandwich
function orderSandwich() {
  // create the first sandwich
  var sandwich = makeMeASandwich(ingredientsDB);

  // check if it's good
  while (judgeSandwich(sandwich) === false) {
    // create a new sandwich
    sandwich = makeMeASandwich(ingredientsDB);
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
  // overaly close
  $("#overlay-close").click(function() {
    $("#overlay").slideToggle();
  });
  // minimize logo
  $(".make-sandwich").click(function() {
    $(".logo").addClass("logo-minimize");
  // order sandwich
  orderSandwich();
});
  // clear sandwich maximize logo
  $(".logo").click(function() {
    $(".logo").removeClass("logo-minimize");
  // order sandwich
  clearSandwich();
  clearRecipe();
});

});








