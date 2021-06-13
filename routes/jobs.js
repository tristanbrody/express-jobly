const jsonschema = require('jsonschema');
const express = require('express');
const { ensureLoggedIn, adminOnly } = require('../middleware/auth');
const Job = require('../models/job');

const jobNewSchema = require('../schemas/jobNew.json');
const jobUpdateSchema = require('../schemas/jobUpdate.json');

const router = new express.router();

//get all jobs in database (optionally can pass in filters in query string)
router.get('/q/search', async function (req, res, next) {
	try {
		const jobs = await Job.findAll(req.params);
		return res.json({ jobs });
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', async function (req, res, next) {
	try {
		const job = await Job.get(id);
		return res.json({ job });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
