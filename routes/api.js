"use strict";

const CreateIssueUseCase = require("../infrastructure/use-cases/create-issue-use-case");
const GetIssuesUseCase = require("../infrastructure/use-cases/get-issues-use-case");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      const filters = req.query;
      const response = new GetIssuesUseCase(project, filters).execute();
      return res.json(response);
    })

    .post(function (req, res) {
      try {
        let project = req.params.project;
        const issueData = req.body;
        const response = new CreateIssueUseCase(project, issueData).execute();
        res.json(response);
      } catch (error) {
        res.json({ error: error.message });
      }
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
