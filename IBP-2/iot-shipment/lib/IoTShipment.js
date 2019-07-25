/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api')
const Shipment = require('./definitions').Shipment
const initShipments = require('./definitions').initShipments

class IoTShipment extends Contract {

    /**
     * Instatiate the chaincode with initShipments
     * Instantiation code is optional.
    */
    async initializeLedger(ctx) {
        for (let i = 0; i < initShipments.length; i++) {
            let sShipment = await Shipment(initShipments[i])
            await ctx.stub.putState(sShipment.shipmentId, Buffer.from(JSON.stringify(sShipment)))
            await ctx.stub.putState('lastkey',sShipment.shipmentId)
            //console.info(`Added: `, JSON.stringify(sShipment))
        }
        //console.info(`Ledger Initialized`)
    }

    /**
     * Create a new shipment record. Assumption: IoT data is coming in from
     * an IoT Platform instance. 
    */
    async createShipment(ctx, shipmentRecord) {
            //console.info(`Creating New Shipment Record`)
            let shipmentJSON = JSON.parse(shipmentRecord)
            let sShipment =  await Shipment(shipmentJSON)
            await ctx.stub.putState(sShipment.shipmentId, Buffer.from(JSON.stringify(sShipment)))
            // Additional potential logic :  retrieve the last record, 
            // check if the new record is greater (assuming a chronological order)
            await ctx.stub.putState('lastkey',sShipment.shipmentId)
            //console.info(`New Shipment Record created: `, shipmentRecord) 
    }

    /**
     * Update an existing shipment record's Business address
    */
    async changeShipmentAddress(ctx, shipmentId, bizAddress) {
        
        // get the shipment from chaincode state
        const shipmentAsBytes = await ctx.stub.getState(shipmentId)
        if (!shipmentAsBytes || shipmentAsBytes.length === 0) {
            throw new Error(`${shipmentId} does not exist in the ledger.`)
        }
        bizAddress = bizAddress
        let jsonBizAddress = JSON.parse(bizAddress)
        let retrievedShipment = JSON.parse(shipmentAsBytes.toString())
        
        let origBizData = retrievedShipment.business 
        // Only address can be changed. Not other data 
        // pertaining to the shipment in question can be updated
        jsonBizAddress.Po_num = origBizData.Po_num
        jsonBizAddress.Pro_num = origBizData.Pro_num
        jsonBizAddress.Bill_lading = origBizData.Bill_lading
        retrievedShipment.business = jsonBizAddress
        await ctx.stub.putState(shipmentId, Buffer.from(JSON.stringify(retrievedShipment)))
        //console.info(`Shipment Address updated for record ${shipmentId}`)
         
    }

    /**
     * Query an existing shipment record. 
    */
    async queryShipment(ctx, shipmentId) {
        //console.info(`Fetch single Shipment Record`)
        // get the shipment record from chaincode state
        const shipmentAsBytes = await ctx.stub.getState(shipmentId) 
        if (!shipmentAsBytes || shipmentAsBytes.length === 0) {
            throw new Error(`${shipmentId} does not exist`);
        }
        //console.info(`Fetched single Shipment Record`)
        return shipmentAsBytes.toString();  
    }

    
    /**
     * Query existing shipment records as a batch. 
    */

    async queryAllShipments(ctx) {
        //console.info(`Fetch Bulk Shipments`)
        const startKey = initShipments[0].Shipment_id
        const endKey = await ctx.stub.getState('lastkey')
        const endKeyStr = endKey.toString()
        const iterator = await ctx.stub.getStateByRange(startKey, endKeyStr);

        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                //console.info(allResults);
                //console.info(`Fetched Bulk Shipments`);
                return JSON.stringify(allResults);
            }
        }
    
    }
    /**
     * read an existing PLUSBSR
     * @param {Context} ctx the transaction context
     * @param {String} SRId  id of the record to be deleted
    */
   async deleteShipment(ctx, shipmentId) {
        const shipmentAsBytes = await ctx.stub.getState(shipmentId) 
        console.log("shipmentAsBytes ", shipmentAsBytes.toString())
        if (!shipmentAsBytes || shipmentAsBytes.length === 0) 
            throw new Error(`${shipmentId} does not exist`);
        else 
        {
            await ctx.stub.deleteState(shipmentId);
            console.log("Delete successful")
        }
    }
}
module.exports = IoTShipment;

