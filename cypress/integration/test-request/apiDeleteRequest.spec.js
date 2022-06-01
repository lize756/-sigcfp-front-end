/**
 * This test have how objective verify if it can insert new element to the API
 */
/*
 **
 * This test have how objective verify if it can insert new element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
const baseURLToLogin = "http://localhost:8484/api/auth/login";
const baseURL = "http://localhost:8484/api/internRequests";

const token = "";

let currentIntReqId = "";

const user = {
  userName: "globant@gmail.com",
  password: "globant",
};

Cypress.Commands.add("login", (user, password) => {
  cy.request({
    method: "POST",
    url: baseURLToLogin,
    body: {
      userName: user,
      userPassword: password,
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
});


describe("Check if login in the system", () => {
  beforeEach(() => {
    cy.login(user.userName, user.password);
  });

  it("should exist token in localStorage", () => {
    expect(localStorage.getItem("token")).to.exist;
    expect(localStorage.getItem("token")).to.not.be.empty;
    expect(localStorage.getItem("token")).to.not.be.null;
    expect(localStorage.getItem("token")).to.not.be.undefined;
    expect(localStorage.getItem("token")).to.not.be.NaN;
  });

  it("should still exist token in localStorage", () => {
    expect(localStorage.getItem("token")).to.exist;
    expect(localStorage.getItem("token")).to.not.be.empty;
    expect(localStorage.getItem("token")).to.not.be.null;
    expect(localStorage.getItem("token")).to.not.be.undefined;
    expect(localStorage.getItem("token")).to.not.be.NaN;
  });
});



/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called,
 * in other words the behaviors of the application are called
 */

 const getInternRequests = () => {
  let position = 0;
  cy.request({
    //request to the API
    method: "GET",
    url: baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((response) => {
    position = response.body[response.body.length - 1];
    localStorage.setItem("endElement", position);
    expect(response.status).to.deep.equal(200);
  });
};

//ASS: Assert

describe("Verify if it can remove a element to the API", () => {
  beforeEach(() => {
    cy.login(user.userName, user.password);

  });
  it("Allows verify if the reponds was 200 Ok and the element is remove", () => {
    getInternRequests();
    console.log("currentIntReqId",localStorage.getItem("endElement"));
    cy.request({
      method: "DELETE",
      url: `${baseURL}/+586`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it("Allows verify what happens when you tried to delete a non-existing object", () => {
    cy.request({
      method: "DELETE",
      url: `${baseURL}/120000`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});


