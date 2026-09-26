import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData && post.userId === userData.$id;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const status = await appwriteService.deletePost(post.$id);

    if (status) {
      if (post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#111827]">
        <p className="text-sm font-medium text-[#9CA3AF]">Loading article...</p>
      </div>
    );
  }

  if (!post) return null;

  const cleanContent = DOMPurify.sanitize(post.content);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#111827] py-10 text-[#F9FAFB] sm:py-16">
      <Container>
        <article className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex rounded-full border border-[#2A9D8F]/30 bg-[#163B38] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#38B2A3]">
              Article
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#F9FAFB] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-[#2A9D8F]" className="hover:bg-[#38B2A3]">
                    Edit article
                  </Button>
                </Link>

                <Button
                  bgColor="bg-[#273449]"
                  textColor="text-[#FCA5A5]"
                  className="border border-[#4B5563] hover:bg-[#3B2530]"
                  onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Featured image */}
          <div className="overflow-hidden rounded-2xl border border-[#374151] bg-[#1F2937] p-1.5 shadow-xl shadow-black/20">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="max-h-150 w-full rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="mt-10 rounded-2xl border border-[#374151] bg-[#1F2937] px-5 py-8 shadow-sm sm:px-8 sm:py-10">
            <div
              className="
                text-[16px]
                leading-8
                text-[#D1D5DB]

                [&_p]:mb-5
                [&_p:last-child]:mb-0

                [&_h1]:mb-5
                [&_h1]:mt-8
                [&_h1]:text-3xl
                [&_h1]:font-bold
                [&_h1]:leading-tight
                [&_h1]:text-[#F9FAFB]

                [&_h2]:mb-4
                [&_h2]:mt-8
                [&_h2]:text-2xl
                [&_h2]:font-bold
                [&_h2]:leading-tight
                [&_h2]:text-[#F9FAFB]

                [&_h3]:mb-3
                [&_h3]:mt-6
                [&_h3]:text-xl
                [&_h3]:font-bold
                [&_h3]:text-[#F9FAFB]

                [&_strong]:font-semibold
                [&_strong]:text-[#F9FAFB]

                [&_a]:font-medium
                [&_a]:text-[#38B2A3]
                [&_a]:underline
                [&_a]:underline-offset-4
                hover:[&_a]:text-[#5CCFC0]

                [&_ul]:mb-5
                [&_ul]:list-disc
                [&_ul]:space-y-2
                [&_ul]:pl-6

                [&_ol]:mb-5
                [&_ol]:list-decimal
                [&_ol]:space-y-2
                [&_ol]:pl-6

                [&_blockquote]:my-6
                [&_blockquote]:border-l-4
                [&_blockquote]:border-[#2A9D8F]
                [&_blockquote]:bg-[#273449]
                [&_blockquote]:px-5
                [&_blockquote]:py-3
                [&_blockquote]:italic
                [&_blockquote]:text-[#9CA3AF]

                [&_img]:my-6
                [&_img]:max-w-full
                [&_img]:rounded-xl
              "
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-[#374151] pt-6">
            <Link
              to="/all-posts"
              className="text-sm font-semibold text-[#2A9D8F] transition-colors duration-200 hover:text-[#38B2A3]">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}

export default Post;
