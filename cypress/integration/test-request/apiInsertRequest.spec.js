/**
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

//Correspond the element that it want add
const internRequestsToInsert = {
  inteRequBondingType: "Contrato Indefinido",
  inteRequDetails: null,
  inteRequCompetencies: "Liderazgo,Responsabilidad,Compromiso,Respecto",
  inteRequCreate: "10/12/2020",
  inteRequDepartment: "Operaciones",
  inteRequDuration: "12 MESES",
  inteRequFunctions:
    "Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material.",
  inteRequIsinprocess: "0",
  inteRequName: "Coordinador de operaciones",
  inteRequNumber: 2,
  inteRequOtherBenefits: " Otros servicios",
  inteRequSalary: 20000000,
  inteRequStDate: "10/12/2000",
  careers: [],
  company: null,
};

/**
 * ACT: Act :
 * Here the methods or functions that you want to test are called,
 * in other words the behaviors of the application are called
 */

// syntax: cy.request(method, url, body)
const addInternRequest = (intReqToInsert) => {
  cy.request({
    method: "POST",
    url: baseURL + "/add",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: intReqToInsert,
  }).then((response) => {
    expect(response.status).to.eq(201);
    currentIntReqId = response.body.inteRequId;
    expect(response.body).to.have.property("inteRequId");
    expect(response.body).to.have.property("inteRequBondingType");
    expect(response.body).to.have.property("inteRequDetails");
  });
};

//ASS: Assert

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

describe("Verify if it can insert new element to the API", () => {
  beforeEach(() => {
    cy.login(user.userName, user.password);
  });
  it("Allows verify if the reponds was 201 Ok", () => {
    addInternRequest(internRequestsToInsert);
    console.log(localStorage.getItem("token"));
    cy.request({
      method: "GET",
      url: baseURL,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("inteRequId");
      expect(response.body[0]).to.have.property("inteRequDetails");
      expect(response.body[0]).to.have.property("inteRequCompetencies");
      expect(response.body[0]).to.have.property("inteRequCreate");
      expect(response.body[0]).to.have.property("inteRequDepartment");
      expect(response.body[0]).to.have.property("inteRequDuration");
      expect(response.body[0]).to.have.property("inteRequFunctions");
      expect(response.body[0]).to.have.property("inteRequIsinprocess");
      expect(response.body[0]).to.have.property("inteRequName");
      expect(response.body[0]).to.have.property("inteRequNumber");
      expect(response.body[0]).to.have.property("inteRequOtherBenefits");
      expect(response.body[0]).to.have.property("inteRequSalary");
      expect(response.body[0]).to.have.property("inteRequStDate");
      expect(response.body[0]).to.have.property("careers");
      expect(response.body[0]).to.have.property("company");
    });
  });

  it("Check if the elements inside of the json file exist", () => {
    cy.request({
      //request to the API
      method: "GET",
      url: baseURL,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const currentInternRequest = response.body.find(
        (element) => element.inteRequId === currentIntReqId
      );
      //Check if element exist in the json file
      expect(currentInternRequest.inteRequCompetencies).to.deep.equal(internRequestsToInsert.inteRequCompetencies);
      expect(currentInternRequest.inteRequCreate).to.deep.equal(internRequestsToInsert.inteRequCreate);
      expect(currentInternRequest.inteRequDepartment).to.deep.equal(internRequestsToInsert.inteRequDepartment);
      expect(currentInternRequest.inteRequDuration).to.deep.equal(internRequestsToInsert.inteRequDuration);
      expect(currentInternRequest.inteRequFunctions).to.deep.equal(internRequestsToInsert.inteRequFunctions);
      expect(currentInternRequest.inteRequIsinprocess).to.deep.equal(internRequestsToInsert.inteRequIsinprocess);
      expect(currentInternRequest.inteRequName).to.deep.equal(internRequestsToInsert.inteRequName);
      expect(currentInternRequest.inteRequNumber).to.deep.equal(internRequestsToInsert.inteRequNumber);
      expect(currentInternRequest.inteRequOtherBenefits).to.deep.equal(internRequestsToInsert.inteRequOtherBenefits);
      expect(currentInternRequest.inteRequSalary).to.deep.equal(internRequestsToInsert.inteRequSalary);
      expect(currentInternRequest.inteRequStDate).to.deep.equal(internRequestsToInsert.inteRequStDate);
      expect(currentInternRequest.careers).to.deep.equal(internRequestsToInsert.careers);
      expect(currentInternRequest.company).to.deep.equal(internRequestsToInsert.company);
      expect(response.body).to.be.an("array");
      expect(response.body).to.be.not.empty;
    });
  });
});
