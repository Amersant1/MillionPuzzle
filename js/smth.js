let numbFrstPg = 1;
let prev = document.getElementById("prev");
let next = document.getElementById("next");
console.log(prev)
let prev_func = function(numbFrstPg1) {
    numbFrstPg = numbFrstPg1
    let div = document.getElementById("need_div")
    numbFrstPg -= 3
    if (numbFrstPg < 1) {
        numbFrstPg = 12;
        console.log(String(numbFrstPg));
        div.innerHTML = '<img src="images/render_' + String(numbFrstPg) + '.png" class="exmaple_img" id="firstPage"><img src="images/render_' + String(numbFrstPg + 1) + '.png" class="exmaple_img" id="secondPage"><img src="images/render_' + String(numbFrstPg + 2) + '.png" class="exmaple_img" id="thirdPage">';

    } else {

        div.innerHTML = '<img src="images/render_' + String(numbFrstPg) + '.png" class="exmaple_img" id="firstPage"><img src="images/render_' + String(numbFrstPg + 1) + '.png" class="exmaple_img" id="secondPage"><img src="images/render_' + String(numbFrstPg + 2) + '.png" class="exmaple_img" id="thirdPage">';
    }
    return (numbFrstPg)
}
prev = document.getElementById("prev");
prev.onclick = function() {
    numbFrstPg = prev_func(numbFrstPg)
}
next_func = function(numbFrstPg1) {
    numbFrstPg = numbFrstPg1
    let div = document.getElementById("need_div")
    numbFrstPg += 3
    if (numbFrstPg > 12) {
        numbFrstPg = 1;
        console.log(String(numbFrstPg));
        div.innerHTML = '<img src="images/render_' + String(numbFrstPg) + '.png" class="exmaple_img" id="firstPage"><img src="images/render_' + String(numbFrstPg + 1) + '.png" class="exmaple_img" id="secondPage"><img src="images/render_' + String(numbFrstPg + 2) + '.png" class="exmaple_img" id="thirdPage">';

    } else {

        div.innerHTML = '<img src="images/render_' + String(numbFrstPg) + '.png" class="exmaple_img" id="firstPage"><img src="images/render_' + String(numbFrstPg + 1) + '.png" class="exmaple_img" id="secondPage"><img src="images/render_' + String(numbFrstPg + 2) + '.png" class="exmaple_img" id="thirdPage">';
    }
    return (numbFrstPg)
}
next.onclick = function() {
    numbFrstPg = next_func(numbFrstPg)
}