const Database = require("../database/database");

class ProjectRepository {
  constructor() {
    const db = new Database();
    this.table = db.getProjectsTable();
  }

  findOneByName(projectName) {
    return this.table.find(x => x.name === projectName);
  }

  save(project) {
    this.table.push(project);
    return project;
  }
}

module.exports = ProjectRepository;
