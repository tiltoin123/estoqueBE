import { QueryInterface } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Administrador",
          email: "admin@whaticket.com",
          passwordHash: "$2a$08$WaEmpmFDD/XkDqorkpQ42eUZozOqRCPkPcTkmHHMyuTGUOkI8dHsq",
          profile: "admin",
          tokenVersion: 0,
          storeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Italo",
          email: "italohttp25@gmail.com",
          passwordHash: "$2a$08$rN88MoBr/f2861MLh33/NuAHT1QVrid134MUXiF6dpi6l7ui0fKqS",
          profile: "admin",
          tokenVersion: 0,
          storeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "testeloja2",
          email: "teste@loja2.com",
          passwordHash: "$2a$08$rN88MoBr/f2861MLh33/NuAHT1QVrid134MUXiF6dpi6l7ui0fKqS",
          profile: "admin",
          tokenVersion: 0,
          storeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Users", {});
  }
};
