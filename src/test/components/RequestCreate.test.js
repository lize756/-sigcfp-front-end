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

import RequestCreate from "../../components/module-request/company/request/RequestCreate";
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
          <RequestCreate />
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
          <RequestCreate />
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

  const inputSalary = component.getAllByText("Valor de Bonificación");
  expect(inputSalary).toBeTruthy();

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

  const button = component.getAllByText("Crear Solicitud");
  expect(button).toBeTruthy();
});
