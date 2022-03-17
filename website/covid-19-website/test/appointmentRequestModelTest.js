import { assert } from 'chai';
import { getAppointmentRequests, insertAppointmentRequest, deleteAppointmentRequest} from"../src/backend/models/appointmentRequestModel.js";
import {sleep} from "./commonFunctions.js";
// import the class for testing




describe('AppointmentRequest related test',function(){
    //some functions and veriable to test insert and delete
    var did=4;
    var pid=1;
    
    
    async function insertAAppointmentRequest(){
        insertAppointmentRequest({
            PID:pid,
            DID: did,
            RequestedBy:"P",
            LevelOfEmergency: 1,
            Priority:1,
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkAppointmentRequestsInsertion(){
        getAppointmentRequests({DID:did},(err, results) => {
            assert.equal(results[0]['PID'], pid);
                
        });
    }
    
    async function deleteAAppointmentRequest(){
        deleteAppointmentRequest({DID:did},(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getAppointmentRequests({DID:did},(err, results) => {
            assert.equal(results[0], undefined);
                     
        });
    }

    
    it('test insert modify and delete AppointmentRequest',async function(){
        
        //add first, check after adding, then delete and check again
        await insertAAppointmentRequest();
        await sleep();
        await checkAppointmentRequestsInsertion();
        await sleep();
        await deleteAAppointmentRequest();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});