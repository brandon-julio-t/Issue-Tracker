const IssueRepository = require("../repositories/issue-repository");
const ProjectRepository = require("../repositories/project-repository");
const UpdateIssueValidation = require("../validations/update-issue-validation");

class UpdateIssueUseCase {
  constructor(projectName, issueData) {
    this.validation = new UpdateIssueValidation();

    this.projectName = projectName;
    this.projectRepository = new ProjectRepository();

    this.issueData = issueData;
    this.issueRepository = new IssueRepository();
  }

  execute() {
    const project = this.projectRepository.findOneByName(this.projectName);

    this.validation.validate(project, this.issueData);

    const issue = this.issueRepository.findOneById(this.issueData._id);
    Object.assign(issue, this.issueData);
    issue.updated_on = new Date();

    this.issueRepository.update(issue);
    return { result: "successfully updated", _id: issue._id };
  }
}

module.exports = UpdateIssueUseCase;
