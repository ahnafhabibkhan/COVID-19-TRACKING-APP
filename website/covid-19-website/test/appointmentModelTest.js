import { assert } from 'chai';
import { getAppointments, insertAppointment, deleteAppointment} from"../src/backend/models/appointmentModel.js";
import {sleep} from "./commonFunctions.js";
// import the class for testing




describe('Appointment related test',function(){
    
    //some functions and veriable to test insert and delete
    var did=4;
    var pid=1;
    
    
    async function insertAAppointment(){
        insertAppointment({
            PID:pid,
            DID: did,
            LevelOfEmergency: 1,
            Priority:1,
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkAppointmentsInsertion(){
        getAppointments({DID:did},(err, results) => {
            assert.equal(results[0]['PID'], pid);
                
        });
    }
    
    async function deleteAAppointment(){
        deleteAppointment({DID:did},(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getAppointments({DID:did},(err, results) => {
            assert.equal(results[0], undefined);
                     
        });
    }

    
    it('test insert modify and delete Appointment',async function(){
        //add first, check after adding, then delete and check again
        
        await insertAAppointment();
        await sleep();
        await checkAppointmentsInsertion();
        await sleep();
        await deleteAAppointment();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});