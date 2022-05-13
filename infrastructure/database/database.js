const { uniqueID } = require("mocha/lib/utils");
const Issue = require("../entities/issue");
const Project = require("../entities/project");

class Database {
  static _db = {
    projects: [],
    issues: [],
  };

  static {
    const project = new Project(uniqueID(), "apitest");
    this._db.projects.push(project);
    this._db.issues.push(
      new Issue(
        uniqueID(),
        "title 1",
        "text 1",
        new Date(),
        new Date(),
        "dummy user",
        project._id
      ),
      new Issue(
        uniqueID(),
        "title 2",
        "text 2",
        new Date(),
        new Date(),
        "dummy user",
        project._id
      ),
      new Issue(
        uniqueID(),
        "title 3",
        "text 3",
        new Date(),
        new Date(),
        "dummy user",
        project._id
      )
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
