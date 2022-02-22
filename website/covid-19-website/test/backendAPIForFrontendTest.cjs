var chai = require('chai')
  , chaiHttp = require('chai-http');
var assert = chai.assert;



var url='http://localhost:5000'

chai.use(chaiHttp);
function sleep(ms) {
    if(ms==undefined)
        ms=50;
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
};

describe('User related API intergration test',function(){
    it('test get user by email API',function(){
        chai.request(url).get('/users/admin@gmail.com').end((err,res)=>{
            assert.equal(res['body']['FirstName'],"Admin")
        });
        
    });
    it('test get all users',function(){
        chai.request(url).get('/users').end((err,res)=>{
            assert.equal(res['body'][1]['FirstName'],'Admin')
        });
    });
    it('test get lastest covid user',function(){
        chai.request(url).get('/usersByCovid').end((err,res)=>{
            assert.equal(res['body'][0]['FirstName'],'John')
        });
    });
    it('test get user by data',function(){
        chai.request(url).put('/users').send({FirstName:'John'}).then((err,res)=>{
            assert.equal(res['body'][0]['FirstName'],'Smith')
        });
    });

    // it('test add and delete user',function(){
    //     async functon addAUser

    // })
    
});