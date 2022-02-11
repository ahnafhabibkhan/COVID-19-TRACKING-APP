// const assert = require('chai').assert;
//const sinon=require("sinon");
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById } from"../src/backend/models/userModel.js";

describe('GET USER BY EMAIL TEST',function(){

    it('get user test',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["Email"], "admin@gmail.com");
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results, undefined);
        });
    });
    // after(function(done){
    //     process.exit(); // <-- THIS LOOKS REALLY BAD
    //   });
});
// describe.close();

describe('insert and delete test',function(){

    it('insert and delete test',function(){
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
        insertUser({
            Email: "testOnly@gmail.com",
            FirstName: "testFirst",
            LastName: "testLast",
            Telephone: "4504664545", 
            Address: "123 Main", 
            Role: "Patient", 
            Password: "TestPass", 
            City: "Montreal", 
            Country: "Canada"},(err, results) => {

        });
        
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results['Email'], "testOnly@gmail.com");
            const id=results['UserID'];
            console.log("checking id after adding: ",id);
            
            console.log("checking id out side: ",id);
            
            deleteUserById(id,(err, results) => {
                console.log("checking delete by id: ",id);
             });
        });
        
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
    });
    
});
