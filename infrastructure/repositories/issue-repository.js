const Database = require("../database/database");

class IssueRepository {
  constructor() {
    const db = new Database();
    this.table = db.getIssuesTable();
  }

  findOneById(id) {
    return this.table.find((issue) => issue._id === id);
  }

  findAllByProjectAndFilterFunction(project, filterFn) {
    return this.table
      .filter((issue) => issue.project_id === project._id)
      .filter(filterFn);
  }

  save(issue) {
    this.table.push(issue);
    return issue;
  }

  update(issue) {
    const idx = this.table.findIndex((x) => x._id === issue._id);
    if (idx === -1) return null;
    this.table[idx] = issue;
    return issue;
  }

  delete(issue) {
    const idx = this.table.findIndex((x) => x._id === issue._id);
    if (idx === -1) return null;
    this.table.splice(idx, 1);
    return issue;
  }
}

module.exports = IssueRepository;
