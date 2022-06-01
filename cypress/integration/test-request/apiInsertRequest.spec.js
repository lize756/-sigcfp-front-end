/**
 * This test have how objective verify if it can insert new element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
const baseURLToLogin = "http://localhost:8484/api/auth/login";
const baseURL = "http://localhost:8484/api/internRequests";


Cypress.Commands.add("login", (user,password) => {
  cy.request({
    method: "POST",
    url: baseURLToLogin,
    body: {
      userName: user,
      userPassword: password,
    },
  }).then((response) => {
    localStorage.setItem("token", "Bearer "+response.body.token);
  });
});

console.log("Entre 2");

describe("My First Test", () => {
    beforeEach(() => {
        cy.login("globant@gmail.com", "globant");
    });
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
  console.log(localStorage.getItem("token"));
});
