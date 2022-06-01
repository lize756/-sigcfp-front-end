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

let intReqToUpdate = "";

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

const getInternRequests = () => {
  let position = 0;
  cy.request({
    //request to the API
    method: "GET",
    url: baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((response) => {
    position = Math.floor(Math.random() * response.body.length);
    intReqToUpdate = response.body[position];
    console.log("inteRequBondingType",intReqToUpdate);
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

describe("Allows verify if the reponds was 200 Ok and the element is update", () => {
  beforeEach(() => {
    cy.login(user.userName, user.password);
  });
  it("Verify if it can put a element to the API", () => {
    getInternRequests();
    cy.request({
      method: "PUT",
      url: `${baseURL + "/" + "update"}`+"/"+2,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: internRequestsToInsert,
    }).then((response) => {
      expect(response.status).to.eq(200);
      assert.isObject(response.body, "This element is object");
      expect(response.body.inteRequBondingType).to.eq(internRequestsToInsert.inteRequBondingType);
      expect(response.body.inteRequDetails).to.eq(internRequestsToInsert.inteRequDetails);
      expect(response.body.inteRequCompetencies).to.eq(internRequestsToInsert.inteRequCompetencies);
      expect(response.body.inteRequCreate).to.eq(internRequestsToInsert.inteRequCreate);
      expect(response.body.inteRequDepartment).to.eq(internRequestsToInsert.inteRequDepartment);
      expect(response.body.inteRequDuration).to.eq(internRequestsToInsert.inteRequDuration);
      expect(response.body.inteRequFunctions).to.eq(internRequestsToInsert.inteRequFunctions);
      expect(response.body.inteRequIsinprocess).to.eq(internRequestsToInsert.inteRequIsinprocess);
      expect(response.body.inteRequName).to.eq(internRequestsToInsert.inteRequName);
      expect(response.body.inteRequNumber).to.eq(internRequestsToInsert.inteRequNumber);
      expect(response.body.inteRequOtherBenefits).to.eq(internRequestsToInsert.inteRequOtherBenefits);
      expect(response.body.inteRequSalary).to.eq(internRequestsToInsert.inteRequSalary);
      expect(response.body.inteRequStDate).to.eq(internRequestsToInsert.inteRequStDate);
      expect(response.body.careers).to.deep.equal(internRequestsToInsert.careers);
      expect(response.body.company).to.eq(internRequestsToInsert.company);

    });
  });

  it("Check if the elements inside of the json file exist", () => {});
});
