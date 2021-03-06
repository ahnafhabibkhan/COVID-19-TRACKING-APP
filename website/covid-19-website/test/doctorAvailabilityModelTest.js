import { assert } from 'chai';
import { getAvailabilities, insertAvailability, deleteAvailability} from"../src/backend/models/doctorAvailabilityModel.js";
import {sleep} from "./commonFunctions.js";
// import the class for testing




describe('doctor related test',function(){
    
    //some functions and veriable to test insert and delete
    var id=100;
    
    
    async function insertAAvailability(){
        insertAvailability({
            DID: id,
            DayOfWeek:"Monday",
            StartTime: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            EndTime: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            SpecificDay: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkAvailabilitiesInsertion(){
        getAvailabilities(id,(err, results) => {
            assert.equal(results[0]['DayOfWeek'], "Monday");
                
        });
    }
    
    async function deleteAAvailability(){
        deleteAvailability({DID:id},(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getAvailabilities(id,(err, results) => {
            assert.equal(results[0], undefined);
                     
        });
    }

    
    it('test insert modify and delete doctor availibilities',async function(){
        
        //add first, check after adding, then delete and check again
        await insertAAvailability();
        await sleep();
        await checkAvailabilitiesInsertion();
        await sleep();
        await deleteAAvailability();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});
