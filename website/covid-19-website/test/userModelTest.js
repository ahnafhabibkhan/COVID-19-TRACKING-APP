
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById, modifyUser } from"../src/backend/models/userModel.js";
import {step} from'mocha-steps';
import {waterfall} from 'async';

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


// describe('insert modify and delete user test',function(){
//     var id;
//     step('check exsitance user before',function(){
//         getUserByEmail("testOnly@gmail.com",(err, results) => {
//             assert.equal(results, undefined);
//             //call back inside callback to make sure run in order
//             console.log(1);
            
//         });
        
        
//     });
//     step('insert user',function(){
//         insertUser({
//             Email: "testOnly@gmail.com",
//             FirstName: "testFirst",
//             LastName: "testLast",
//             Telephone: "4504664545", 
//             Address: "123 Main", 
//             Role: "Patient", 
//             Password: "TestPass", 
//             City: "Montreal", 
//             Country: "Canada",
//             Travelled:0},(err, results) => {
//                 console.log(2);
                

//         });
//     });
    
//     step('check added user',function(){
//         getUserByEmail("testOnly@gmail.com",(err, results) => {
//             assert.equal(results['Email'], "testOnly@gmail.com");
//             id=results['UserID'];
//             console.log(3);
            
            
//         });
//     });
//     step('modify user',function(){
//         modifyUser({Email: "testModified@gmail.com"},id,(err, results) => {
//             console.log(4);
            
//         });
//     });
//     step('check users again after modify',function(){
//         getUserByEmail("testModified@gmail.com",(err, results) => {
//             assert.equal(results['FirstName'], "testFirst");
//         });

//         getUserByEmail("testOnly@gmail.com",(err, results) => {
//             assert.equal(results, undefined);
//             console.log(5);

            
//         });
//     });
//     step('delete user',function(){
//         deleteUserById(id,(err, results) => {
//             console.log(6);
            
//         });
//     });

//     step('check after deleting',function(){
//         getUserByEmail("testOnly@gmail.com",(err, results) => {
//             assert.equal(results, undefined);
//         });
//         getUserByEmail("testModified@gmail.com",(err, results) => {
//             assert.equal(results, undefined);
//         });
//     });
        
    
// });
