import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import {
  setUserName,
  setResponseUserLogin,
  setRolee,
  setUserCompanyId,
  setUserPersonId,
} from "../../components/store/slices/SignIn/LoginSlice";

import { setIntReq } from "../../components/store/slices/InternRequestSlice";

import RequestUpdate from "../../components/module-request/company/request/RequestUpdate";
import store from "../../components/store/indexStore";

test("render content", () => {
  const initialState = {
    userLogin: {
      userCompanyId: 335,
      user: {
        password: null,
        username: "globant@gmail.com",
        authorities: [
          {
            authority: "ROLEE_COMPANY",
          },
        ],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
      },
      userPersonId: -1,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlZXMiOiJbe1wiYXV0aG9yaXR5XCI6XCJST0xFRV9DT01QQU5ZXCJ9XSIsInVzZXJJZCI6MjM1LCJ1c2VyQ29tcGFueUlkIjozMzUsInVzZXJQZXJzb25JZCI6LTEsInN1YiI6Imdsb2JhbnRAZ21haWwuY29tIiwiaWF0IjoxNjU0MDQ4NTg3LCJleHAiOjE2NTQxMzQ5ODd9.MWE0ENS-AlzoSOULTmg6HrevrDW9mMF929EowWPDrtlWB98rjlN6a5Iivg-Q35jX-zjR62oqjK10rCsAOt031g",
    },
  };
  //const mockStore = configureStore();
  //const store = mockStore(initialState);
  const dispatch = jest.fn();

  dispatch(setResponseUserLogin(initialState.userLogin));
  //Update this rol in the initial state
  dispatch(setRolee(initialState.userLogin.user.authorities[0].authority));
  dispatch(setUserCompanyId(initialState.userLogin.userCompanyId));
  dispatch(setUserPersonId(initialState.userLogin.userPersonId));
  dispatch(setUserName(initialState.userLogin.user.username));

  const component = render(
    <Provider store={store}>
      <Router>
        <div>
          <RequestUpdate />
        </div>
      </Router>
    </Provider>
  );
  component.debug;
});

