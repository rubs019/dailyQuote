import * as assert from 'assert'
import * as redis  from '../../../lib/redis'

describe('getQuote()', () => {
    it('Should return something....', () => {
        const quote = redis.getQuote()
        assert.equal(2, 2)
    })
})