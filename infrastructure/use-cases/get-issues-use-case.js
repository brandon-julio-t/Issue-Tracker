const IssueRepository = require("../repositories/issue-repository");
const ProjectRepository = require("../repositories/project-repository");

class GetIssuesUseCase {
  constructor(projectName, filters) {
    this.projectName = projectName;
    this.filters = filters;
    this.issueRepository = new IssueRepository();
    this.projectRepository = new ProjectRepository();
  }

  execute() {
    const project = this.projectRepository.findOneByName(this.projectName);

    const issues = project
      ? this.issueRepository.findAllByFilterFunction(project, (issue) => {
          const filterEntries = Object.entries(this.filters);

          if (filterEntries.length === 0) {
            return true;
          }

          return filterEntries.every(([key, value]) => issue[key] === value);
        })
      : [];

    return issues;
  }
}

module.exports = GetIssuesUseCase;
