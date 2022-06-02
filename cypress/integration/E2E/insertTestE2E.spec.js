/**
 * This test have how objective verify if it can insert new element to the API
 */

/**
 * ARR: Arrange: Organized here are the items I need to run the tests
 */
const baseURL = "http://localhost:3000";

// Represent the user that want to login
const user = {
  userName: "globant@gmail.com",
  password: "globant",
};

// Represent the user failed that want to login
const userFailed  = {   userName: "sifgp@gmail.com"
, password: "sifgp"
};

//ASS: Assert
describe("Verify if it can insert new element and show in the dashboard", () => {
  beforeEach(() => {
    cy.visit(`${baseURL}/SignIn`);
  });

  it("Has the correct title", () => {
    cy.title().should("equal", "SIGCFP");
  });

  it("Check when wrong username and password  " , () => {
    cy.get("#userName").type(userFailed.userName);
    cy.get("#userPassword").type(userFailed.password);
    cy.get("#btnLogin").click();
    cy.get("#alertCorrectUpdateOrDelete").should("contain", "Error en el inicio de sesión");
    cy.get("#alertCorrectUpdateOrDelete").should("contain", "El correo electrónico o contraseña no son correctos");
    cy.wait(500);

});

  it("Login system", () => {
    // Input name
    cy.get("#userName").type(user.userName);
    cy.get("#userPassword").type(user.password);
    // Click button
    cy.get("#btnLogin").click();
    cy.wait(800).get("#menu-drawer-company-button-open").click();
    cy.get("#intReqMenuCompanyButton").click();
    cy.wait(500).get("#menu-drawer-company-button-close").click();
    cy.wait(500).get("#btn-create-intern-request").click();

    // Input name
    cy.get("#inteRequName-input").type("Juan");
    cy.get("#careers-input").type("Diseño de Medios Interactivos").then((v) => { 
      console.log(v)
    }); 


  });


});
