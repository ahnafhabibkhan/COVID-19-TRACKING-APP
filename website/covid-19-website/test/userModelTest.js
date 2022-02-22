
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById, modifyUser,getUsersByData,getLatestPositiveUsers,getUsers } from"../src/backend/models/userModel.js";
import {sleep} from "./commonFunctions.js";


describe('GET USER BY EMAIL TEST',function(){

    it('test get user by email',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["FirstName"], "Admin");
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results, undefined);
        });
        
    });
    it('test get latest postive user',function(){
        getLatestPositiveUsers((err,results)=>{
            assert.equal(results[0]["FirstName"], "John");
        });
    });
    it('test get user by data',function(){
        getUsersByData({FirstName:'John'},(err,results)=>{
            
            assert.equal(results[0]["LastName"],'Smith');
        });
    });
    it('test get users',function(){
        getUsers((err,results)=>{
            assert.equal(results[1]['FirstName'],'Admin');
        })
        
    });
});


describe('insert modify and delete user test',function(){
    var id;
    
    async function checkUserNotExsist(){
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
            
            
            
        });
    }
    async function insertAUser(){
        insertUser({
            Email: "testOnly@gmail.com",
            FirstName: "testFirst",
            LastName: "testLast",
            Telephone: "4504664545", 
            Address: "123 Main", 
            Role: "Patient", 
            Password: "TestPass", 
            City: "Montreal", 
            Country: "Canada",
            Travelled:0},(err, results) => {
                
                

        });
    }
    async function checkUserInsertion(){
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results['Email'], "testOnly@gmail.com");
            id=results['UserID'];
            
                    
                    
        });
    }
    async function modifyAUser(){
        modifyUser({Email: "testModified@gmail.com"},id,(err, results) => {
    
        });
    }
    async function checkUserModified(){
        
        getUserByEmail("testModified@gmail.com",(err, results) => {
            assert.equal(results['FirstName'], "testFirst");
            
        });

        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
            
            
        });
    }
    async function deleteAUser(){
        deleteUserById(id,(err, results) => {
            
        
        });
    }
    async function checkAfterDelete(){
        
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
        getUserByEmail("testModified@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
    }

    
    it('test insert modify and delete user',async function(){
        
        await checkUserNotExsist();
        await insertAUser();
        await sleep();
        await checkUserInsertion();
        await sleep();
        await modifyAUser();
        await checkUserModified();
        await deleteAUser();
        await sleep();
        await checkAfterDelete();
        
    }).timeout(10000);

    
});
