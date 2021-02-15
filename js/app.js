"use strict";
let arr = [];
let allArr = [];
let selectedArr = [];
let selectedKey;
let selectedSort;

function card(ele) {
    this.keyword = ele.keyword;
    this.image_url = ele.image_url;
    this.title = ele.title;
    this.description = ele.description;
    this.horns = ele.horns;
    allArr.push(this);
}

card.prototype.render = function () {
    let card = $("#photo-template").clone();
    card.find("img").attr("src", this.image_url);
    card.find("h2").text(this.title);
    card.find("h3").text(`Description: ${this.description}`);
    card.find(".keyword").text(`Keyword: ${this.keyword}`);
    card.find(".horns").text(`Horns: ${this.horns}`);
    card.toggleClass('card')
    card.show();
    $("#allItems").append(card);
}

$(document).ready(() => {
    $("#photo-template").hide();
    $.ajax({ url: "data/page-1.json", dataType: 'json' }).then(function (data) {
        showAll(data, false);
        selectedArr = allArr.slice();
        selectedSort = 'title';
        sortBy();
    });
    $("#sort-by").val('title');
    $(`#quick-sort-title`).css('color', 'red');
    $('#select').on('change', function (e) {
        selectedKey = this.value;
        updateSelectedArr(selectedKey)
        sortBy();
    });

    $('#sort-by').on('change', function (e) {
        selectedSort = this.value;
        if (selectedSort != 'default' && selectedSort != undefined) {
            sortBy();
            $('button').css('color', 'gray');
            $(`#quick-sort-${selectedSort}`).css('color', 'red');
        }
    });
    $('#quick-sort-horns').on('click', function (e) {
        e.preventDefault();
        selectedSort = 'horns';
        updateSelectedArr();
        $('button').css('color', 'gray');
        $(this).css('color', 'red');
        sortBy();
        $("#sort-by").val('horns');
    })
    $('#quick-sort-title').on('click', function (e) {
        e.preventDefault();
        selectedSort = 'title';
        updateSelectedArr();
        $('button').css('color', 'gray');
        $(this).css('color', 'red');
        sortBy();
        $("#sort-by").val('title');
    })
})

card.prototype.appendSelector = function () {
    $("#select").append(new Option(this.keyword, this.keyword));
}

function sortBy() {
    if (selectedSort != undefined || selectedSort != 'default') {
        selectedArr = selectedArr.sort((a, b) => (a[selectedSort] > b[selectedSort]) ? 1 : (a[selectedSort] === b[selectedSort]) ? ((a[selectedSort] > b[selectedSort]) ? 1 : -1) : -1)
    }
    showAll(selectedArr, true);
}

function showAll(selArr, isNotFirstTime) {
    $('#allItems').empty();
    selArr.forEach(element => {
        let newCard;
        isNotFirstTime == false ? newCard = new card(element) : newCard = element;
        if (arr.includes(newCard.keyword) == false) {
            arr.push(newCard.keyword);
            newCard.appendSelector();
        }
        newCard.render();
    });
}

function updateSelectedArr(val) {
    if (val != undefined && val != 'default') {
        selectedArr = [];
        allArr.forEach(ele => {
            if (ele['keyword'] === val) {
                selectedArr.push(ele);
            }
        });
    }else{
        selectedArr = allArr.slice();
    }
    console.log(selectedArr)
}