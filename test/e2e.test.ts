import * as assert from "assert";
import AppServer from "../src/server";
const request = require('supertest');

describe('E2E', () => {
    const TestServer = new AppServer();
    describe('/healthcheck', () => {
        before(() => {
            TestServer.startServer({env: 'test'});
        })
        
        after(() => {
            TestServer.stopServer();
        });
        it('server should be up', async () => {
            const response = await request(TestServer.getServer()).get('/healthcheck')
            assert.equal(response.status, 200);
            assert.equal(response.body.status, 'OK');
        });
    });
});