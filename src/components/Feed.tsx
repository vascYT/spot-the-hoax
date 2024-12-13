import posts from "../assets/posts.json";
import Post from "./Post";

function shuffle(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default function Feed() {
  shuffle(posts);

  return (
    <div className="flex items-center flex-col w-full h-full mt-10 px-10">
      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}
