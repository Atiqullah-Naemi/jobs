import { db } from "../../utils/firebase";
import { Token, Job } from "../../utils/types";

export const jobs = {
  Query: {
    getJobs: async () => {
      try {
        const JobsRef = await db
          .collection("jobs")
          .orderBy("createdAt", "desc")
          .limit(3)
          .get();

        const data = JobsRef.docs.map((doc) => doc.data());

        return {
          message: "Jobs returned successfully",
          code: 200,
          data,
        };
      } catch (err) {
        console.log({ err });
      }
    },
  },
  Mutation: {
    createJob: async (_: undefined, args: Job, { token }: { token: Token }) => {
      const { username } = token;

      if (!username)
        return {
          code: 401,
          message: "you are not authorized",
        };

      const {
        address,
        suburb,
        postcode,
        content,
        isRemote,
        price,
        company,
        tilte,
      } = args;

      try {
        const job = {
          address,
          suburb,
          postcode,
          content,
          isRemote,
          price,
          company,
          tilte,
          createdAt: new Date(),
          createdBy: username,
          // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/noImg.jpg`,
        };

        const docRef = db.collection("jobs");

        await docRef.add(job);

        return {
          code: 200,
          message: "Job created successfully",
        };
      } catch (err) {
        console.log({ err });
        // throw new ApolloError(err.message);
      }
    },
  },
};
