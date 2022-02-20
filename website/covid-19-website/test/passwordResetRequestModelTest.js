import { assert } from 'chai';
import { getPasswordResetRequestByID, insertPasswordResetRequest, deletePasswordResetRequestById, updatePasswordResetRequestById } from "../src/backend/models/passwordResetRequestModel.js";

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

describe('insert modify and delete passwordreset test',function(){

    it('insert modify and delete passwordrest test',function(){
        getPasswordResetRequestByID(20,(err, results) => {
            assert.equal(results, undefined);

            insertPasswordResetRequest({
                UserID: 20,
                Key: "TEST11"},(err, results) => {
                    getPasswordResetRequestByID(20,(err, results) => {
                        assert.equal(results['Key'], "TEST11");
                        const id=20;
                        
                        
                        updatePasswordResetRequestById({Key: "TEST22"},id,(err, results) => {
                            
                            getPasswordResetRequestByID(20,(err, results) => {
                                assert.equal(results['Key'], "TEST22");
                                deletePasswordResetRequestById(id,(err, results) => {
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