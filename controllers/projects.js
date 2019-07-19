const Project = require('../models/projects');

async function create(ctx) {
  ctx.render('projects/create');
};

async function read(ctx) {
  const projects = await Project.find({});
  ctx.render('projects/index', {projects});
};

async function apiRead(ctx) {
  const projects = await Project.find({});
  ctx.body = projects;
};

async function update(ctx) {
  const project = await Project.findById(ctx.params.id);
  ctx.render('projects/edit', {isEditPage: true, project});
};

async function remove(ctx) {
  await Project.findOneAndRemove({_id: ctx.params.id});
  ctx.redirect('/projects');
};

async function store(ctx) {
  const {body} = ctx.request;

  if (body.hasOwnProperty('_id')) {
    const id = body._id;
    delete body._id;
    await Project.findOneAndUpdate({_id: id}, body);
  } else {
    await new Project(body).save();
  }

  ctx.redirect('/projects');
};

module.exports = {
  create,
  read,
  update,
  remove,
  store,
  apiRead
};
