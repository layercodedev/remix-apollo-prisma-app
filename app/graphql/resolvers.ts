import { IResolvers } from "@graphql-tools/utils";
import path from "path";
import { PostInput } from "./types";
import prisma from "~/db/prisma";
export type PostMarkdownAttributes = {
  title: string;
};


const resolvers: IResolvers = {
  Query: {
    post: (source, args: { slug: string }, context, info) => {
      const { slug } = args;
      return prisma.post.findFirst({ where:{ slug } })
    },
    posts: async (source, args, context, info) => {
          return prisma.post.findMany({});
    },
  },
  Mutation: {
    createPost: async (source, args: { post: PostInput }, context, info) => {
      return prisma.post.create({ data:args.post })
    },
  },
};
export default resolvers;
