"use strict";
let arr = [];
function card(ele) {
    this.keyword = ele.keyword;
    this.image_url = ele.image_url;
    this.title = ele.title;
    this.description = ele.description;
    this.horns = ele.horns;
}

card.prototype.render = function () {
    let card = $("#photo-template").clone();
    card.find("img").attr("src", this.image_url);
    console.log(this.image_url);
    card.find("h2").text(this.title);
    card.find("p").text(this.description);
    $("main").append(card);
    card.toggleClass(this.keyword);
}

$(document).ready(() => {
    $.ajax({ url: "data/page-1.json", dataType: 'json' }).then(function (data) {
        data.forEach(element => {
            let newCard = new card(element);
            if(arr.includes(newCard.keyword) == false){
                arr.push(newCard.keyword);
                newCard.appendSelector();
            }
            newCard.render();
        });
    });
    $("section").show();    
    $('select').on('change', function (e) {
        var valueSelected = this.value;
        console.log(valueSelected);
        $("section").hide();
        $(`.${valueSelected}`).show();
    });
    
})

card.prototype.appendSelector = function () {
    $("#select").append(new Option(this.keyword, this.keyword));
}
