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
    const confirmed = window.confirm(
      "Are you sure you want to delete this article? This action cannot be undone.",
    );

    if (!confirmed) return;

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
      <div className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#111827] sm:min-h-[calc(100vh-72px)]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#374151] border-t-[#2A9D8F]" />
          <p className="text-sm font-medium text-[#9CA3AF]">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const cleanContent = DOMPurify.sanitize(post.content);

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#111827] py-8 text-[#F9FAFB] sm:min-h-[calc(100vh-72px)] sm:py-12 md:py-16">
      <Container>
        <article className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex rounded-full border border-[#2A9D8F]/30 bg-[#163B38] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#38B2A3] sm:text-xs">
              Article
            </span>

            <h1 className="mt-4 wrap-break-word text-3xl font-bold leading-tight tracking-tight text-[#F9FAFB] sm:mt-5 sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button>Edit article</Button>
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
          <div className="overflow-hidden rounded-xl border border-[#374151] bg-[#1F2937] p-1 sm:rounded-2xl sm:p-1.5">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="max-h-150 w-full rounded-lg object-cover sm:rounded-xl"
            />
          </div>

          {/* Article content */}
          <div className="mt-6 rounded-xl border border-[#374151] bg-[#1F2937] px-5 py-7 sm:mt-8 sm:rounded-2xl sm:px-8 sm:py-10">
            <div
              className="
                wrap-break-word
                text-[15px]
                leading-7
                text-[#D1D5DB]
                sm:text-[16px]
                sm:leading-8

                [&_p]:mb-5
                [&_p:last-child]:mb-0

                [&_h1]:mb-5
                [&_h1]:mt-8
                [&_h1]:text-2xl
                [&_h1]:font-bold
                [&_h1]:leading-tight
                [&_h1]:text-[#F9FAFB]
                sm:[&_h1]:text-3xl

                [&_h2]:mb-4
                [&_h2]:mt-8
                [&_h2]:text-xl
                [&_h2]:font-bold
                [&_h2]:leading-tight
                [&_h2]:text-[#F9FAFB]
                sm:[&_h2]:text-2xl

                [&_h3]:mb-3
                [&_h3]:mt-6
                [&_h3]:text-lg
                [&_h3]:font-bold
                [&_h3]:text-[#F9FAFB]
                sm:[&_h3]:text-xl

                [&_strong]:font-semibold
                [&_strong]:text-[#F9FAFB]

                [&_em]:text-[#E5E7EB]

                [&_a]:wrap-break-word
                [&_a]:font-medium
                [&_a]:text-[#38B2A3]
                [&_a]:underline
                [&_a]:underline-offset-4
                [&_a:hover]:text-[#2A9D8F]

                [&_ul]:mb-5
                [&_ul]:list-disc
                [&_ul]:space-y-2
                [&_ul]:pl-5
                sm:[&_ul]:pl-6

                [&_ol]:mb-5
                [&_ol]:list-decimal
                [&_ol]:space-y-2
                [&_ol]:pl-5
                sm:[&_ol]:pl-6

                [&_li]:pl-1

                [&_blockquote]:my-6
                [&_blockquote]:border-l-4
                [&_blockquote]:border-[#2A9D8F]
                [&_blockquote]:bg-[#273449]
                [&_blockquote]:px-4
                [&_blockquote]:py-3
                [&_blockquote]:italic
                [&_blockquote]:text-[#9CA3AF]
                sm:[&_blockquote]:px-5

                [&_code]:rounded
                [&_code]:bg-[#111827]
                [&_code]:px-1.5
                [&_code]:py-0.5
                [&_code]:font-mono
                [&_code]:text-[0.9em]
                [&_code]:text-[#38B2A3]

                [&_pre]:my-6
                [&_pre]:overflow-x-auto
                [&_pre]:rounded-xl
                [&_pre]:border
                [&_pre]:border-[#374151]
                [&_pre]:bg-[#111827]
                [&_pre]:p-4
                [&_pre]:font-mono
                [&_pre]:text-sm
                [&_pre]:leading-6
                [&_pre]:text-[#D1D5DB]

                [&_pre_code]:bg-transparent
                [&_pre_code]:p-0
                [&_pre_code]:text-inherit

                [&_table]:my-6
                [&_table]:w-full
                [&_table]:border-collapse
                [&_table]:overflow-hidden

                [&_th]:border
                [&_th]:border-[#374151]
                [&_th]:bg-[#273449]
                [&_th]:px-3
                [&_th]:py-2
                [&_th]:text-left
                [&_th]:font-semibold
                [&_th]:text-[#F9FAFB]

                [&_td]:border
                [&_td]:border-[#374151]
                [&_td]:px-3
                [&_td]:py-2
                [&_td]:text-[#D1D5DB]

                [&_hr]:my-8
                [&_hr]:border-0
                [&_hr]:border-t
                [&_hr]:border-[#374151]

                [&_img]:my-6
                [&_img]:h-auto
                [&_img]:max-w-full
                [&_img]:rounded-xl
              "
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>

          {/* Bottom navigation */}
          <div className="mt-6 border-t border-[#374151] pt-5 sm:mt-8 sm:pt-6">
            <Link
              to="/all-posts"
              className="inline-flex items-center rounded-md text-sm font-semibold text-[#2A9D8F] transition-colors duration-200 hover:text-[#38B2A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </Container>
    </div>
  );
}

export default Post;
