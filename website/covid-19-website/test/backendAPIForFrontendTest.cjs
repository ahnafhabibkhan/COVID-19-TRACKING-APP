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

describe('avaliablilty related test',async function(){
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

describe('messages related test',async function(){
    var rid=4;
    var sid=1;
    async function iniCheck(){
        chai.request(url).get('/messages/'+rid).end((err,res)=>{
            assert.equal(res['body'][0],undefined);
             
        });
    }    
    async function addAMessage(){
        chai.request(url).post('/messages').send({
            SendUserID:sid,
            ReceiveUserID: rid,
            Text:"Hello!",
            Location: "123 street",
            MessageType:'Chat',
            State:'Sent',
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')})
            .end((err,res)=>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/messages/'+rid).end((err,res)=>{
            assert.equal(res['body'][0]['Text'],"Hello!");
            
            
        });
    }
    async function deleteTheMessage(){
        chai.request(url).delete('/messages').send({ReceiveUserID:rid})
        .end((err,res)=>{

        });
    }
    async function runMessageTest(){
        await iniCheck();
        await addAMessage();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await deleteTheMessage();
        await sleep();
        await iniCheck();
    }

    it('test add and delete message',async function(){
        
        await runMessageTest();
        
    })


});

describe('AppointmentRequests related test',async function(){
    var did=4;
    var pid=1;
    async function iniCheck(){
        chai.request(url).post('/appointmentrequests').send({PID:pid}).end((err,res)=>{
            assert.equal(res['body'][0],undefined);
             
        });
    }    
    async function addAAppointmentRequest(){
        chai.request(url).post('/appointmentrequest').send({
            PID:pid,
            DID: did,
            RequestedBy:"P",
            LevelOfEmergency: 1,
            Priority:1,
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')})
            .end((err, results) =>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).post('/appointmentrequests').send({PID:pid}).end((err,res)=>{
            assert.equal(res['body'][0]['RequestedBy'],"P");
            
            
        });
    }
    async function deleteTheAppointmentRequest(){
        chai.request(url).post('/deleteappointmentrequest').send({PID:pid})
        .end((err,res)=>{

        });
    }
    async function runAppointmentRequestTest(){
        await iniCheck();
        await addAAppointmentRequest();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await deleteTheAppointmentRequest();
        await sleep();
        await iniCheck();
    }

    it('test add and delete AppointmentRequest',async function(){
        
        await runAppointmentRequestTest();
        
    })


});

describe('Appointments related test',async function(){
    var did=4;
    var pid=1;
    async function iniCheck(){
        chai.request(url).post('/appointments').send({PID:pid}).end((err,res)=>{
            assert.equal(res['body'][0],undefined);
             
        });
    }    
    async function addAAppointment(){
        chai.request(url).post('/appointment').send({
            PID:pid,
            DID: did,
            LevelOfEmergency: 1,
            Priority:1,
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')})
            .end((err, results) =>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).post('/appointments').send({PID:pid}).end((err,res)=>{
            assert.equal(res['body'][0]['DID'],did);
            
            
        });
    }
    async function deleteTheAppointment(){
        chai.request(url).post('/deleteappointment').send({PID:pid})
        .end((err,res)=>{

        });
    }
    async function runAppointmentTest(){
        await iniCheck();
        await addAAppointment();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await deleteTheAppointment();
        await sleep();
        await iniCheck();
    }

    it('test add and delete Appointment',async function(){
        
        await runAppointmentTest();
        
    })


});