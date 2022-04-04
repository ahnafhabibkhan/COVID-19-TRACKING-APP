import { assert } from 'chai';
import {  insertNotification, deleteNotification,getNotifications,modifyNotification} from"../src/backend/models/notificationModel.js";
import {sleep} from "./commonFunctions.js";
// import the class for testing




describe('notification related test',function(){
    


    //some functions and veriable to test insert and delete
    var rid=101;
    
    var mid;
    
    async function insertANotification(){
        insertNotification({
            Message:"Hello!",
            Recipient: rid,
            Read:0,
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkNotificationsInsertion(){
        getNotifications({Recipient: rid},(err, results) => {
            assert.equal(results[0]['Message'], "Hello!");
            mid=results[0]['ID'];
            
        });
    }
    async function modifyTheNotification(){
        modifyNotification({Message:"Modified"},mid,(err, results) => {
            
                
        });
    }

    async function checkNotificationsModified(){
        getNotifications({Recipient: rid},(err, results) => {
            assert.equal(results[0]['Message'], "Modified");
                
        });
    }
    async function deleteANotification(){
        deleteNotification({Recipient: rid},(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getNotifications({Recipient: rid},(err, results) => {
            assert.equal(results[0], undefined);
                     
        });
    }

    
    it('test insert modify and delete notification',async function(){
        
        //add first, check after adding,then modify and check then delete and check again
        await insertANotification();
        await sleep();
        await checkNotificationsInsertion();
        await sleep();
        await modifyTheNotification();
        await sleep();
        await checkNotificationsModified();
        await sleep();
        await deleteANotification();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});