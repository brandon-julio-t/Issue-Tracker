"use strict";

const CreateIssueUseCase = require("../infrastructure/use-cases/create-issue-use-case");
const GetIssuesUseCase = require("../infrastructure/use-cases/get-issues-use-case");
const UpdateIssueUseCase = require("../infrastructure/use-cases/update-issue-use-case");

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
      try {
        let project = req.params.project;
        const issueData = req.body;
        const response = new UpdateIssueUseCase(project, issueData).execute();
        res.json(response);
      } catch(error) {
        const response = { error: error.message };
        if (req.body._id) response._id = req.body._id;
        res.json(response);
      }
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
