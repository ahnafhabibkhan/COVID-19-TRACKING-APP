// const assert = require('chai').assert;
//const sinon=require("sinon");
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById } from"../src/backend/models/userModel.js";

describe('Sample',function(){
    it('sample test',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["Email"], "admin@gmail.com");
        });
    });
});
// describe.close();
