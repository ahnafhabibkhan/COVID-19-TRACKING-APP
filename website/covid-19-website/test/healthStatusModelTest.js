import { assert } from 'chai';
import {sleep} from "./commonFunctions.js";
import { getLatestHealthStatusByID, getHealthStatusesByID, insertHealthStatus, deleteHealthStatusByPK,deleteHealthStatusByID,updateHealthStatusByPK } from"../src/backend/models/healthStatusModel.js";

describe('GET health status TEST',function(){

    it('test getHealthStatus',function(){
        getLatestHealthStatusByID(1,(err, results) => {
            assert.equal(results['fillOutDate'].toISOString(), "2022-02-06T05:00:00.000Z");
        });
        getHealthStatusesByID(1,(err, results) => {
            assert.equal(results[1]['fillOutDate'].toISOString(), "2022-02-05T05:00:00.000Z");
        });

        getLatestHealthStatusByID(11,(err, results) => {
            assert.equal(results, undefined);
        });
    });
    
});


describe('insert modify and delete health test',function(){

    it('test insert modify and delete health',function(){
        getLatestHealthStatusByID(10,(err, results) => {
            assert.equal(results, undefined);

            insertHealthStatus({
                PID: 10,
                fillOutDate: new Date("2022-02-06T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
                lastUpdateTime: "20:20:00",
                Weight: "84", 
                SympDescription: "None", 
                Temperature: "38", 
                BreathingIssues: "1", 
                Cough: "1", 
                LostTasteSmell: "0",
                MusclePain:"1",
                Diarrhea:"0",
                Vomitting: "0",
                Nausea: "0",
                Headache: "0",
                SoreThroat: "0",
                Covid:"0"},(err, results) => {
                    sleep();
                    getLatestHealthStatusByID(10,(err, results) => {
                        assert.equal(results['fillOutDate'].toISOString(), "2022-02-06T05:00:00.000Z");
                        updateHealthStatusByPK({Weight:90.0},10,new Date("2022-02-06T05:00:00.000Z").toJSON().slice(0, 10),(err,result)=>{
                            sleep();
                            getLatestHealthStatusByID(10,(err,results)=>{
                                assert.equal(results['Weight'],90.0);

                                deleteHealthStatusByPK({
                                    pid: 10,
                                    fillOutDate: new Date("2022-02-06T05:00:00.000Z").toJSON().slice(0, 10)
                                },(err,results)=>{
                                    sleep();
                                    getLatestHealthStatusByID(10,(err, results) => {
                                        assert.equal(results, undefined);
                                    });
                                });
                        
                                
                            });
                    
                            
                        });
                        
                    });
                       
                    
            });
        });
        
        
        
            
        //     modifyUser({Email: "testModified@gmail.com"},id,(err, results) => {

        //     });
        //     getUserByEmail("testOnly@gmail.com",(err, results) => {
        //         assert.equal(results, undefined);
        //     });
        //     getUserByEmail("testModified@gmail.com",(err, results) => {
        //         assert.equal(results['FirstName'], "testFirst");
        //     });

        //     deleteUserById(id,(err, results) => {
                
        //     });
            
        //     getUserByEmail("testOnly@gmail.com",(err, results) => {
        //         assert.equal(results, undefined);
        //     });
        //     getUserByEmail("testModified@gmail.com",(err, results) => {
        //         assert.equal(results, undefined);
        //     });
        // });
        
        
    });
    
});

