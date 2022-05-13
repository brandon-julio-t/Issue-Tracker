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
    test('View issues on a project: GET request to /api/issues/{project}', () => {
      
    });
  });
});
