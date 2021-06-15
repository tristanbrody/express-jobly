const request = require('supertest');
jest.mock('../db');
const app = require('../app');

// const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, u4Token } = require('./_testCommon');

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

/* attempt to write these tests using a mock client so no actual interaction with DB is required */

describe('get routes', function () {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('get route with id should use correct SQL query', async function () {
		let db = require('../db');
		db.query.mockResolvedValueOnce({
			rows: [{ title: 'someTitle', salary: 1000, equity: 0, company_handle: 'something' }]
		});
		request(app).get('/jobs/1');
		expect(db.query).toHaveBeenCalledWith(`SELECT title, salary, equity, company_handle FROM jobs WHERE id = $1`, [
			1
		]);
	});
});
