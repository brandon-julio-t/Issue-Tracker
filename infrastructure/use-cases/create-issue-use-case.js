const IssueFactory = require("../factories/issue-factory");
const ProjectFactory = require("../factories/project-factory");
const IssueRepository = require("../repositories/issue-repository");
const ProjectRepository = require("../repositories/project-repository");
const CreateIssueValidation = require("../validations/create-issue-validation");

class CreateIssueUseCase {
  constructor(projectName, issueData) {
    this.validation = new CreateIssueValidation();

    this.projectName = projectName;
    this.projectFactory = new ProjectFactory();
    this.projectRepository = new ProjectRepository();

    this.issueData = issueData;
    this.issueFactory = new IssueFactory();
    this.issueRepository = new IssueRepository();
  }

  execute() {
    this.validation.validate(this.issueData);

    let project = this.projectRepository.findOneByName(this.projectName);

    if (!project) {
      const newProject = this.projectFactory.create({
        name: this.projectName,
      });
      project = this.projectRepository.save(newProject);
    }

    const issue = this.issueFactory.create({
      ...this.issueData,
      project_id: project._id,
    });
    return this.issueRepository.save(issue);
  }
}

module.exports = CreateIssueUseCase;
