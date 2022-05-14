const IssueRepository = require("../repositories/issue-repository");

class DeleteIssueValidation {
  constructor() {
    this.issueRepository = new IssueRepository();
  }

  validate(project, issueId) {
    if (!issueId) {
      throw new Error('missing _id');
    }

    const issue = this.issueRepository.findOneById(issueId);
    if (!issue || issue.project_id !== project._id) {
      throw new Error('could not delete');
    }
  }
}

module.exports = DeleteIssueValidation;
