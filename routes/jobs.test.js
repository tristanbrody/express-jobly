const request = require('supertest');
const db = require('../db');
const app = require('../app');
require('dotenv').config();
require('pg');
const express = require('express');

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, u4Token } = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/* attempt to write these tests using a mock client so no actual interaction with DB is required */
jest.mock('pg', () => {
	const { getDatabaseUri } = require('../config.js');
	const testURI = getDatabaseUri();
	const mClient = {
		connectionString: testURI
	};
	return { Client: jest.fn(() => mClient) };
});

jest.mock('express', () => ({
	Router: () => jest.fn()
}));

describe('get routes', function () {
	beforeEach(() => {
		let db = new Client();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('get route with id should use correct SQL query', async function () {
		router
			.get(1)
			.mockResolvedValueOnce({ title: 'someTitle', salary: 1000, equity: 0, company_handle: 'something' });
		expect(client.query).toHaveBeenCalledWith(
			`SELECT title, salary, equity, company_handle FROM jobs WHERE id = $1`,
			[1]
		);
	});
});
