let input = document.getElementById("in_put")
input.oninput = function() {
    document.getElementById("options").classList.remove("hidden");
    document.getElementById("PvzOrDelivery").classList.add("hidden")
    document.getElementById("blockOfInf").classList.add("hidden");
    document.getElementById("PvzSelectedFinally").classList.add("hidden");
    document.getElementById("PvzOrDelivery").classList.add("hidden");
    document.getElementById("final").classList.add("hidden")
    deleteAll()
    if (input.value != "") { suggestSettlement(String(input.value), goodDeliveryIds); }
}