
// import the class for testing
import { assert } from 'chai';
import { getAccountRequests,getAccountRequestByEmail, insertAccountRequest, deleteAccountRequestById} from"../src/backend/models/accountRequestModel.js";
import {sleep} from "./commonFunctions.js";





describe('AccountRequest related test',function(){
    // test get account related functions
    it('test get account request',async function(){
        getAccountRequestByEmail('benoit@gmail.com',(err,results)=>{
            assert.equal(results['FirstName'],'Benoit');
        });
        getAccountRequests((err,results)=>{
            assert.equal(results['FirstName'],'Benoit');
        });
    });


    //some functions and veriable to test insert and delete
    var did=4;
    var pid=1;
    
    
    async function insertAAccountRequest(){
        insertAccountRequest({
            Email: "testOnly@gmail.com",
            FirstName: "testFirst",
            LastName: "testLast",
            Telephone: "4504664545", 
            Address: "123 Main", 
            Role: "Patient", 
            Password: "TestPass", 
            City:'testCity', 
            Country: "Canada",
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')},
            (err, results) => {
                
                

        });
    }
    async function checkAccountRequestsInsertion(){
        getAccountRequestByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results['FirstName'], 'testFirst');
                
        });
    }
    
    async function deleteAAccountRequest(){
        deleteAccountRequestById("testOnly@gmail.com",(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getAccountRequestByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
                
        });
    }

    
    it('test insert modify and delete AccountRequest',async function(){
        //add first, check after adding, then delete and check again
        
        await insertAAccountRequest();
        await sleep();
        await checkAccountRequestsInsertion();
        await sleep();
        await deleteAAccountRequest();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});