test("Checking the fields of the intern application form", () => {
  const initialState = {
    userLogin: {
      userCompanyId: 335,
      user: {
        password: null,
        username: "globant@gmail.com",
        authorities: [
          {
            authority: "ROLEE_COMPANY",
          },
        ],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true,
      },
      userPersonId: -1,
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlZXMiOiJbe1wiYXV0aG9yaXR5XCI6XCJST0xFRV9DT01QQU5ZXCJ9XSIsInVzZXJJZCI6MjM1LCJ1c2VyQ29tcGFueUlkIjozMzUsInVzZXJQZXJzb25JZCI6LTEsInN1YiI6Imdsb2JhbnRAZ21haWwuY29tIiwiaWF0IjoxNjU0MDQ4NTg3LCJleHAiOjE2NTQxMzQ5ODd9.MWE0ENS-AlzoSOULTmg6HrevrDW9mMF929EowWPDrtlWB98rjlN6a5Iivg-Q35jX-zjR62oqjK10rCsAOt031g",
    },
  };

  const request = {
    updateRequest: {
      inteRequId: 503,
      inteRequBondingType: "Contrato a Término Fijo",
      inteRequDetails: null,
      inteRequCompetencies: "1,23,121",
      inteRequCreate: "18/05/2022",
      inteRequDepartment: "contabilidad y finanzas",
      inteRequDuration: "12 MESES",
      inteRequFunctions: "2,1,23",
      inteRequIsinprocess: null,
      inteRequName: "Solicitud vacantes",
      inteRequNumber: 10,
      inteRequOtherBenefits: "Ninguno",
      inteRequStatus: "Nuevo",
      inteRequLocation: null,
      inteRequSalary: 1000000,
      inteRequStDate: "12/02/2000",
      careers: [
        {
          careId: 9,
          careDescription: null,
          careName: "Ingeniería de Sistemas",
          person: null,
          faculty: {
            facuId: 4,
            facuDescription:
              "La Facultad de Ingeniería está alineada con la iniciativa CDIO, que ayuda a los estudiantes a Concebir, Diseñar, Implementar y Operar proyectos de ingeniería y de diseño, con el objetivo de formar profesionales capaces de afrontar los retos actuales.\n\n",
            facuName: "INGENIERÍA Y DISEÑO",
          },
        },
        {
          careId: 10,
          careDescription: null,
          careName: "Ingeniería Telemática",
          person: null,
          faculty: {
            facuId: 4,
            facuDescription:
              "La Facultad de Ingeniería está alineada con la iniciativa CDIO, que ayuda a los estudiantes a Concebir, Diseñar, Implementar y Operar proyectos de ingeniería y de diseño, con el objetivo de formar profesionales capaces de afrontar los retos actuales.\n\n",
            facuName: "INGENIERÍA Y DISEÑO",
          },
        },
      ],
      company: {
        compId: 335,
        compAddress:
          "AVENIDA CALLE 26 92 32 EDIFICIO GOLD 7 CENTRO EMPRESARIAL CONNECTA",
        compEcoActiv: "Actividades de desarrollo de sistemas ",
        compEmail: "globant@gmail.com",
        compIcesiStud: null,
        compName: "Globant Colombia",
        compNit: "9014115336",
        compTelephone: "6014891340",
        compType: "SOCIEDAD POR ACCIONES SIMPLIFICADA",
        compUrlAddress: "https://www.google.com",
        compCountryName: "Colombia",
        compCityName: "Bogota",
        userr: null,
      },
      inteRequCountryName: "Colombia",
      inteRequCityName: "Cali",
    },
  };
  //const mockStore = configureStore();
  //const store = mockStore(initialState);
  const dispatch = jest.fn();

  dispatch(setResponseUserLogin(initialState.userLogin));
  //Update this rol in the initial state
  dispatch(setRolee(initialState.userLogin.user.authorities[0].authority));
  dispatch(setUserCompanyId(initialState.userLogin.userCompanyId));
  dispatch(setUserPersonId(initialState.userLogin.userPersonId));
  dispatch(setUserName(initialState.userLogin.user.username));
  dispatch(setIntReq(request.updateRequest));

  const component = render(
    <Provider store={store}>
      <Router>
        <div>
          <RequestUpdate />
        </div>
      </Router>
    </Provider>
  );
  const inputName = component.getAllByText("Nombre de la solicitud");
  expect(inputName).toBeTruthy();

  const inputCareer = component.getAllByText("Carreras de Interés");
  expect(inputCareer).toBeTruthy();

  const inputArea = component.getAllByText("Area o Departamento");
  expect(inputArea).toBeTruthy();

  const inputNumber = component.getAllByText("Número de Estudiantes");
  expect(inputNumber).toBeTruthy();

  const inputDate = component.getAllByText("Fecha de Inicio");
  expect(inputDate).toBeTruthy();

  const inputFunctions = component.getAllByText("Funciones Principales");
  expect(inputFunctions).toBeTruthy();

  const inputCompetences = component.getAllByText(
    "Competencias Claves del Éxito"
  );
  expect(inputCompetences).toBeTruthy();

  const inputDuration = component.getAllByText("Duración de la Practica");
  expect(inputDuration).toBeTruthy();

  const inputBonding = component.getAllByText("Tipo de vinculación");
  expect(inputBonding).toBeTruthy();

  const inputModality = component.getAllByText("Modalidad de práctica");
  expect(inputModality).toBeTruthy();

  const inputCountry = component.getAllByText("Seleccione su país");
  expect(inputCountry).toBeTruthy();

  const inputCity = component.getAllByText("Seleccione su ciudad");
  expect(inputCity).toBeTruthy();

  const inputBenefits = component.getAllByText("Otros Beneficios");
  expect(inputBenefits).toBeTruthy();

  const button = component.getAllByText("Editar Solicitud");
  expect(button).toBeTruthy();
});
