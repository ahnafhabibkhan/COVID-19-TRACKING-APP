//const assert = require('chai').assert;
//const sinon=require("sinon");
import assert from 'chai';
import sinon from 'sinon';
import { getUserByEmail, insertUser, deleteUserById } from"../src/backend/models/userModel.js";

describe('Sample',function(){
    it('sample test',function(){
        var result;
        getUserByEmail("admin@gmail.com",result);
        assert.equal(1,1);
    });
});