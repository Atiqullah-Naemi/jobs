import { db } from "../../utils/firebase";
import { Request, Response } from "express";
import { Property } from "../../utils/types";

interface ExpressResponse {
  req: Request;
  res: Response;
}

export const properties = {
  Query: {
    getProperties: async () => {
      try {
        const propertiesRef = await db
          .collection("properties")
          .orderBy("createdAt", "desc")
          .limit(3)
          .get();

        const data = propertiesRef.docs.map((doc) => doc.data());

        return {
          message: "properties returned successfully",
          code: 200,
          data,
        };
      } catch (err) {
        console.log({ err });
      }
    },
  },
  Mutation: {
    createProperty: async (_: undefined, args: Property) => {
      const {
        address,
        content,
        price,
        bedrooms,
        bathrooms,
        carparks,
        type,
        landSize,
        buildingSize,
        suburb,
        postcode,
        // imageUrl,
        lister,
      } = args;

      try {
        const property = {
          address,
          content,
          price,
          bedrooms,
          bathrooms,
          carparks,
          type,
          landSize,
          buildingSize,
          suburb,
          postcode,
          createdAt: new Date(),
          lister,
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/noImg.jpg`,
        };

        const docRef = db.collection("properties");

        await docRef.add(property);

        return {
          code: 200,
          message: "property created successfully",
        };
      } catch (err) {
        console.log({ err });
        // throw new ApolloError(err.message);
      }
    },
  },
};
