import { carListManager, addItemToList, format_date, init_web3, carPartListManager, getMultipleActivePart, getActivePart, clearCarDetails, getOwnerHistoryFromEvents, getOwnedItemsFromEvent } from "./utils.js"



window.onload = async function () {

    var x = await init_web3()
    //Get all the parts that belonged to this factory and then check the ones that still do
    var parts = await getOwnedItemsFromEvent(window.accounts[0], 'TransferPartOwnership')
    console.log(parts)
    for (var i = 0; i < parts.length; i++) {
        var owners = await getOwnerHistoryFromEvents('TransferPartOwnership', parts[i])
        console.log(owners)
        if (owners[owners.length - 1] == window.accounts[0]) {
            addItemToList(parts[i], "car-part-list", carPartListManager)
        }
    }

    document.getElementById("build-car").addEventListener("click", function () {
        console.log("Build Car")

        //It will the serial number
        var serial = document.getElementById("create-car-serial-number").value
       
        //check user has provided serial number is empty or not
        if (serial != "") {

            //Then the parts that will be present on the car
            var part_list = getMultipleActivePart()
            var part_array = [];
            for (var i = 0; i < part_list.length; i++) {
                console.log();
                part_array[i]=part_list[i].textContent;
            }

            var creation_date = format_date()

            console.log("Buildingcar with below paramteres")
            console.log(serial)
            console.log(part_array)
            console.log(creation_date)
         
            //Build car
            window.pm.methods.buildProduct(serial, "Car", creation_date, part_array).send({ from: window.accounts[0], gas: 2000000 }, function (error, result) {    
                
                if (error) {
                    console.log(error)
                } else {
                    console.log("Car created")
                    //Add hash to car owned list
                    var car_sha = web3.utils.soliditySha3(window.accounts[0], web3.utils.fromAscii(serial),
                        web3.utils.fromAscii("Car"), web3.utils.fromAscii(creation_date))
                    addItemToList(car_sha, "car-list", carListManager)

                    //Remove parts from available list
                    for (var i = 0; i < part_list.length; i++) {
                        part_list[i].removeEventListener("click", carPartListManager)
                        part_list[i].parentElement.removeChild(part_list[i])
                    }
                }
            })
        }
    })

    document.getElementById("car-change-ownership-btn").addEventListener("click", function () {
        console.log("Change Ownership")
        
        //Get car hash from active item on owned list
        var hash_element = getActivePart("car-list")
        if (hash_element != undefined) {
            var to_address = document.getElementById("car-change-ownership-input").value
            if (to_address != "") {
                window.co.methods.changeOwnership(1, hash_element.textContent, to_address).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Changed ownership")
                        //Logic to remove item from owned list
                        hash_element.parentElement.removeChild(hash_element)
                        clearCarDetails()
                    }
                })
            }

        }
    })
}
