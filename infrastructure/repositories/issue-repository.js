const Database = require("../database/database");

class IssueRepository {
  constructor() {
    const db = new Database();
    this.table = db.getIssuesTable();
  }

  save(project, issue) {
    issue.project_id = project._id;
    this.table.push(issue);
    return issue;
  }
}

module.exports = IssueRepository;
