import { provider } from "../config/init-pact";
import { Matchers } from "@pact-foundation/pact";
import { InternRequestController } from "../../../controllers";

describe("Sigcfp", () => {
  beforeAll(async () => {
    await provider.setup();
  });

  afterAll(() => provider.finalize());

  describe("Get list of intern request", () => {
    it("When a request to list all intern request", async function () {
      await provider.addInteraction({
        uponReceiving: "Request to list all intern request",
        state: "has intern request",
        withRequest: {
          method: "GET",
          path: "/internRequest",
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike({
            inteRequId: Matchers.like(542),
            inteRequBondingType: Matchers.like("Contrato Indefinido"),
            inteRequDetails: Matchers.like(null),
            inteRequCompetencies: Matchers.like("Liderazgo,Responsabilidad,Compromiso,Respecto"),
            inteRequCreate: Matchers.like("10/12/2020"),
            inteRequDepartment: Matchers.like("Operaciones"),
            inteRequDuration: Matchers.like("12 MESES"),
            inteRequFunctions: Matchers.like("Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material."),
            inteRequIsinprocess: Matchers.like("0"),
            inteRequName: Matchers.like("Coordinador de operaciones"),
            inteRequNumber: Matchers.like(2),
            inteRequOtherBenefits: Matchers.like(" Otros servicios"),
            inteRequStatus: Matchers.like(null),
            inteRequLocation: Matchers.like(null),
            inteRequSalary: Matchers.like(20000000),
            inteRequStDate: Matchers.like("10/12/2000"),
            careers: Matchers.like([]),
            company: Matchers.like(null),
            inteRequCountryName: Matchers.like(null),
            inteRequCityName: Matchers.like(null),
          }),
        },
      });

      const response = await InternRequestController.list();

      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });
  }),
    describe("Create an Intern request", () => {
      it("When a request to create an Intern request", async function () {
        await provider.addInteraction({
          uponReceiving: "Request to add a new Intern request",
          state: "There are no Intern requests",
          withRequest: {
            method: "POST",
            path: "/internRequest",
          },
          willRespondWith: {
            status: 201, // create
            body: {
                inteRequId: Matchers.like(542),
                inteRequBondingType: Matchers.like("Contrato Indefinido"),
                inteRequDetails: Matchers.like(null),
                inteRequCompetencies: Matchers.like("Liderazgo,Responsabilidad,Compromiso,Respecto"),
                inteRequCreate: Matchers.like("10/12/2020"),
                inteRequDepartment: Matchers.like("Operaciones"),
                inteRequDuration: Matchers.like("12 MESES"),
                inteRequFunctions: Matchers.like("Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material."),
                inteRequIsinprocess: Matchers.like("0"),
                inteRequName: Matchers.like("Coordinador de operaciones"),
                inteRequNumber: Matchers.like(2),
                inteRequOtherBenefits: Matchers.like(" Otros servicios"),
                inteRequStatus: Matchers.like(null),
                inteRequLocation: Matchers.like(null),
                inteRequSalary: Matchers.like(20000000),
                inteRequStDate: Matchers.like("10/12/2000"),
                careers: Matchers.like([]),
                company: Matchers.like(null),
                inteRequCountryName: Matchers.like(null),
                inteRequCityName: Matchers.like(null),
            },
          },
        });

        //Scenary
        const currentInternRequest = {
          //id: 542, 
        inteRequBondingType: "Contrato Indefinido",
        inteRequDetails: null,
        inteRequCompetencies: "Liderazgo,Responsabilidad,Compromiso,Respecto",
        inteRequCreate: "10/12/2020",
        inteRequDepartment: "Operaciones",
        inteRequDuration: "12 MESES",
        inteRequFunctions: "Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material.",
        inteRequIsinprocess: "0",
        inteRequName: "Coordinador de operaciones",
        inteRequNumber: 2,
        inteRequOtherBenefits: " Otros servicios",
        inteRequStatus: null,
        inteRequLocation: null,
        inteRequSalary: 20000000,
        inteRequStDate: "10/12/2000",
        careers: [],
        company: null,
        inteRequCountryName: null,
        inteRequCityName: null,
        };
        const res = await InternRequestController.register(currentInternRequest);
        expect(res.data).toMatchSnapshot();

        await provider.verify();
      });
    }),
    describe("Delete an Intern request", () => {
      it("When a request to delete an Intern request", async function () {
        await provider.addInteraction({
          uponReceiving: "Request to delete an Intern request",
          state: "Delete an Intern Request",
          withRequest: {
            method: "DELETE",
            path: "/internRequest/542",
          },
          willRespondWith: {
            status: 204, // Not content
          },
        });

        const response = await InternRequestController.delete(542);

        expect(response.data).toMatchSnapshot();
        await provider.verify();
      });
    }),
    describe("Obtain a one Intern request", () => {
      it("When a request to  get an Intern request", async function () {
        await provider.addInteraction({
          uponReceiving: "Request to get an Intern request",
          state: "Get an Intern request by its name",
          withRequest: {
            method: "GET",
            path: "/internRequest/542",
          },
          willRespondWith: {
            status: 200,
            body: {
                inteRequId: Matchers.like(542),
                inteRequBondingType: Matchers.like("Contrato Indefinido"),
                inteRequDetails: Matchers.like(null),
                inteRequCompetencies: Matchers.like("Liderazgo,Responsabilidad,Compromiso,Respecto"),
                inteRequCreate: Matchers.like("10/12/2020"),
                inteRequDepartment: Matchers.like("Operaciones"),
                inteRequDuration: Matchers.like("12 MESES"),
                inteRequFunctions: Matchers.like("Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material."),
                inteRequIsinprocess: Matchers.like("0"),
                inteRequName: Matchers.like("Coordinador de operaciones"),
                inteRequNumber: Matchers.like(2),
                inteRequOtherBenefits: Matchers.like(" Otros servicios"),
                inteRequStatus: Matchers.like(null),
                inteRequLocation: Matchers.like(null),
                inteRequSalary: Matchers.like(20000000),
                inteRequStDate: Matchers.like("10/12/2000"),
                careers: Matchers.like([]),
                company: Matchers.like(null),
                inteRequCountryName: Matchers.like(null),
                inteRequCityName: Matchers.like(null),
            },
          },
        });

        const response = await InternRequestController.getAnimal("manchas");

        expect(response.data).toMatchSnapshot();
        await provider.verify();
      });
    }),
    describe("Allow verified the edit of an Intern request", () => {
      it("When a request to edit an Intern request", async function () {
        await provider.addInteraction({
          uponReceiving: "Request to update an Intern request",
          state: "Update an Intern request",
          withRequest: {
            method: "PUT",
            path: "/internRequest/542",
          },
          willRespondWith: {
            status: 200,
            body: {
                inteRequId: Matchers.like(542),
                inteRequBondingType: Matchers.like("Contrato Indefinido"),
                inteRequDetails: Matchers.like(null),
                inteRequCompetencies: Matchers.like("Liderazgo,Responsabilidad,Compromiso,Respecto"),
                inteRequCreate: Matchers.like("10/12/2020"),
                inteRequDepartment: Matchers.like("Operaciones"),
                inteRequDuration: Matchers.like("12 MESES"),
                inteRequFunctions: Matchers.like("Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material."),
                inteRequIsinprocess: Matchers.like("0"),
                inteRequName: Matchers.like("Coordinador de operaciones"),
                inteRequNumber: Matchers.like(2),
                inteRequOtherBenefits: Matchers.like(" Otros servicios"),
                inteRequStatus: Matchers.like(null),
                inteRequLocation: Matchers.like(null),
                inteRequSalary: Matchers.like(20000000),
                inteRequStDate: Matchers.like("10/12/2000"),
                careers: Matchers.like([]),
                company: Matchers.like(null),
                inteRequCountryName: Matchers.like(null),
                inteRequCityName: Matchers.like(null),
            },
          },
        });

        //Scenary
        const currentInternRequest = {
            inteRequId: Matchers.like(542),
            inteRequBondingType: Matchers.like("Contrato Indefinido"),
            inteRequDetails: Matchers.like(null),
            inteRequCompetencies: Matchers.like("Liderazgo,Responsabilidad,Compromiso,Respecto"),
            inteRequCreate: Matchers.like("10/12/2020"),
            inteRequDepartment: Matchers.like("Operaciones"),
            inteRequDuration: Matchers.like("12 MESES"),
            inteRequFunctions: Matchers.like("Verificación de material en bodega,Verificación de costos de fletes,Evaluación de urgencias, Planeación de flujos de producto en las bodegas de acuerdo a los requerimientos comerciales, teniendo en cuenta los ciclos de servicio, los pedidos a despachar según las diferentes observaciones de entrega, las rutas de distribución y restricciones de los clientes.,Logística y verificación de novedades al recepcionar los materiales y solicitud de material."),
            inteRequIsinprocess: Matchers.like("0"),
            inteRequName: Matchers.like("Coordinador de operaciones"),
            inteRequNumber: Matchers.like(2),
            inteRequOtherBenefits: Matchers.like(" Otros servicios"),
            inteRequStatus: Matchers.like(null),
            inteRequLocation: Matchers.like(null),
            inteRequSalary: Matchers.like(20000000),
            inteRequStDate: Matchers.like("10/12/2000"),
            careers: Matchers.like([]),
            company: Matchers.like(null),
            inteRequCountryName: Matchers.like(null),
            inteRequCityName: Matchers.like(null),
        };
        const response = await InternRequestController.updateAnimal(542, currentInternRequest);

        expect(response.data).toMatchSnapshot();
        await provider.verify();
      });
    });
});
