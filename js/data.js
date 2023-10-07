 // // async function serverConnect() {
 // //     url = "http://127.0.0.1:5000/proxy/" + "getDeliveryMethods";
 // //     res=new Promise((resolve, reject) => {
 // //         const xhr = new XMLHttpRequest();
 // //         xhr.open("GET", url);
 // //         xhr.onload = () => resolve(xhr.responseText);
 // //         xhr.onerror = () => reject(xhr.statusText);
 // //         xhr.send();
 // //     });
 // //     res.then(res=)
 // // }
 // async function serverConnect() {
 //     url = "http://127.0.0.1:5000/proxy/" + "getDeliveryMethods";
 //     response = await fetch(url);
 //     return (response)

 // }
 const screenWidth = window.screen.width
 let paymentWay = "online";
 let street = "";
 let house = "";
 let apartment = "";
 let count = 0;
 const price = 1470;
 let kladrId = "7700000000000";
 let spots = [];
 let name1 = "";
 let surname = "";
 let importantList = [
     [],
 ];
 let agreement = false;
 let urlPvz = "";
 let city = "";
 let optionHtmlMoment = "";
 let listOfDelivery = [];
 let listOfPvz = [];
 let patronymic = "";
 let phone = "";
 let adress = "";
 let resp = 0;
 let IsPvzReal = false;
 let middleDeliveryPrice = 800
 let needHTML = "";
 let middlePvzPrice = 500;
 let minPvzTime = "7";
 let minDeliveryTime = "6";
 let shipping_method = "";
 let delivery_price = "1000";
 let courierOrPvz = "Pvz"
 let coords = [];
 let pvzId = "";
 let PvzPrice = "";
 let inf1 = "";
 let inf = "";
 let daysList = {};
 let PvzSpan = "";
 let spots1 = [];
 let priceList = {};
 let mapExists = false;
 let myGeoObject = [];
 let idPvz = "";
 let payment_cash = false;
 let placemark = {};
 let payment_cardPlace = false;
 const serv = "http://195.2.74.124:5000/proxy/";
 async function payment() {
     url = serv + "getDeliveryMethods";
     resp = await fetch(url);
     response = await resp.json();
     console.log(response)
     goodDeliveryIds = response["number_list"]
     console.log(goodDeliveryIds)
     console.log(goodDeliveryIds)
     kladrId = "7700000000000";
     city = "Москва";
     country = "Россия";
     document.getElementById("cities").classList.add("hidden");
     console.log(1);
     await document.getElementById("blockOfInf").classList.remove("hidden");
     await document.getElementById("adressOpen").classList.remove("hidden");
     getOrderPrice("getDelivery", String(kladrId + "&&" + goodDeliveryIds));
     document.getElementById("in_put").value = "г. Москва";
 }
 payment()
 async function suggestSettlement(data, goodDeliveryIds) {
     url = serv + "suggestSettlement/" + data;
     resp = await fetch(url);
     response = await resp.json();
     response = response["result"];
     let needHTML = "";
     for (let i = 0; i < response.length; i++) {
         console.log(i);
         potentialKlad = response[i]["klad-id"];
         needHTML += "<div class='kladr'>" + "<span id='city" + String(i) + "'>" + response[i]["name"] + "," + "</span><span class='gr_ey'>" + response[i]["oblast"] + " " + "<span id='country" + String(i) + "'>" + response[i]["country"] + "</span></span><span class='hidden' id='kladrId" + String(i) + "'>" + response[i]["klad-id"] + "</span></div>"
     }
     document.getElementById("cities").classList.remove("hidden")
     document.getElementById("cities").innerHTML = needHTML;
     for (let i = 0; i < response.length; i++) {
         console.log(document.getElementById("kladrId" + String(i)).parentNode)
         document.getElementById("kladrId" + String(i)).parentNode.onclick = async function() {
             kladrId = document.getElementById("kladrId" + String(i)).innerText;
             city = document.getElementById("city" + String(i)).innerText;
             country = document.getElementById("country" + String(i)).innerText;
             document.getElementById("cities").classList.add("hidden")
             console.log(1)
             await document.getElementById("blockOfInf").classList.remove("hidden")
             await document.getElementById("adressOpen").classList.remove("hidden")
             getOrderPrice("getDelivery", String(kladrId + "&&" + goodDeliveryIds))
             document.getElementById("in_put").value = document.getElementById("kladrId" + String(i)).parentNode.firstChild.innerText + document.getElementById("kladrId" + String(i)).parentNode.children[1].innerText
         }
     }



 }

 async function getOrderPrice(method, data) {
     data1 = data;
     method1 = method;
     url = serv + method1 + '/' + data1;
     console.log(url)
     importantList = await fetch(url);
     importantList = await importantList.json();
     middlePvzPrice = await importantList[1][1];
     middleDeliveryPrice = await importantList[0][1];
     IsPvzReal = await importantList[1][0];
     minPvzTime = await importantList[1][2] + 2;
     minDeliveryTime = await importantList[0][2] + 2;
     listOfDelivery = await importantList[3]
     listOfPvz = await importantList[2]
     await console.log(middleDeliveryPrice);
     await printPvzAndDelivery()
     await options()
     for (let i = 0; i < listOfPvz.length; i++) {
         priceList[String(listOfPvz[i]["shipping_method"])] = listOfPvz[i]["price"];
         daysList[String(listOfPvz[i]["shipping_method"])] = listOfPvz[i]["delivery_days"];
         console.log(priceList + "startedPriceList")
         console.log(listOfPvz["price"])
         console.log(listOfPvz[shipping_method])
     }
     for (let i = 0; i < listOfDelivery.length; i++) {
         priceList[String(listOfDelivery[i]["shipping_method"])] = listOfPvz[i]["price"];
         daysList[String(listOfDelivery[i]["shipping_method"])] = changeDeliveryDays(listOfDelivery[i]["delivery_days"]);
         console.log(priceList + "startedPriceList")
         console.log(listOfPvz["price"])
         console.log(listOfPvz[shipping_method])
     }
 }

 function printPvzAndDelivery() {
     document.getElementById("delivery_square").innerHTML = ("<input type='radio'>" + "Курьером до двери<br>" + "от " + middleDeliveryPrice + "р.<br>От " + minDeliveryTime + " Рабочих дней </input>")
     document.getElementById("pvz_square").innerHTML = ("<input type='radio'>Доставка в Пункт выдачи<br>" + "от " + middlePvzPrice + " р.<br>От " + String(2 + parseInt(minPvzTime) + " Рабочих дней</input>"))
 }
 async function options() {
     option = listOfDelivery[0];
     objNeedReally = { 'shipping_method': option[shipping_method], 'price': +option["price"] }
     optionHtmlMoment += "<span id='" + "shippingMethod0" + "'  class='option2'>" + option["name"] + "-" + changeDeliveryDays(option["delivery_days"]) + "<span id='price" + String(0) + "'>" + "(" + option["price"] + " р)" + "</span>" + "</span><br>"
     document.getElementById("options").innerHTML = optionHtmlMoment;
     optionHtmlMoment = "<span id='" + "shippingMethod0" + "'  class='option'>" + option["name"] + "-" + changeDeliveryDays(option["delivery_days"]) + "<span id='price" + String(0) + "'>" + "(" + option["price"] + " р)" + "</span>" + "</span><br>"
     for (let i = 1; i < listOfDelivery.length; i++) {
         option = listOfDelivery[i];
         optionHtmlMoment += "<span id='" + "shippingMethod" + String(i) + "' class='option'" + ">" + option["name"] + "-" + changeDeliveryDays(option["delivery_days"]) + "<span id='price" + String(i) + "'>" + "(" + option["price"] + " р)" + "</span>" + "</span><br>"
     }
     document.getElementById("secOption").innerHTML = optionHtmlMoment;
     for (let i = 0; i < listOfDelivery.length; i++) {
         console.log(document.getElementById("shippingMethod" + String(i)))
         document.getElementById("shippingMethod" + String(i)).onclick = function() {
             shipping_method = listOfDelivery[i]["shipping_method"];
             delivery_price = listOfDelivery[i]["price"];
             document.getElementById("options").innerText = document.getElementById("shippingMethod" + String(i)).innerText;
             document.getElementById("secOption").classList.add("hidden");
             document.getElementById("finalDelivery").innerText = String(delivery_price) + "Р";
             document.getElementById("LastPrice").innerText = String(delivery_price + count * price) + "Р"
         }
     }
     shipping_method = listOfDelivery[0]["shipping_method"]
     delivery_price = listOfDelivery[0]["price"];
     document.getElementById("finalDelivery").innerText = String(delivery_price) + "Р";
     document.getElementById("LastPrice").innerText = String(delivery_price + count * price) + "Р"
     optionHtmlMoment = "";
     console.log("ошибка не в опциях")
 }

 async function addOrder() {
     if (country = 'Россия') {
         country = "RU"
     }
     delivery_price = priceList[String(shipping_method)]
     otpravka_obj = {
         "phone": phone,
         "email": email,
         "name": name1,
         "surname": surname,
         "country": country,
         "kladr_id": kladrId,
         "amount": count,
         "pvzId": idPvz,
         "shipping_method": shipping_method,
         "delivery_price": delivery_price,
         "street": street,
         "apartments": apartment,
         "patronymic": patronymic,
         "house": house,
         "courierOrPvz": courierOrPvz,
         "city": city,
         "payment": paymentWay,
     }
     console.log(otpravka_obj)
     url = serv + "addPackage/" + JSON.stringify(otpravka_obj);
     resp = await fetch(url);
     transport = await resp.json();
     console.log(transport + "is it code")
     if (transport["result"] != undefined) {
         transport = transport["result"]
     }
     if (paymentWay == "card" || paymentWay == "cash") {
         transportUrl = transport
     } else {
         transportUrl = "https://checkout.shiptor.ru/payment?order=" + transport + "&wk=Q0HVWQCAEPB3B0LVAGMFZJYOBQ5KGTIJJ31U188197"
     }
     console.log(transportUrl)
     window.open(transportUrl)
 }

 function init() {
     console.log("init started")
     console.log(city + house + street);
     ymaps.geocode(city + street + house, {
         /**
          * Опции запроса
          * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
          */
         // Сортировка результатов от центра окна карты.
         // boundedBy: myMap.getBounds(),
         // strictBounds: true,
         // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
         // Если нужен только один результат, экономим трафик пользователей.
         results: 1
     }).then(async function(res) {
         //  if (res["statusCode"] > 400) {
         //      document.getElementById("wrongStreetInput").classList.remove("hidden");
         //      document.getElementById("wrongHouseInput").classList.remove("hidden");
         //      console.log("err")
         //      return ("err")
         //  }
         console.log("request_sended")
             // Выбираем первый результат геокодирования.
         let firstGeoObject = await res.geoObjects.get(0),
             // Координаты геообъекта.
             coords = await firstGeoObject.geometry.getCoordinates();

         let map = await new ymaps.Map("map", {
             // Координаты центра карты.
             // Порядок по умолчанию: «широта, долгота».
             // Чтобы не определять координаты центра карты вручную,
             // воспользуйтесь инструментом Определение координат.
             center: coords,
             // Уровень масштабирования. Допустимые значения:
             // от 0 (весь мир) до 19.
             zoom: 14
         });
         console.log(coords);
         console.log(firstGeoObject);
         map["center"] = await coords;
         console.log(map["center"])
         console.log("didnt stop")
         urlPvz = serv + "DotsOnAreaUpdated" + "/" + kladrId + "&&" + coords[0] + "&&" + coords[1] + "&&" + goodDeliveryIds;
         console.log(urlPvz)
         spots = await fetch(urlPvz)
         spots1 = await spots.json();
         await console.log(spots1)
         console.log("maporPvzReadyStart");

         console.log(spots1);
         for (let i = 0; i < spots1.length; i++) {
             Adress = dotsOnCheckAdress(spots1[i]["address"])
             if (spots1[i]["time_table"] == null) { spots1[i]["time_table"] = "" }
             for (let k = 0; k < spots1[i]["shipping_method"].length; k++) {
                 console.log(priceList[spots1[i]["shipping_method"][k]])
                 if (priceList[spots1[i]["shipping_method"][k]] != undefined && spots1[i]["price"] == 0 && daysList[spots1[i]["shipping_method"][k]] != undefined) {
                     PvzPrice = priceList[spots1[i]["shipping_method"][k]]
                     PvzDays = changeDeliveryDays(daysList[spots1[i]["shipping_method"][k]])
                     if (spots1[i]["card"] == true && spots1[i]["cod"] == true) { PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/moneymini.svg' class='payment1'><img src='images/cardmini.svg' class='paymentSec'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>" } else {
                         if (spots1[i]["card"] == false && spots1[i]["cod"] == true) { PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/moneymini.svg' class='payment1'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>" } else {
                             if (spots1[i]["card"] == true && spots1[i]["cod"] == false) { PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/cardmini.svg' class='payment1'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>" } else {
                                 PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>"
                             }
                         }
                     }
                     let placemark = new ymaps.Placemark(
                         [spots1[i]["gps_paral"], spots1[i]["gps_meredian"]], {}, {});


                     placemark.events.add('click', function(e) {
                         Adress = dotsOnCheckAdress(spots1[i]["address"])
                         shipping_method = spots1[i]["shipping_method"][k]
                         if (document.getElementsByClassName("selectedPvz")[0] != undefined) {
                             document.getElementsByClassName("selectedPvz")[0].classList.remove("selectedPvz")
                         }
                         if (screenWidth < 871) {
                             document.getElementById("listOfPvz").classList.remove("hidden");
                             document.getElementById("map").classList.add("hidden");
                         }
                         console.log("activated");
                         PvzSelectedText = "<span class='onePoint' ><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + "</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><span class='time_table'>" + spots1[i]["time_table"] + "</span><br></span><br>"
                         idPvz = spots1[i]["id"];
                         deliveryOptions =
                             placemark["color"] = "red";
                         delivery_price = PvzPrice;
                         document.getElementById("finalDelivery").innerText = String(delivery_price) + "Р";
                         document.getElementById("LastPrice").innerText = String(delivery_price + count * price) + "Р"
                         document.getElementById("OnePoint" + String(i)).classList.add("selectedPvz");
                         document.getElementById("OnePoint" + String(i)).scrollIntoView();
                         document.getElementById("needtoInnerTextHere").innerHTML = PvzSelectedText
                         document.getElementById("makeDecision").classList.remove("hidden")
                         if (spots1[i]["cod"] == true) {
                             payment_cash = true;
                             document.getElementById("payment_cash").classList.remove("hidden")
                         } else {
                             document.getElementById("payment_cash").classList.add("hidden")
                             payment_cash = false;
                         }
                         if (spots1[i]["card"] == true) {
                             document.getElementById("payment_cardPlace").classList.remove("hidden")
                             payment_cardPlace = true;
                         } else {
                             document.getElementById("payment_cardPlace").classList.add("hidden")
                             payment_cardPlace = false;
                         }
                         e.stopPropagation();
                     });
                     map.geoObjects.add(placemark);


                 }
                 if (spots1[i]["price"] != 0 && priceList[spots1[i]["shipping_method"][k]] != undefined && daysList[spots1[i]["shipping_method"][k]] != undefined) {
                     PvzPrice = spots1[i]["price"];
                     Adress = dotsOnCheckAdress(spots1[i]["address"])
                     console.log(daysList[spots1[i]["shipping_method"][k]])
                     PvzDays = changeDeliveryDays(daysList[spots1[i]["shipping_method"][k]]);
                     if (spots1[i]["card"] == true && spots1[i]["cod"] == true) {
                         PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/moneymini.svg' class='payment1'>" +
                             "<img src='images/cardmini.svg' class='paymentSec'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " Р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>"
                     } else {
                         if (spots1[i]["card"] == false && spots1[i]["cod"] == true) { PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/moneymini.svg' class='payment1'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " Р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>" } else {
                             if (spots1[i]["card"] == true && spots1[i]["cod"] == false) { PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'>" + "<span class='OnepointSpan'><img src='images/cardmini.svg' class='payment1'></span><br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " Р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>" } else {
                                 PvzSpan = PvzSpan + "<div class='onePoint' id='OnePoint" + String(i) + "'><img src='images/" + spots1[i]["courier"] + ".svg' class='logoOfCompany'" + "<br><span class='he_ad'>" + Adress + "</span><br><span class='PvzPrice'>" + PvzPrice + " Р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='phone'>" + spots1[i]["phone"][0] + "</span><br><div class='time_table'>" + spots1[i]["time_table"] + "</div><span id='openCom" + String(i) + "' class='openCom'><br>Подробнее</span><span id='comm" + String(i) + "' class='Com hidden'>" + spots1[i]["comment"] + "</span></div><br>"
                             }
                         }
                     }

                     let placemark = new ymaps.Placemark([
                         spots1[i]["gps_paral"], spots1[i]["gps_meredian"]
                     ], {}, {});

                     placemark.events.add('click', function(e) {
                         shipping_method = spots1[i]["shipping_method"][k]
                         if (document.getElementsByClassName("selectedPvz")[0] != undefined) {
                             document.getElementsByClassName("selectedPvz")[0].classList.remove("selectedPvz")
                         }
                         if (screenWidth < 871) {
                             document.getElementById("listOfPvz").classList.remove("hidden");
                             document.getElementById("map").classList.add("hidden");
                         }
                         console.log("activated")
                         PvzSelectedText = "<span class='onePoint' ><span class='he_ad'>" + dotsOnCheckAdress(Adress) + "</span><br><span class='PvzPrice'>" + PvzPrice + " Р</span><br><span class'P_vzDays'>" + PvzDays + "</span><br><span class='time_table'>" + spots1[i]["time_table"] + "</span><br></span><br>"
                         idPvz = spots1[i]["id"];
                         placemark["color"] = "red";
                         delivery_price = PvzPrice;
                         document.getElementById("finalDelivery").innerText = String(delivery_price) + "Р";
                         document.getElementById("LastPrice").innerText = String(delivery_price + count * price) + "Р"
                         document.getElementById("OnePoint" + String(i)).classList.add("selectedPvz")
                         document.getElementById("OnePoint" + String(i)).scrollIntoView();
                         document.getElementById("needtoInnerTextHere").innerHTML = PvzSelectedText
                         document.getElementById("makeDecision").classList.remove("hidden")
                         if (spots1[i]["cod"] == true) {
                             payment_cash = true;
                             document.getElementById("payment_cash").classList.remove("hidden")
                         } else {
                             document.getElementById("payment_cash").classList.add("hidden")
                             payment_cash = false;
                         }
                         if (spots1[i]["card"] == true) {
                             document.getElementById("payment_cardPlace").classList.remove("hidden")
                             payment_cardPlace = true;
                         } else {
                             document.getElementById("payment_cardPlace").classList.add("hidden")
                             payment_cardPlace = false;
                         }
                         e.stopPropagation();
                     });


                     map.geoObjects.add(placemark);



                 }



             }
             console.log("next")
         }
         document.getElementById("PvzOrDelivery").classList.remove("hidden")

         document.getElementById("listOfPvz").innerHTML = PvzSpan;
         PvzSpan = "";
         for (let i = 0; i < spots1.length; i++) {

             if (document.getElementById("OnePoint" + String(i)) != null) {
                 document.getElementById("OnePoint" + String(i)).onclick = function() {
                     Adress = dotsOnCheckAdress(spots1[i]["address"])
                     for (let k = 0; k < spots1[i]["shipping_method"].length; k++) {
                         if (priceList[spots1[i]["shipping_method"][k]] != undefined) {
                             PvzPrice = priceList[spots1[i]["shipping_method"][k]]
                             shipping_method = spots1[i]["shipping_method"][k]
                         }
                     }
                     if (document.getElementsByClassName("selectedPvz")[0] != undefined) {
                         document.getElementsByClassName("selectedPvz")[0].classList.remove("selectedPvz")
                     }
                     PvzSelectedText = "<span class='onePoint2' ><span class='he_admini'>" + Adress + "</span><span class='PvzPricemini'>" + PvzPrice + " Р</span><span class='P_vzDaysmini'>" + PvzDays + "</span></span>" //+<br><span class='time_tablemini'>" + spots1[i]["time_table"] + "</span><br></span><br>
                     idPvz = spots1[i]["id"];
                     document.getElementById("OnePoint" + String(i)).classList.add("selectedPvz");
                     document.getElementById("needtoInnerTextHere").innerHTML = PvzSelectedText
                     document.getElementById("makeDecision").classList.remove("hidden")
                     if (spots1[i]["cod"] == true) {
                         payment_cash = true;
                         document.getElementById("payment_cash").classList.remove("hidden")
                     } else {
                         document.getElementById("payment_cash").classList.add("hidden")
                         payment_cash = false;
                     }
                     if (spots1[i]["card"] == true) {
                         document.getElementById("payment_cardPlace").classList.remove("hidden")
                         payment_cardPlace = true;
                     } else {
                         document.getElementById("payment_cardPlace").classList.add("hidden")
                         payment_cardPlace = false;
                     }
                     delivery_price = PvzPrice;
                     document.getElementById("finalDelivery").innerText = String(delivery_price) + "Р";
                     document.getElementById("LastPrice").innerText = String(delivery_price + count * price) + "Р"

                 };
                 document.getElementById("openCom" + String(i)).onclick = function() {
                     document.getElementById("comm" + String(i)).classList.toggle("hidden")


                 }
             }
         }
         document.getElementById("PvzOrDelivery").classList.remove("hidden")
         console.log("проблема не в пвз точно")
     })
 }