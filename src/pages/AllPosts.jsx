import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        setPosts(posts?.rows || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#111827] text-[#F9FAFB]">
      <section className="border-b border-[#374151] bg-[#111827]">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
              Discover
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F9FAFB] sm:text-4xl">
              Explore all posts
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[#9CA3AF]">
              Discover ideas, stories, and perspectives shared by the Quorilo
              community.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#111827] py-12 sm:py-16">
        <Container>
          {loading ? (
            <div className="flex min-h-75 items-center justify-center">
              <p className="text-sm font-medium text-[#9CA3AF]">
                Loading posts...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#374151] bg-[#1F2937] px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-[#F9FAFB]">
                No posts available yet.
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#9CA3AF]">
                There aren't any published posts at the moment. Check back later
                or start writing something yourself.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default AllPosts;
