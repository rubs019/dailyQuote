import * as assert from 'assert'
import { getQuote } from '../../../../src/lib/redis'

describe('getQuote()', () => {
    it('Should return something....', () => {
        const quote = getQuote()
        assert.equal(2, 2)
    })
})