
   
import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = gql`
  type Post {
    title: String!
    slug: String!
    body:String!
  }
  
  
  input PostInput {
    title: String!
    slug: String!
    body:String!
  }
  
  
  type Mutation {
    createPost(post: PostInput!): Post
  }
  
  type Query {
  
      post(slug: String!): Post
      posts: [Post]
  
  }  
`;
const schema= makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  export default schema;