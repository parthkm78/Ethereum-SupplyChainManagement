import { init_web3, getOwnedItemsFromEvent, dealerPartListManager, dealerProductListManager, addItemToList } from "./utils.js"


window.onload = async function () {

    var x = await init_web3()

    //It will fetch all the parts and products that belong to  dealer
    getOwnedItemsFromEvent(window.accounts[0], 'TransferPartOwnership').then((parts) => {
        console.log("part Events")
        console.log(parts)
        for (var i = 0; i < parts.length; i++) {
            addItemToList(parts[i], "parts-history", dealerPartListManager)
        }
    })

    //It will fetch all the Product and products that belong to  dealer
    getOwnedItemsFromEvent(window.accounts[0], 'TransferProductOwnership').then((products) => {
        console.log("prod Events")
        console.log(products)
        for (var i = 0; i < products.length; i++) {
            addItemToList(products[i], "car-history", dealerProductListManager)
        }
    })

    
}