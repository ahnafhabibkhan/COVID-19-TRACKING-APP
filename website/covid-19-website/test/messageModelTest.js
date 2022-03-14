import { assert } from 'chai';
import { getMessagesByID, insertMessage, deleteMessage} from"../src/backend/models/messageModel.js";
import {sleep} from "./commonFunctions.js";





describe('message related test',function(){
    var rid=4;
    var sid=1;
    
    
    async function insertAMessage(){
        insertMessage({
            SendUserID:sid,
            ReceiveUserID: rid,
            Text:"Hello!",
            Location: "123 street",
            MessageType:'Chat',
            State:'Sent',
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkMessagesInsertion(){
        getMessagesByID(rid,(err, results) => {
            assert.equal(results[0]['Text'], "Hello!");
                
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
        
        
        await insertAMessage();
        await sleep();
        await checkMessagesInsertion();
        await sleep();
        await deleteAMessage();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});