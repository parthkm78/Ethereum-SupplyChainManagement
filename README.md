# Ethereum Supply Chain Demo

Project : 
    Supply chain application for car manufacturing.
    It will show part & car based on ownership of account(manage by selected account on metamask).
    It is build as genreric supply chain management.

 functionalities: It record all the transection on ethereum network and fetch detail from network.
    Smart Contract:
        It has two Smart Contracts:
        
            * ProductManagement - It will Register products with data
            * ChangeOwnership - It tracks owneship.

This web interface has mainly three roles: 
        Parts Factory
        Car Factory
        Dealers

Each has its own page & data.

## Setup and Running

The contract logic, migrations and tests use [Truffle](https://truffleframework.com/truffle) and [Ganache](https://truffleframework.com/ganache) as basic environment, so first install them:

`npm install -g ganache-cli truffle`

Also, we host our interface with http-server, a simple node package, so install it too:

Install [Metamask](https://metamask.io/) to enable interactions using the web interface.
I have installed browser plugin.

Run ganache-cli and take note of the mnemonic from the console output.
Setup Metamask with the mnemonic and connect to "localhost:8545", 

import all account from ganache-cli to MetaMask. Below link you can use as refrence,
https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask

Before running web application,
    Check ganache-cli & MetaMask are running.

Deploy Smart Contract:

Go to the project folder and run: truffle migrate --reset

Note : Truffle will compile and deploy the contracts, with their addresses to the console.
Take note of the ChangeOwnership and ProductManagement addresses and replace the values on "web/js/utils.js".
The parts you need to change are:

            window.pm.options.address = '0xE59871XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX8A70'
            window.co.options.address = "0x5F064ECXXXXXXXXXXXXXXXXXXXXXXXXXXXXXd000"

    -----------------------------------
    Ex: I run truffle migrate --reset
    I got bellow output,
    Replacing 'ProductManagement'
       -----------------------------
       > transaction hash:    0x834568174cde8e4397d3ec0302e4049f0615eb94dc9d320961a550e1dc30c4fa
       > Blocks: 0            Seconds: 0
       > contract address:    0x670362E84B140F0d67581293e14e329566eE9714
       .....


       Replacing 'ChangeOwnership'
       ---------------------------
       > transaction hash:    0xd4af42db6c955924f836958e6a06a3fd0da73b559f834ecf2ea20ed15b7f1a20
       > Blocks: 0            Seconds: 0
       > contract address:    0x356322d3697275919831fEB0cf6959e86f4FbEe2

       ......

       Take value of Contact address key & Replace in file
------------------------------------     

Deploy Project on server, here i used http-server

Go to *./Web * folder and run command : http-server 

It will deploy project. Default port is 8080.

Go to browser and  type localhost:8080 as url to check application is running.

*User Guide: Follow SupplyChainManagement_User_Guide.docx

## References

* [Truffle Suite](https://truffleframework.com/)
* [Materialize](https://materializecss.com/)
* [Solidity](https://solidity.readthedocs.io/)
* [Truffle](https://www.trufflesuite.com/)
