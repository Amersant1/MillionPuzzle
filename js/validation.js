function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

// send form
function sendForm() {
    $(".error").text("Form sending").fadeIn();
}

// validate email and send form after success validation
function validate() {
    var email = $(".email").val();
    var $error = $(".error");
    $error.text("");

    if (validateEmail(email)) {
        $error.fadeOut();
        sendForm();
    } else {
        $error.fadeIn();
        $error.text(email + " is not valid");
    }
    return false;
};

function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    return re.test(input_str);
}

function checkmail(mail) {
    if (validateEmail(mail) == true) {
        return true


    } else {
        document.getElementById("wrongmail").classList.remove("hidden");
        return false
    }
}

function checkphone(phone) {
    if (validatePhoneNumber(phone) == true) {
        document.getElementById("wrongphone").classList.add("hidden")
        return true
    } else {
        document.getElementById("wrongphone").classList.remove("hidden")
        return false
    }
}

function integerValidation(integer) {
    if (typeOf(integer) == "number") { return true } else { return false }




}

function adressValidation(street, house) {
    let finallyTrue = true
    if (street.length == 0) {
        finallyTrue = false
        document.getElementById("wrongStreetInput").classList.remove("hidden")
    } else {
        document.getElementById("wrongStreetInput").classList.add("hidden")
    }
    if (house.length == 0) {
        finallyTrue = false
        document.getElementById("wrongHouseInput").classList.remove("hidden")
    } else {
        document.getElementById("wrongHouseInput").classList.add("hidden")
    }
    return (finallyTrue)

}

function deleteAll() {
    document.getElementById("map").innerHTML = "";
    document.getElementById("secOption").innerHTML = "";
    console.log("options deleted")

}

function deletePart() {
    document.getElementById("map").innerHTML = "";
}

function changeDeliveryDays(str) {
    let str1 = str.split(" ");
    str1[0] = String(parseInt(2 + parseInt(str1[0])));
    if (str1[0] > 4) {
        let str2 = str1[0] + " рабочих дней";
        return (str2)
    } else {
        let str2 = str1[0] + " рабочих дня";
        return (str2)
    }

}

function partValidation() {

}

function finalValidateUra(patronymic, phone, email) {
    let finallyTrue = true
    if (fioValidate(patronymic) == false) {
        finallyTrue = false
    }
    if (email.length == 0) {
        finallyTrue = false
    }
    if (checkphone(phone) == false) {
        finallyTrue = false
    }
    return (finallyTrue)



}

function fioValidate(fio) {
    let spaces = 0
    let letters = 0;
    WasFirstWord = false
    for (let i = 0; i < fio.length; i++) {
        if (fio[i] == " ") {
            spaces++;
            WasFirstWord = true
        }
        if (fio[i] != " " && WasFirstWord == true) { letters++ }
    }
    if (spaces > 3 || spaces < 2 || letters < 2) {
        document.getElementById("wrongname").classList.remove("hidden")
        return (false)
    } else {
        document.getElementById("wrongname").classList.add("hidden")
        fioList = fio.split(' ')
        name1 = fioList[0]
        surname = fioList[1]
        patronymic = fioList[2]
        return (true)
    }
}

function agreementChech() {
    document.getElementById("agreement").value
}

function dotsOnCheckAdress(adress) {
    if (adress[0] == ",") {
        return (adress.slice(1, adress.length))
    }
    return (adress)
}