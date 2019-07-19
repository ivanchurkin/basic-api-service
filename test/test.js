const assert = require('assert');
const mongoose = require('../db');
const Project = require('../models/projects.js');
const ObjectID = require('mongodb').ObjectID;

function onMongooseConnectionOpened() {}

function onMongooseConnectionError(error) {
  console.warn(`Error: ${ error }`);
}

mongoose.connection
  .once('open', onMongooseConnectionOpened)
  .on('error', onMongooseConnectionError);

before(async function() {
  await Project.deleteMany();
});

after(function (done) {
  done();
})

describe('Project', () => {
  let id;

  it('create', async function() {
    const project = new Project({name: 'Test #0', character: 'Test #0'});
    await project.save();
    id = project._id;
    assert(!project.isNew);
  });

  it('read', async function() {
    const count = await Project.countDocuments();
    assert(count, 1);
  });

  it('update', function(done) {
    Project.findOne({_id: id}, function(err, project) {
      if (err) done(err);
      project.name = 'Test #1';
      project.save(done);
    });
  });

  it('delete', function(done) {
    Project.findOneAndRemove({_id: id}, done);
  });
});