var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var tags = [ "parking spot", "backyard", "outdoor space", "gas stove", "open kitchen", "washer & dryer", "exposed bricks", "finished basement", "granite counter", "garage", "costumed build-ins", "sky lights", "central aired", "recessed lighting", "parking sold separately", "hard wood floors", "corian countertop", "balcony", "small kitchen", "some appliances not available", "walk in shower", "small rooms", "patio", "stainless steel appliances", "quartz countertop", "marble tile", "smart home", "penthouse", "open kitchen", "townhouse", "unfinished basement", "linoleum", "astro turf", "brick exterior", "old bathroom", "small bathroom", "closed kitchen", "frontyard", "9ft ceiling", "tall ceiling", "crown molding", "gas fireplace", "condo", "natural light", "restored windows", "radiators", "no central air", "shared outdoor space", "marbled counter", "ceiling fans", "limited closet space", "costumed built in", "glass counters", "loft", "extra kitchen", "exposed brick", "granit counter", "plantation shutters", "large kitchen", "row home", "luxury", "mansion", "marble", "large rooms", "walk in closet", "multiple stairs", "elevator", "gas lanterns", "rooftop", "wine cooler", "industrial", "hard wood floor", "breakfast bar", "floor to ceiling window", "carpet", "pool", "tennis courts", "electric stove", "dark", "small rooms" ]
var tags_A = [ "parking spot", "backyard", "outdoor space", "gas stove", "open kitchen", "washer & dryer", "exposed bricks", "finished basement", "granite counter", "garage", "customed build-ins", "sky lights", "central aired", "recessed lighting" ]
var tags_B = [ "parking sold separately", "backyard", "outdoor space", "washer & dryer", "central aired", "hard wood floors", "corian countertop", "balcony", "small kitchen", "some appliances not available", "recessed lighting", "walk in shower", "small rooms", "patio" ]
var tags_C = [ "townhouse", "unfinished basement", "linoleum", "patio", "parking spot", "astro turf", "brick exterior", "hard wood floors", "old bathroom", "small bathroom", "gas stove", "closed kitchen", "small kitchen", "frontyard" ]
var tags_D = [ "9ft ceiling", "tall ceiling", "crown molding", "gas fireplace", "condo", "natural light", "hard wood floors", "restored windows", "radiators", "no central air", "shared outdoor space", "marbled counter", "closed kitchen", "ceiling fans", "limited closet space", "customed built in" ]
var tags_E = [ "walk in shower", "glass counters", "loft", "open kitchen", "extra kitchen", "gas stove", "hard wood floors", "exposed brick", "finished basement", "balcony", "recessed lighting", "granit counter", "plantation shutters", "large kitchen", "stainless steel appliances", "rowhome" ]
if (slider != null){
  output.innerHTML = slider.value;
  document.getElementById("slidebar").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, #6d75bf 0%, #6d75bf ' + value + '%, #fff ' + value + '%, white 100%)';
    output.innerHTML = this.value;
  };
}

function add_row(text){
  var new_p = document.createElement('p');
  new_p.innerHTML = text;
  new_p.classList.add('text-center');
  document.getElementById("selected_factors").appendChild(new_p);
}


function show(){
    var x = document.getElementById('percentage');
    var y = document.getElementById('score2');
    var temp = 0;
    if (localStorage.getItem('waive_inspection') == 1){
        temp += 10;
    }
    if (localStorage.getItem('Personal_Letter') == 1){
        temp += 10
    }
    if (localStorage.getItem('waive_appraisal') == 1){
        temp += 10
    }
    if (localStorage.getItem('all_cash') == 1){
        temp += 10
    }
    if (localStorage.getItem('escalation_clause') == 1){
        temp += 10
    }
    if (localStorage.getItem('increase_downpayment') == 1){
        temp += 10
    }
    if (localStorage.getItem('increase_deposit') == 1){
        temp += 10
    }
    if (localStorage.getItem('closing_flexibility') == 1){
        temp += 10
    }
    temp += parseInt(localStorage.getItem('slider_value'))
    y.innerHTML = temp;
    x.innerHTML = parseInt(localStorage.getItem('slider_value'));
}

