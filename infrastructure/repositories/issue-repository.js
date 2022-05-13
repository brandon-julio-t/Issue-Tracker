const Database = require("../database/database");

class IssueRepository {
  constructor() {
    const db = new Database();
    this.table = db.getIssuesTable();
  }

  findAllByFilterFunction(project, filterFn) {
    return this.table
      .filter((issue) => issue.project_id === project._id)
      .filter(filterFn);
  }

  save(project, issue) {
    issue.project_id = project._id;
    this.table.push(issue);
    return issue;
  }
}

module.exports = IssueRepository;
