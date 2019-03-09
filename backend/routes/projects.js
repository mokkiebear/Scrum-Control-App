const router = require('express').Router();
const mongoose = require('mongoose');
const { Project, validate } = require('../models/project');
const { Iteration } = require('../models/iteration');
/*router.use(function(req, res, next){
    console.log('My easy log: ', req.url);
    next();
});*/
router.get('/', async function (req, res) {
	const projects = await Project.find().sort('title');
	res.json(projects);
});

router.post('/', async function (req, res) {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let project = new Project({
		title: req.body.title,
		description: req.body.description,
		iterations: [] 
	});
	project = await project.save();
	res.json('Добавлено!');
});

router.get('/:id', async function (req, res) {
	try{
		const project = await Project.findOne({ _id: req.params.id });
		res.json(project);
	}
	catch(err){
		return res.status(404).send('The project with the given ID was not found');
	}
});

//Изменение проекта
router.put('/:id', async function (req, res) {
	//Validate - If invalid, return 400 - Bad Request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	try{
		//Look up the project - If not existing, return 404
		const project = await Project.findOneAndUpdate( { _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } }, { new: true });
		//Update the project - Return the updated project
		res.json(project);
	}
	catch(err){
		return res.status(404).send('The project with the given ID was not found');	
	}
});

router.delete('/:id', async function (req, res) {
	try{
		const project = await Project.findOneAndDelete({ _id: req.params.id });
		//Удаление итераций объекта
		await Iteration.deleteMany({ _id: { $in: project.iterations} });
		//await Iteration.deleteMany({ _parent: req.params.id });
		res.send(project);
	}
	catch(err){
		return res.status(404).send('The project with the given ID was not found');
	}
});

//Получение итераций в рамках проекта
router.get('/:prId/iterations/', async function(req, res){
	try{
		const project = await Project.findOne({ _id: req.params.prId });
		let iterations = await Iteration.find({ _id: { $in:  project.iterations } });
		res.json(iterations);
	}
	catch(err){
		return res.status(404).send('The project with the given ID was not found' + err.message);
	}
	
});

module.exports = router;