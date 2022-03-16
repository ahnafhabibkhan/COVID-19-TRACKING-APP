//import necessary librarys
var chai = require('chai')
  , chaiHttp = require('chai-http');
var assert = chai.assert;
var step= require('mocha-steps');

chai.use(chaiHttp);

//local database address, need to change if move to other address
var url='http://localhost:5000'


//similiar sleep with unit testing
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

describe('Account request related test',async function(){
    it('test get all accountrequest',async function(){
        chai.request(url).get('/accountrequests').end((err,res)=>{
            
            assert.equal(res['body']['LastName'],'Jean');
             
        });
    });
    
    var email='testAPIOnly@gmail.com'
    
    async function iniCheck(){
        chai.request(url).get('/accountrequest/'+email).end((err,res)=>{
            assert.equal(res['body'][0],undefined);
             
        });
    }    
    async function addAAccountrequest(){
        chai.request(url).post('/accountrequest').send({
            Email: "testAPIOnly@gmail.com",
            FirstName: "testFirst",
            LastName: "testLast",
            Telephone: "4504664545", 
            Address: "123 Main", 
            Role: "Patient", 
            Password: "TestPass", 
            City:'testCity', 
            Country: "Canada",
            Time: new Date("2022-02-07T06:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
            Date: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' ')})
            .end((err, results) =>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/accountrequest/'+email).end((err,res)=>{
            assert.equal(res['body']['FirstName'],'testFirst');
             
        });
    }   
    async function deleteTheAccountrequest(){
        chai.request(url).delete('/acountrequest/'+email)
        .end((err,res)=>{

        });
    }
    async function runAccountrequestTest(){
        await iniCheck();
        await addAAccountrequest();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await deleteTheAccountrequest();
        await sleep();
        await iniCheck();
    }

    it('test add and delete Accountrequest',async function(){
        
        await runAccountrequestTest();
        
    })


});


describe('password reset request related test',async function(){
    it('test get passwordresetrequest',async function(){
        chai.request(url).get('/passwordresetrequest/5').end((err,res)=>{
            
            assert.equal(res['body']['Key'],'C3THLR');
             
        });
    });
    
    var id=20;
    
    async function iniCheck(){
        chai.request(url).get('/passwordresetrequest/'+id).end((err,res)=>{
            assert.equal(res['body'],'');
             
        });
    }    
    async function addAPasswordresetrequest(){
        chai.request(url).post('/passwordresetrequest').send({
            UserID: 20,
            Key: "TEST11"})
            .end((err, results) =>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/passwordresetrequest/'+id).end((err,res)=>{
            
            assert.equal(res['body']['Key'],"TEST11");
             
        });
    } 
    
    async function modeifyThePasswordresetrequest(){
        chai.request(url).put('/passwordresetrequest/'+id).send({Key:'TEST20'}).end((err,res)=>{

        });
    }

    async function checkAfterModifying(){
        chai.request(url).get('/passwordresetrequest/'+id).end((err,res)=>{
            
            assert.equal(res['body']['Key'],"TEST20");
             
        });
    } 

    async function deleteThePasswordresetrequest(){
        chai.request(url).delete('/passwordresetrequest/'+id)
        .end((err,res)=>{

        });
    }
    async function runPasswordresetrequestTest(){
        await iniCheck();
        await addAPasswordresetrequest();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await modeifyThePasswordresetrequest();
        await sleep();
        await checkAfterModifying();
        await sleep();
        await deleteThePasswordresetrequest();
        await sleep();
        await iniCheck();
    }

    it('test add and delete Passwordresetrequest',async function(){
        
        await runPasswordresetrequestTest();
        
    })


});


describe('healthstatus related test',async function(){
    it('test get healthstatus',async function(){
        chai.request(url).get('/healthstatus/5').end((err,res)=>{
            
            assert.equal(res['body']['Weight'],80);
             
        });
        chai.request(url).get('/healthstatuses/1').end((err,res)=>{
            
            assert.equal(res['body'][0]['Weight'],85);
             
        });
    });
    
    var id=20;
    
    async function iniCheck(){
        chai.request(url).get('/healthstatus/'+id).end((err,res)=>{
            assert.equal(res['body'],'');
             
        });
    }    
    async function addAHealthstatus(){
        chai.request(url).post('/healthstatus').send({
            PID: id,
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
            Covid:"0"})
            .end((err, results) =>{
                
            });
    }
    async function checkAfterAdding(){
        chai.request(url).get('/healthstatus/'+id).end((err,res)=>{
            
            assert.equal(res['body']['Weight'],84);
             
        });
    } 
    
    async function modeifyTheHealthstatus(){
        chai.request(url).put('/healthstatus/'+id+'/'
            +"2022-02-06").send({Weight:86}).end((err,res)=>{

        });
    }

    async function checkAfterModifying(){
        chai.request(url).get('/healthstatus/'+id).end((err,res)=>{
            
            assert.equal(res['body']['Weight'],86);
             
        });
    } 

    async function deleteTheHealthstatus(){
        chai.request(url).delete('/healthstatus/'+id+'/'
            +"2022-02-06").end((err,res)=>{

        });
    }
    async function addAnotherHealthstatus(){
        chai.request(url).post('/healthstatus').send({
            PID: id,
            fillOutDate: new Date("2022-02-07T05:00:00.000Z").toJSON().slice(0, 19).replace('T', ' '),
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
            Covid:"0"})
            .end((err, results) =>{
                
            });
    }
    async function deleteAllHealthstatuses(){
        chai.request(url).delete('/healthstatus/'+id)
        .end((err,res)=>{

        });
    }
    async function runHealthstatusTest(){
        await iniCheck();
        await addAHealthstatus();
        await sleep();
        await checkAfterAdding();
        await sleep();
        await modeifyTheHealthstatus();
        await sleep();
        await checkAfterModifying();
        await sleep();
        await deleteTheHealthstatus();
        await sleep();
        await iniCheck();
        
    }
    async function runMoreHealthstatusTest(){
        await iniCheck();
        await sleep();
        await addAHealthstatus();
        await sleep();
        await checkAfterAdding();
        await addAnotherHealthstatus();
        await sleep();
        await deleteAllHealthstatuses();
        await sleep();
        await iniCheck();
    }

    it('test add and delete Healthstatus',async function(){
        
        await runHealthstatusTest();
        
    })

    it('test add and delete more than one healthstatus',async function(){
        await runMoreHealthstatusTest();
    })


});

