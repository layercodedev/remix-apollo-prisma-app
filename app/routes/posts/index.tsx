import { Link, useLoaderData } from "remix";

import graphqlClient from "~/graphql/client";
import gql from "graphql-tag";
import { ApolloQueryResult } from "@apollo/client";
import { Post } from "~/graphql/types";

export const loader = async () => {
  const res= await graphqlClient.query({query:gql`
  query getPosts {
    posts {
      title
      slug
    }
  }
  `});
  return res
};

export default function Posts() {
  const queryResults = useLoaderData<ApolloQueryResult<{posts:Post[]}>>();
  const posts = queryResults.data?.posts
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
