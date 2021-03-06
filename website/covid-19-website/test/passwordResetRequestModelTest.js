import { assert } from 'chai';
import {sleep} from "./commonFunctions.js";
import { getPasswordResetRequestByID, insertPasswordResetRequest, deletePasswordResetRequestById, updatePasswordResetRequestById } from "../src/backend/models/passwordResetRequestModel.js";
// import the class for testing

//test get password method 
describe('GET Password ResetRequest TEST',function(){

    it('get Password resetRequest test',function(){
        getPasswordResetRequestByID(1,(err, results) => {
            assert.equal(results["Key"], "BE7CUI");
        });
        getPasswordResetRequestByID(999,(err, results) => {
            assert.equal(results, undefined);
        });
    });
    
});


//add first, check after adding, then modify and check, then delete and check again
describe('insert modify and delete passwordreset test',function(){

    it('insert modify and delete passwordrest test',function(){
        getPasswordResetRequestByID(20,(err, results) => {
            assert.equal(results, undefined);

            insertPasswordResetRequest({
                UserID: 20,
                Key: "TEST11"},(err, results) => {
                    sleep();
                    getPasswordResetRequestByID(20,(err, results) => {
                        assert.equal(results['Key'], "TEST11");
                        const id=20;
                        
                        
                        updatePasswordResetRequestById({Key: "TEST22"},id,(err, results) => {
                            sleep();
                            getPasswordResetRequestByID(20,(err, results) => {
                                assert.equal(results['Key'], "TEST22");

                                deletePasswordResetRequestById(id,(err, results) => {
                                    sleep();
                                    getPasswordResetRequestByID(20,(err, results) => {
                                        assert.equal(results, undefined);
                                    });
                                });
                                
                                
                            });
                
                            
                        });
                        
                        
                    });

            });
        });
        
        
        
        
        
    });
    
});