import { ApolloQueryResult } from "@apollo/client";
import { Outlet, Link, useLoaderData } from "remix";
import graphqlClient from "~/graphql/client";
import gql from "graphql-tag";
import { Post } from "~/graphql/types";

import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async() => {
  const res= await graphqlClient.query({query: gql`
  query getPosts {
    posts {
      title
      slug
    }
  }
  `});
  return res;
};

export default function Admin() {
  const { data } = useLoaderData<ApolloQueryResult<{posts:Post[]}>>();
  
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {data.posts.map(post => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
