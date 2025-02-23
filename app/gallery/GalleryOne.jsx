import { useEffect, useState } from "react";

const GalleryOne = () => {
  const [posts, setPosts] = useState([ "https://www.instagram.com/p/C3KHOW8x-Gy/",
    "https://www.instagram.com/p/DGSqSruvCUE",
    "https://www.instagram.com/p/C-zFuKESvBY/",
    "https://www.instagram.com/reel/DGaY4AENiXX/?igsh=Ympuamp4enVvd2do"
    ])


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Runs only once when component mounts

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4 text-gray-600">Our Gallery</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {posts.map((post, index) => (
          <blockquote
            key={index}
            className="instagram-media"
            data-instgrm-permalink={post}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: "0",
              borderRadius: "3px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "326px",
              padding: "0",
              width: "99.375%",
            }}
          ></blockquote>
        ))}
      </div>
    </div>
  );
};

export default GalleryOne;
