import { db } from "../../utils/firebase";
import { ApolloError } from "apollo-server";
import { Request, Response } from "express";
import {
  User,
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ExpressResponse {
  req: Request;
  res: Response;
}

export const users = {
  Query: {
    login: async (_: undefined, args: any, { req, res }: ExpressResponse) => {
      const { email, password } = args;

      try {
        const auth = getAuth();
        const user: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const { displayName: username } = user?.user;

        console.log(user?.user, " user?.user");
        // res.cookie("token", user?.user?.accessToken, {
        //   httpOnly: true,
        //   maxAge: 1000 * 60 * 60 * 24 * 7,
        // });

        const getUser = await db.collection("users").doc(username).get();

        if (!getUser.exists) return { code: 400, message: "user not found" };

        const token = jwt.sign({ username }, <string>process.env.JWT_SECRET, {
          expiresIn: 60 * 60,
        });

        return {
          code: 200,
          message: "user login successfully",
          token,
        };
      } catch (err: any) {
        console.log({ err });
        if (err.code === "auth/user-not-found") {
          return {
            code: 400,
            message: "User not found",
          };
        }
        if (err.code === "auth/wrong-password") {
          return res.status(400).send({
            code: 400,
            message: "Incorrect email or password",
          });
        }

        throw new ApolloError(err.message);
      }
    },
  },
  Mutation: {
    register: async (_: undefined, args: any) => {
      const { username, email, password, confirmPassword } = args;

      if (password !== confirmPassword) {
        return {
          code: 400,
          message: "passwords not matching",
        };
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      try {
        const doc = await db.doc(`users/${newUser.username}`).get();

        if (doc.exists)
          return { code: 400, message: "this username is already taken" };

        const auth = getAuth();
        const user: any = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (user?.user?.uid) {
          await updateProfile(auth.currentUser as User, {
            displayName: username,
          });
        }

        const userCredentials = {
          username: newUser.username,
          email: newUser.email,
          createdAt: new Date(),
          imageUrl: `https://firebasestorage.googleapis.com/b/${process.env.STORAGE_BUCKET}/o/noImg.jpg`,
          userId: user?.user?.uid,
        };

        const docRef = db.collection("users").doc(newUser.username);

        await docRef.set(userCredentials);

        return {
          code: 200,
          message: "user regsitered successfully",
        };
      } catch (err: any) {
        if (err.code === "auth/email-already-in-use") {
          return {
            code: 400,
            message: "Email is already is use",
          };
        } else {
          throw new ApolloError(err.message);
        }
      }
    },
  },
};
