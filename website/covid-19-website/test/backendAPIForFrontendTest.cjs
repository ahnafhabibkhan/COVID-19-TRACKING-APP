var chai = require('chai')
  , chaiHttp = require('chai-http');
var assert = chai.assert;

var url='http://localhost:5000'

chai.use(chaiHttp);

describe('User related API test',function(){
    it('test get user by email API',function(){
        chai.request(url).get('/users/admin@gmail.com').end((err,res)=>{
            //chai.assert.equal(res['Email'],true);
            assert.equal(res['body']['FirstName'],"Admin")
        });
        
    });
    
    
    
});