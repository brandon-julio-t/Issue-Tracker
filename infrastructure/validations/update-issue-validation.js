const IssueRepository = require("../repositories/issue-repository");

class UpdateIssueValidation {
  constructor() {
    this.issueRepository = new IssueRepository();
  }

  validate(project, issueData) {
    const { _id, ...data } = issueData;

    if (!_id) {
      throw new Error("missing _id");
    }

    if (Object.keys(data).length === 0) {
      throw new Error("no update field(s) sent");
    }

    const issue = this.issueRepository.findOneById(_id);
    if (!issue || issue.project_id !== project._id) {
      throw new Error("could not update");
    }
  }
}

module.exports = UpdateIssueValidation;
