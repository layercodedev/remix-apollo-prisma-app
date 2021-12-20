import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import graphqlClient from "~/graphql/client";
import gql from "graphql-tag";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  const res= await graphqlClient.query({query:gql`
  query getPost($slug:String) {
    post(slug: $slug) {
      title
      slug
      body
    }
  }
  `,variables:{slug:params.slug}});
  return res
};

export default function PostSlug() {
  const { data } = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: data.post.body }} />;
}
