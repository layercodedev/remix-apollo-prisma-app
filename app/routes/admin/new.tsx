import { useTransition, useActionData, Form, redirect } from "remix";
import type { ActionFunction } from "remix";
import invariant from "tiny-invariant";
import graphqlClient from "~/graphql/client";
import gql from "graphql-tag";

export const action: ActionFunction = async ({ request }) => {
  await new Promise(res => setTimeout(res, 1000));
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const body = formData.get("body");

  const errors: Record<string, boolean> = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!body) errors.body = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof body === "string");
  await graphqlClient.mutate({ mutation: gql`
    mutation createPost($post:PostInput!) {
        createPost(post:$post) {
          title
          slug
        }
      }
  `,variables:{post:{ title, slug, body }}});

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="body">body:</label>{" "}
        {errors?.body ? <em>body is required</em> : null}
        <br />
        <textarea rows={20} name="body" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
