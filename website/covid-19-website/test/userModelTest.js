
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById, modifyUser } from"../src/backend/models/userModel.js";
import {sleep} from "./commonFunctions.js"


describe('GET USER BY EMAIL TEST',function(){

    it('test get user by email',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["FirstName"], "Admin");
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results, undefined);
        });
    });
    
});


describe('insert modify and delete user test',function(){
    var id;
    // step('check exsitance user before',function(){
    //     getUserByEmail("testOnly@gmail.com",(err, results) => {
    //         assert.equal(results, undefined);
    //         //call back inside callback to make sure run in order
    //         console.log(1);
            
    //     });
        
        
    // });
    // step('insert user',function(){
    //     insertUser({
    //         Email: "testOnly@gmail.com",
    //         FirstName: "testFirst",
    //         LastName: "testLast",
    //         Telephone: "4504664545", 
    //         Address: "123 Main", 
    //         Role: "Patient", 
    //         Password: "TestPass", 
    //         City: "Montreal", 
    //         Country: "Canada",
    //         Travelled:0},(err, results) => {
    //             console.log(2);
                

    //     });
    // });
    
    // step('check added user',function(){
    //     getUserByEmail("testOnly@gmail.com",(err, results) => {
    //         assert.equal(results['Email'], "testOnly@gmail.com");
    //         id=results['UserID'];
    //         console.log(3);
            
            
    //     });
    // });
    // step('modify user',function(){
    //     modifyUser({Email: "testModified@gmail.com"},id,(err, results) => {
    //         console.log(4);
            
    //     });
    // });
    // step('check users again after modify',function(){
    //     getUserByEmail("testModified@gmail.com",(err, results) => {
    //         assert.equal(results['FirstName'], "testFirst");
    //     });

    //     getUserByEmail("testOnly@gmail.com",(err, results) => {
    //         assert.equal(results, undefined);
    //         console.log(5);

            
    //     });
    // });
    // step('delete user',function(){
    //     deleteUserById(id,(err, results) => {
    //         console.log(6);
            
    //     });
    // });

    // step('check after deleting',function(){
    //     getUserByEmail("testOnly@gmail.com",(err, results) => {
    //         assert.equal(results, undefined);
    //     });
    //     getUserByEmail("testModified@gmail.com",(err, results) => {
    //         assert.equal(results, undefined);
    //     });
    // });
    


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
