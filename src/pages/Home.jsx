import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
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
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
            <span className="mb-5 inline-block rounded-full border border-[#2A9D8F]/30 bg-[#163B38] px-4 py-2 text-sm font-semibold text-[#38B2A3]">
              Welcome to Quorilo
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-[#F9FAFB] sm:text-5xl md:text-6xl">
              Your words.
              <span className="text-[#2A9D8F]"> Your world.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#9CA3AF] sm:text-lg">
              Discover ideas, stories, and perspectives from people who have
              something worth sharing.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#111827] py-12 sm:py-16">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#F9FAFB] sm:text-3xl">
              Latest posts
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-62.5 items-center justify-center">
              <p className="text-sm font-medium text-[#9CA3AF]">
                Loading posts...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#374151] bg-[#1F2937] px-6 py-16 text-center">
              <h3 className="text-xl font-bold text-[#F9FAFB]">
                No posts available yet.
              </h3>

              <p className="mt-2 text-[#9CA3AF]">
                Be the first person to share something with the Quorilo
                community.
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

export default Home;
