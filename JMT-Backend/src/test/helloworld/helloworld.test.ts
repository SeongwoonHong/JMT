import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import index from '../../';

chai.use(chaiHttp);
const expect = chai.expect;
const endpoint = '/api/helloworld';
const msg = 'Hello World';

describe('test helloworld endpoint', () => {
  it ('should be json', () => {
    return chai.request(index).get(endpoint)
      .then(res => {
        expect(res.type).to.eql('application/json');
      });
  })

  it (`should have a msg ${msg}`, () => {
    return chai.request(index).get(endpoint)
      .then(res => {
        expect(res.body.msg).to.eql(msg);
      });
  });
});
