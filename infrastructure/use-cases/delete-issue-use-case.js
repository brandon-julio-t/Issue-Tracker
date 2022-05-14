const IssueRepository = require("../repositories/issue-repository");
const ProjectRepository = require("../repositories/project-repository");
const DeleteIssueValidation = require("../validations/delete-issue-validation");

class DeleteIssueUseCase {
  constructor(projectName, issueId) {
    this.validation = new DeleteIssueValidation();

    this.projectName = projectName;
    this.projectRepository = new ProjectRepository();

    this.issueId = issueId;
    this.issueRepository = new IssueRepository();
  }

  execute() {
    const project = this.projectRepository.findOneByName(this.projectName);

    this.validation.validate(project, this.issueId);

    const issue = this.issueRepository.findOneById(this.issueId);
    const deleted = this.issueRepository.delete(issue);

    return { result: "successfully deleted", _id: deleted._id };
  }
}

module.exports = DeleteIssueUseCase;