function show_like_dislike(){
    var likes = JSON.parse(localStorage.getItem('liked'));
    var likesLength = likes.length;
    var dislikes = JSON.parse(localStorage.getItem('disliked'));
    var dislikesLength = dislikes.length;
    for (var i = 0; i < likesLength; i++) {
        add_div_liked(likes[i])
    }
    for (var i = 0; i < dislikesLength; i++) {
        add_div_disliked(dislikes[i])
    }
    console.log(likes)
}

function add_div_liked(text){
    var div = document.createElement('button');
    div.innerHTML = text + "&nbsp";
    div.classList.add('btn');
    div.classList.add('btn-primary');
    div.classList.add('m-2');
    div.setAttribute('type', 'button');
    div.setAttribute('style', "background-color: #4F80E1;");
    document.getElementById("liked").appendChild(div);
}

function add_div_disliked(text){
    var div = document.createElement('button');
    div.innerHTML = text + "&nbsp";
    div.classList.add('btn');
    div.classList.add('btn-secondary');
    div.classList.add('m-2');
    div.setAttribute('type', 'button');
    document.getElementById("disliked").appendChild(div);
}

function change(element){
    if (localStorage.getItem(element.id) == null){
        localStorage.setItem(element.id, 1);
    }
    else if (localStorage.getItem(element.id) == 0){
        localStorage.setItem(element.id, 1);
    } 
    else if (localStorage.getItem(element.id) == 1){
        localStorage.setItem(element.id, 0);
    }
}

function save_slider(){
    localStorage.setItem('slider_value', parseInt(slider.value));
}

var count = 1;
var liked = [];
var disliked = [];
function remove_div(id){
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
}
function save_like(){
    localStorage.setItem('liked', JSON.stringify(liked))
}
function save_dislike(){
    localStorage.setItem('disliked', JSON.stringify(liked))
}
function remove(el){
    var element = el;
    element.remove();
    temp = element.innerHTML.slice(0,-13);
    removeItemOnce(liked, temp)
}
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
function add_div(){
    var div = document.createElement('button');
    x = document.getElementById('myInput')

    div.innerHTML = x.value + "&nbsp;&nbsp;x";
    div.id = count;
    div.classList.add('btn');
    div.classList.add('btn-primary');
    div.classList.add('m-2');
    div.setAttribute('type', 'button');
    div.setAttribute('style', "background-color: #4F80E1;");
    div.onclick = function(){remove(this)}
    liked.push(x.value)
    count += 1;
    
    document.getElementById("main_temp").appendChild(div);
    document.getElementById('myInput').value = '';
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

  function change_arrow(element){
    var up = '&uarr;';
    var down = '&darr;';
    if (element.innerHTML.charCodeAt(0) == 8593){
        element.innerHTML = '&darr;';
        return
    } 
    if (element.innerHTML.charCodeAt(0) == 8595){
        element.innerHTML = '&uarr;';
    }
}

function change_order(){
  var likes = JSON.parse(localStorage.getItem('liked'));
  console.log(likes);
  a_temp = 20;
  b_temp = 20;
  c_temp = 20;
  d_temp = 20;
  e_temp = 20;
  for (var i = 0; i < likes.length; i++){
    if (tags_A.includes(likes[i])){
      a_temp -= 1;
    }
    if (tags_B.includes(likes[i])){
      b_temp -= 1;
    }
    if (tags_C.includes(likes[i])){
      c_temp -= 1;
    }
    if (tags_D.includes(likes[i])){
      d_temp -= 1;
    }
    if (tags_E.includes(likes[i])){
      e_temp -= 1;
    }
  }
  document.getElementById('a').style.order = a_temp;
  document.getElementById('b').style.order = b_temp;
  document.getElementById('c').style.order = c_temp;
  document.getElementById('d').style.order = d_temp;
  document.getElementById('e').style.order = e_temp;
}