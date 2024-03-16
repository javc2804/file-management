import { registrar } from "../../controllers/usuarioController.js";
import Usuario from "../../models/Usuario.js";

jest.mock("../../models/Usuario.js");

describe("registrar", () => {
  it("deberia crear un usuario", async () => {
    const mockReq = {
      body: {
        email: "test@test.com",
        nombre: "Test User",
        password: "password123",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Usuario.findOne.mockResolvedValue(null);

    await registrar(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  });
});
