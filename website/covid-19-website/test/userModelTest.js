
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById, modifyUser } from"../src/backend/models/userModel.js";

describe('GET USER BY EMAIL TEST',function(){

    it('get user test',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["Email"], "admin@gmail.com");
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results, undefined);
        });
    });
    
});


describe('insert modify and delete user test',function(){

    it('insert modify and delete user test',function(){
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
            
            
            modifyUser({Email: "testModified@gmail.com"},id,(err, results) => {

            });
            getUserByEmail("testOnly@gmail.com",(err, results) => {
                assert.equal(results, undefined);
            });
            getUserByEmail("testModified@gmail.com",(err, results) => {
                assert.equal(results['FirstName'], "testFirst");
            });

            deleteUserById(id,(err, results) => {
                
            });
            
            getUserByEmail("testOnly@gmail.com",(err, results) => {
                assert.equal(results, undefined);
            });
            getUserByEmail("testModified@gmail.com",(err, results) => {
                assert.equal(results, undefined);
            });
        });
        
        
    });
    
});
