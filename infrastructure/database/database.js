const { uniqueID } = require("mocha/lib/utils");
const Project = require("../entities/project");

class Database {
  static _db = {
    projects: [],
    issues: [],
  };
  
  static {
    this._db.projects.push(
      new Project(uniqueID(), 'apitest')
    );
  }

  getProjectsTable() {
    return Database._db.projects;
  }

  getIssuesTable() {
    return Database._db.issues;
  }
}

module.exports = Database;
