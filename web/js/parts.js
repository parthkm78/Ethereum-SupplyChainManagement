import { clearDetails, partListManager, carPartListManager, addItemToList, format_date, getActivePart, init_web3 } from "./utils.js"

window.onload = async function () {

    var x = await init_web3()

    document.getElementById("build-part").addEventListener("click", function () {
        console.log("Create Part")

        // It will create part with required data on blockchain using web3
        var serial = document.getElementById("create-serial-number").value
        var part_type = document.getElementById("create-part-type").value

        var creation_date = format_date()
        console.log("Serial: " + serial + " Date:" + creation_date + "Part Type: " + part_type)

        //It will create part hash and send to blockchain
        var part_sha = web3.utils.soliditySha3(window.accounts[0], web3.utils.fromAscii(serial),
            web3.utils.fromAscii(part_type), web3.utils.fromAscii(creation_date))

        window.pm.methods.buildPart(serial, part_type, creation_date).send({ from: window.accounts[0], gas: 1000000 }, function (error, result) {
            console.log("Smart Contract Transaction sent")
            console.log(result)
        })

        console.log(part_sha)

        //Add part hash to part-list for querying
        addItemToList(part_sha, "part-list", partListManager)
    })

    //Get part data from active item on owned list
    document.getElementById("part-change-ownership-btn").addEventListener("click", function () {
        console.log("Change Ownership")

         var hash_element = getActivePart("part-list")
        if (hash_element != undefined) {
            var to_address = document.getElementById("part-change-ownership-input").value
            if (to_address != "") {
                window.co.methods.changeOwnership(0, hash_element.textContent, to_address).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Changed ownership")
                        //Remove item from owned list
                        hash_element.parentElement.removeChild(hash_element)
                        clearDetails(document.getElementById("part-list-details"))
                    }
                })
            }

        }
    })
}