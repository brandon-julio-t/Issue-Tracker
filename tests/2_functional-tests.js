const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  const projectName = "apitest";
  const url = `/api/issues/${projectName}`;

  suite("POST", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", () => {
      const issueData = {
        issue_title: "Fix error in posting data",
        issue_text: "When we post data it has an error.",
        created_on: "2017-01-08T06:35:14.240Z",
        updated_on: "2017-01-08T06:35:14.240Z",
        created_by: "Joe",
        assigned_to: "Joe",
        open: true,
        status_text: "In QA",
      };

      chai
        .request(server)
        .post(url)
        .send(issueData)
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedInclude(res.body, issueData);
        });
    });

    test("Create an issue with only required fields: POST request to /api/issues/{project}", () => {
      const issueData = {
        issue_title: "issue_title",
        issue_text: "issue_text",
        created_by: "created_by",
      };

      chai
        .request(server)
        .post(url)
        .send(issueData)
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedInclude(res.body, issueData);
          assert.property(res.body, "_id");
          assert.isNotEmpty(res.body._id);
          assert.property(res.body, "created_on");
          assert.isNumber(Date.parse(res.body.created_on));
          assert.property(res.body, "updated_on");
          assert.isNumber(Date.parse(res.body.updated_on));
          assert.property(res.body, "assigned_to");
          assert.isEmpty(res.body.assigned_to);
          assert.isString(res.body.assigned_to);
          assert.property(res.body, "open");
          assert.isBoolean(res.body.open);
          assert.property(res.body, "status_text");
          assert.isEmpty(res.body.status_text);
          assert.isString(res.body.status_text);
        });
    });

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", () => {
      const issueData = {};

      chai
        .request(server)
        .post(url)
        .send(issueData)
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedInclude(res.body, {
            error: "required field(s) missing",
          });
        });
    });
  });

  suite("GET", () => {
    test("View issues on a project: GET request to /api/issues/{project}", () => {
      chai
        .request(server)
        .get(url)
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isArray(res.body);
          assert.strictEqual(
            res.body.length,
            5,
            "There are three dummy data and two created data from previous tests."
          );
        });
    });

    test("View issues on a project with one filter: GET request to /api/issues/{project}", () => {
      chai
        .request(server)
        .get(url)
        .query({ issue_title: "title 1" })
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isArray(res.body);
          assert.strictEqual(res.body.length, 1);
          assert.strictEqual(res.body[0].issue_title, "title 1");
        });

      chai
        .request(server)
        .get(url)
        .query({ created_by: "dummy user" })
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isArray(res.body);
          assert.strictEqual(res.body.length, 3);
          res.body.forEach((issue) =>
            assert.strictEqual(issue.created_by, "dummy user")
          );
        });
    });

    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", () => {
      const filters = {
        issue_title: "title 1",
        issue_text: "text 1",
      };

      chai
        .request(server)
        .get(url)
        .query(filters)
        .end((err, res) => {
          assert.strictEqual(res.status, 200);
          assert.isArray(res.body);
          assert.strictEqual(res.body.length, 1);
          assert.deepNestedInclude(res.body[0], filters);
        });
    });
  });

  suite("PUT", () => {
    test("Update one field on an issue: PUT request to /api/issues/{project}", () => {
      //
    });

    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", () => {
      //
    });

    test("Update an issue with missing _id: PUT request to /api/issues/{project}", () => {
      //
    });

    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", () => {
      //
    });

    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", () => {
      //
    });
  });
});
