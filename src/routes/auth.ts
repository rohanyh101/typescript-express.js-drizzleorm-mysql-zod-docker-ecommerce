import { Router } from "express";
import { loginHandler, signupHandler, whoAmIHandler } from "../controllers/auth";
import validateResource from "../middlewares/validate.resource";
import { loginSchema, signupSchema } from "../schema/users";
import requireUser from "../middlewares/requireUser";
import authMiddleware from "../middlewares/auth";
// import { errorHandler } from "../error.handler";

const authRouter: Router = Router();

authRouter.post("/signup", validateResource(signupSchema), signupHandler);

authRouter.post("/login", validateResource(loginSchema), loginHandler);

authRouter.get("/whoami", requireUser, whoAmIHandler)

export default authRouter;


// No overload matches this call.
//   The last overload gave the following error.
//     Argument of type '(req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
//       Type '(req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.

//       Types of parameters 'req' and 'req' are incompatible.
//           Property 'user' is missing in type 'import("d:/xProject/node-dev/ecom/node_modules/@types/express-serve-static-core/index").Request<import("d:/xProject/node-dev/ecom/node_modules/@types/express-serve-static-core/index").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>' but required in type 'import("d:/xProject/node-dev/ecom/node_modules/@types/express/index").Request<import("d:/xProject/node-dev/ecom/node_modules/@types/express-serve-static-core/index").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>'.ts(2769)
// express.d.ts(14, 9): 'user' is declared here.
// index.d.ts(153, 5): The last overload is declared here.