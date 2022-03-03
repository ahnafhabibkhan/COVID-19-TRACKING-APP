var chai = require('chai')
  , chaiHttp = require('chai-http');
var assert = chai.assert;
var step= require('mocha-steps');



var url='http://localhost:5000'

chai.use(chaiHttp);
async function sleep(ms) {
    if(ms==undefined)
        ms=50;
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
};

describe('User related API intergration test',async function(){
    
    it('test get user by email API',async function(){
        chai.request(url).get('/users/admin@gmail.com').end((err,res)=>{
            assert.equal(res['body']['FirstName'],"Admin");
        });
        
    });
    it('test get all users',async function(){
        chai.request(url).get('/users').end((err,res)=>{
            assert.equal(res['body'][1]['FirstName'],'Admin');
        });
    });
    it('test get lastest covid user',async function(){
        chai.request(url).get('/usersByCovid').end((err,res)=>{
            assert.equal(res['body'][0]['FirstName'],'John');
        });
    });
    it('test get user by data',async function(){
        await sleep();
        chai.request(url).get('/users').send({FirstName:'John'}).then((err,res)=>{
            assert.equal(res['body'][0]['FirstName'],'Smith');
        });
        
    });

    
    var id;
    async function iniCheck(){
        chai.request(url).get('/users/testAPIOnly@gmail.com').end((err,res)=>{
            assert.equal(res['body']['FirstName'],undefined);
            //console.log(res);
        });
    }
    async function addAUser(){
        chai.request(url).post('/user').send({
            Email: "testAPIOnly@gmail.com",
            FirstName: "testFirst",
            LastName: "testLast",
            Telephone: "4504664545", 
            Address: "123 Main", 
            Role: "Patient", 
            Password: "TestPass", 
            Country: "Canada"}).end((err,res)=>{

            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/users/testAPIOnly@gmail.com').end((err,res)=>{
            //console.log(res);
            assert.equal(res['body']['FirstName'],"testFirst");
            
            id=res['body']['UserID'];
        });
    }
    async function modifyTheUser(){
        chai.request(url).put('/users/'+id).send({
            FirstName: "alteredtestFirst"
            }).then((err,res)=>{
            
        });
    }
    async function checkAfterModify(){
        chai.request(url).get('/users/testAPIOnly@gmail.com').end((err,res)=>{
            assert.equal(res['body']['FirstName'],"alteredtestFirst");
        });
    }
    async function deleteTheUser(){
        chai.request(url).delete('/users/'+id).end((err,res)=>{
        
        });
    }
    async function runModifyUserTest(){
        await iniCheck();
        await sleep();
        await addAUser();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await modifyTheUser();
        await sleep();
        await checkAfterModify();
        await sleep();
        await deleteTheUser();
        await sleep();
        await iniCheck();
    }

    it('test add and delete user',async function(){
        
        await runModifyUserTest();
        
    })
    
});

describe('avaliablilty related',async function(){
    var id=4;
    async function iniCheck(){
        chai.request(url).get('/availability/'+id).end((err,res)=>{
            assert.equal(res['body'][0],undefined);
             
        });
    }    
    async function addAAvailability(){
        chai.request(url).post('/availability').send({
            DID: id,
            DayOfWeek:"Monday",
            StartTime: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            EndTime: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            SpecificDay: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),})
            .end((err,res)=>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/availability/'+id).end((err,res)=>{
            assert.equal(res['body'][0]['DayOfWeek'],"Monday");
            
            
        });
    }
    async function deleteTheAvailability(){
        chai.request(url).post('/deleteavailability').send({DID:id})
        .end((err,res)=>{

        });
    }
    async function runAvailabilityTest(){
        await iniCheck();
        await addAAvailability();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await deleteTheAvailability();
        await sleep();
        await iniCheck();
    }

    it('test add and delete availiablty',async function(){
        
        await runAvailabilityTest();
        
    })


});