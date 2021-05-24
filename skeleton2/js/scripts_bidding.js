var slider = document.getElementById("slidebar");
var output = document.getElementById("demo");
if (slider != null){
    output.innerHTML = slider.value;

document.getElementById("slidebar").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #6d75bf 0%, #6d75bf ' + value + '%, #fff ' + value + '%, white 100%)'
    output.innerHTML = this.value;
    };

}

function change(element){
    console.log('hello')
    if (localStorage.getItem(element.id) == null){
        localStorage.setItem(element.id, 1)
    }
    else if (localStorage.getItem(element.id) == 0){
        localStorage.setItem(element.id, 1)
    } 
    else if (localStorage.getItem(element.id) == 1){
        localStorage.setItem(element.id, 0)
    }
    console.log(localStorage.getItem(element.id))
    console.log(element.id)
}

function save_slider(){
    localStorage.setItem('slider_value', parseInt(slider.value))
}

function add_row(text){
    var new_p = document.createElement('p');
    new_p.innerHTML = text;
    new_p.classList.add('text-center');
    new_p.classList.add('m-1');
    document.getElementById("selected_factors").appendChild(new_p);
  }

function show(){
    var x = document.getElementById('score');
    var y = document.getElementById('percentage');
    var temp = 0;
    if (localStorage.getItem('waive_inspection') == 1){
        temp += 10
        add_row('Waive inspection');
    }
    if (localStorage.getItem('Personal_Letter') == 1){
        temp += 10
        add_row('Write a Personal Letter');
    }
    if (localStorage.getItem('waive_appraisal') == 1){
        temp += 10
        add_row('Waive Appraisal');
    }
    if (localStorage.getItem('all_cash') == 1){
        temp += 10
        add_row('Offer All Cash');
    }
    if (localStorage.getItem('escalation_clause') == 1){
        temp += 10
        add_row('Add Escalation Clause');
    }
    if (localStorage.getItem('increase_downpayment') == 1){
        temp += 10
        add_row('Increase Downpayment');
    }
    if (localStorage.getItem('increase_deposit') == 1){
        temp += 10
        add_row('Increase Earnest Money Deposit');
    }
    if (localStorage.getItem('closing_flexibility') == 1){
        temp += 10
        add_row('Closing Date Flexibility');
    }
    temp += parseInt(localStorage.getItem('slider_value'))
    x.innerHTML = temp;
    x.innerHTML += '%';
    y.innerHTML = parseInt(localStorage.getItem('slider_value'));
}