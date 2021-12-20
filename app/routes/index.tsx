
import { Link } from "remix";

export default function Index() {

  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to Remix!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p><Link to={`/admin`}>admin</Link></p>
        <p><Link to={`/posts`}>posts</Link></p>

      </main>

    </div>
  );
}
