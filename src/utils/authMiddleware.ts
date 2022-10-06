import jwt from "jsonwebtoken";

export const contextMiddleware = async (context: any) => {
  if (context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization;

    jwt.verify(
      token,
      <string>process.env.JWT_SECRET,
      (err: any, decodedToken: any) => {
        context.token = decodedToken;
      }
    );
  }

  return context;
};
