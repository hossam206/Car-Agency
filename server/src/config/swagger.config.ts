import { Application, NextFunction, Response, Request } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions = (route: string): object => {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Car Agency",
        version: "1.0.0",
        description: `API documentation for the ${route}`,
      },
      servers: [
        {
          url: String(process.env.BACKEND_URL),
          description: "Local server for development",
        },
      ],
    },
    apis: [
      `./src/router.ts`,
      `./src/routes/${route}.routes.ts`,
      `./src/swaggers/components/${route}.component.ts`,
      `./src/swaggers/tags/${route}.tag.ts`,
      `./src/swaggers/responses/${route}.response.ts`,
      `./src/swaggers/parameters/*.ts`,
    ],
  };
};

export const swaggerDoc = (app: Application) => {
  app.use("/api-docs/:routeName", swaggerUi.serve);
  app.use(
    "/api-docs/:routeName",
    (req: Request, res: Response, next: NextFunction) => {
      const routeName = req.params.routeName as string;
      const swaggerSpecs = swaggerJSDoc(swaggerOptions(routeName));
      return swaggerUi.setup(swaggerSpecs, { explorer: true })(req, res, next);
    }
  );
};
