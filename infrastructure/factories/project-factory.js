const { uniqueID } = require("mocha/lib/utils");
const Project = require("../entities/project");

class ProjectFactory {
  create(data) {
    const entity = new Project();
    Object.assign(entity, data);
    entity._id = entity._id || uniqueID();
    return entity;
  }
}

module.exports = ProjectFactory;
