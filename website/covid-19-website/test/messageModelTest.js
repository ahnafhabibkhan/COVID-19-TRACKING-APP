import { assert } from 'chai';
import { getMessagesByID, insertMessage, deleteMessage,getMessages,modifyMessage} from"../src/backend/models/messageModel.js";
import {sleep} from "./commonFunctions.js";
// import the class for testing




describe('message related test',function(){
    it('test get message by different staff',async function(){
        getMessagesByID(3,(err, results) => {
            assert.equal(results[0]['Text'], "hey");
                
        });

        getMessages({ReceiveUserID:1},(err, results) => {
            assert.equal(results[0]['Text'], "hello");
            assert.equal(results[1]['Text'], "w4tw4t");
        });
    })


    //some functions and veriable to test insert and delete
    var rid=101;
    var sid=100;
    var mid;
    
    async function insertAMessage(){
        insertMessage({
            SendUserID:sid,
            ReceiveUserID: rid,
            Text:"Hello!",
            Location: "123 street",
            State:'Sent',
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkMessagesInsertion(){
        getMessagesByID(rid,(err, results) => {
            assert.equal(results[0]['Text'], "Hello!");
            mid=results[0]['ID'];
                
        });
    }
    async function modifyTheMessage(){
        modifyMessage({Text:"Modified"},mid,(err, results) => {
            
                
        });
    }

    async function checkMessagesModified(){
        getMessagesByID(rid,(err, results) => {
            assert.equal(results[0]['Text'], "Modified");
                
        });
    }
    async function deleteAMessage(){
        deleteMessage({ReceiveUserID:rid},(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getMessagesByID(rid,(err, results) => {
            assert.equal(results[0], undefined);
                     
        });
    }

    
    it('test insert modify and delete message',async function(){
        
        //add first, check after adding,then modify and check then delete and check again
        await insertAMessage();
        await sleep();
        await checkMessagesInsertion();
        await sleep();
        await modifyTheMessage();
        await sleep();
        await checkMessagesModified();
        await sleep();
        await deleteAMessage();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});