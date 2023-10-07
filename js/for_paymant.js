document.getElementById("productCount").innerText = String(count);
document.getElementById("decreaseProductCount").onclick = function() {
    if (count >= 1) {
        count--;
    }
    document.getElementById("productCount").innerText = String(count);
    document.getElementById("totalPrice").innerText = String(count * price);
    document.getElementById("totalPrice2").innerText = String(count * price) + "Р";
};
document.getElementById("productCount++").onclick = function() {
    count++
    document.getElementById("productCount").innerText = String(count);
    document.getElementById("totalPrice").innerText = String(count * price);
    document.getElementById("totalPrice2").innerText = String(count * price) + "Р";

};
console.log(price)
const pr = document.getElementById("nowPrice");
pr.innerHTML = '<span class="px-2 " id="nowPrice ">' + price + '</span>';
//   closeForm() {
//     this.$store.commit('turner/changeShowModal');
//     this.$store.commit('turner/changeProductCount', this.productCount)
//     this.$store.commit('turner/setTotalPrice', this.productPrice * this.productCount)

//     this.unShadowRoot();
//   },
document.getElementById("resetBin").onclick = function() {
    count = 0;
    let form = document.getElementById("form");
    form.classList.toggle("hidden")
    document.getElementById("totalPrice").innerText = String(count * price);
    document.getElementById("totalPrice2").innerText = String(count * price) + "Р";
};
document.getElementById("orderSsilka").onclick = function() {
    count += 1;
    document.getElementById("productCount").innerText = String(count)
    console.log("dop")
    let form = document.getElementById("form");
    form.classList.toggle("hidden")
    document.getElementById("totalPrice").innerText = String(count * price);
    document.getElementById("totalPrice2").innerText = String(count * price) + "Р";
}
document.getElementById("checkout").onclick = function() {
    document.getElementById("deliver_block_last").classList.remove("hidden");
    document.getElementById("form").classList.add("hidden");
    document.getElementById("header1").classList.add("hidden");
    document.getElementById("finalPrice").innerText = String(price * count) + "Р";

}
document.getElementById("adressConfirm").onclick = async function() {
    street = document.getElementById("street").value
    apartment = document.getElementById("apartaments").value
    house = document.getElementById("house").value
    if (adressValidation(street, house) == true) {
        document.getElementById("PvzOrDelivery").classList.add("hidden");
        document.getElementById("final").classList.add("hidden")
        document.getElementById("PvzSelectedFinally").classList.add("hidden")

        await deletePart()
        await ymaps.ready(init);
    }


}
document.getElementById("delivery_square").onclick = function() {
    document.getElementById("pvz_square").firstChild.checked = false;
    document.getElementById("delivery_square").firstChild.checked = true;
    document.getElementById("delivery_square").classList.add("selectedBlock")
    document.getElementById("delivery_square").classList.add("selectedBlock")
    document.getElementById("curService").classList.remove("hidden")
    document.getElementById("pvz_square").classList.remove("selectedBlock")

    document.getElementById("payment_cash").classList.add("hidden")
    document.getElementById("payment_cardPlace").classList.add("hidden")
    document.getElementById("final").classList.remove("hidden")
    document.getElementById("Pvz_open").classList.add("hidden");
    document.getElementById("PvzSelectedFinally").classList.add("hidden")
    document.getElementById("optionsAll").classList.remove("hidden");
    // document.getElementById("")
    courierOrPvz = "courier"

}
document.getElementById("crossLeft").onclick = function() {
    document.getElementById("deliver_block_last").classList.add("hidden");
    document.getElementById("header1").classList.remove("hidden");

}
document.getElementById("agreement").onclick = function() {
    if (agreement == false) {
        agreement = true
        document.getElementById("agreement").firstChild.checked = true;
    } else {
        agreement = false
        document.getElementById("agreement").firstChild.checked = false;
    }

}
document.getElementById("sendButton").onclick = function() {
    console.log("butttt")
    patronymic = document.getElementById("patronymic").value
    email = document.getElementById("email").value
    phone = document.getElementById("phone").value
    console.log(surname, name1, phone, email, patronymic)
    if (finalValidateUra(patronymic, phone, email) == true) {
        if (agreement != true) { document.getElementById("wrongAgreement").classList.remove("hidden") } else {
            addOrder()
        }
    }
}
document.getElementById("pvz_square").onclick = function() {
    payment_cash = false;
    document.getElementById("curService").classList.add("hidden")
    document.getElementById("pvz_square").firstChild.checked = true;
    document.getElementById("delivery_square").firstChild.checked = false;
    document.getElementById("pvz_square").classList.add("selectedBlock")
    document.getElementById("delivery_square").classList.remove("selectedBlock")
    document.getElementById("Pvz_open").classList.remove("hidden");
    document.getElementById("optionsAll").classList.add("hidden")
    document.getElementById("final").classList.remove("hidden")
    document.getElementById("PvzSelectedFinally").classList.remove("hidden")
    courierOrPvz = "Pvz"
    if (screenWidth < 871) {
        document.getElementById("listOfPvz").classList.remove("hidden");
        document.getElementById("map").classList.add("hidden");
    }
}
document.getElementById("backfromPvz").onclick = function() {
    document.getElementById("Pvz_open").classList.add("hidden");
}
document.getElementById("payment_card").onclick = function() {
    document.getElementById("payment_card").classList.add("selectedBlock");
    document.getElementById("payment_cash").classList.remove("selectedBlock");
    document.getElementById("payment_cardPlace").classList.remove("selectedBlock")
    document.getElementById("payment_card").firstChild.checked = true;
    document.getElementById("payment_cardPlace").firstChild.checked = false;
    document.getElementById("payment_cash").children[0].checked = false;
    paymentWay = "online"
}
document.getElementById("payment_cardPlace").onclick = function() {
    document.getElementById("payment_card").classList.remove("selectedBlock");
    document.getElementById("payment_cash").classList.remove("selectedBlock");
    document.getElementById("payment_cardPlace").classList.add("selectedBlock")
    document.getElementById("payment_card").firstChild.checked = false;
    document.getElementById("payment_cardPlace").firstChild.checked = true;
    document.getElementById("payment_cash").children[0].checked = false;
    paymentWay = "card"
}
document.getElementById("payment_cash").onclick = function() {
    console.log("it was clicked on cash")
    document.getElementById("payment_cash").classList.add("selectedBlock");
    document.getElementById("payment_card").classList.remove("selectedBlock");
    document.getElementById("payment_cardPlace").classList.remove("selectedBlock");
    document.getElementById("payment_card").firstChild.checked = false;
    document.getElementById("payment_cardPlace").firstChild.checked = false;
    document.getElementById("payment_cash").children[0].checked = true;
    paymentWay = "cash";
}
document.getElementById("options").onclick = function() {
    document.getElementById("secOption").classList.remove("hidden");
};
document.getElementById("coreChoice").onclick = function() {
    document.getElementById("secOption").classList.remove("hidden");
};
document.getElementById("makeDecision").onclick = function() {
    document.getElementById("PvzSelectedFinally").classList.remove("hidden");
    document.getElementById("Pvz_open").classList.add("hidden");
}
document.getElementById("changeAnouther").onclick = function() {
    document.getElementById("Pvz_open").classList.remove("hidden");
}
document.getElementById("coreChoice").onlick = function() {
    document.getElementById("options").click();
}
document.getElementById("openMap").onclick = function() {
    document.getElementById("listOfPvz").classList.toggle("hidden");
    document.getElementById("map").classList.toggle("hidden");
    if (document.getElementById("listOfPvz").classList[1] == "hidden") {
        document.getElementById("openMap").innerText = "Список Пвз";
    } else {
        document.getElementById("openMap").innerText = "Карта";
    }
}