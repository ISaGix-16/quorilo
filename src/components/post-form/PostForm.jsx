import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const selectedImage = watch("image")?.[0];

  const [imagePreview, setImagePreview] = useState(null);

  /* Create local preview when user selects an image */
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedImage]);

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        // Delete old image only after successful update
        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image?.[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (!value || typeof value !== "string") return "";

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
          {post ? "Edit article" : "Create article"}
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#F9FAFB] sm:text-4xl">
          {post ? "Edit your post" : "Write something worth sharing"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9CA3AF]">
          {post
            ? "Update your article, image, or publishing status."
            : "Share your ideas, stories, and perspectives with the Quorilo community."}
        </p>
      </div>

      {/* Main form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Article content */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-[#374151] bg-[#1F2937] p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#F9FAFB]">
                Article details
              </h2>

              <p className="mt-1 text-sm text-[#9CA3AF]">
                Add the title, URL slug, and content for your article.
              </p>
            </div>

            <div className="space-y-5">
              <Input
                label="Title"
                placeholder="Give your article a title"
                className="mb-0"
                {...register("title", { required: true })}
              />

              <Input
                label="Slug"
                placeholder="your-article-slug"
                className="mb-0"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />

              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </div>

        {/* Publishing */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#374151] bg-[#1F2937] p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#F9FAFB]">
                Publishing
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#9CA3AF]">
                Choose an image and publishing status for your article.
              </p>
            </div>

            {/* Featured image */}
            <div className="mb-6">
              <label
                htmlFor="featured-image"
                className="mb-2 inline-block text-sm font-semibold text-[#F9FAFB]"
              >
                Featured image
              </label>

              {/* Selected image preview */}
              {selectedImage && imagePreview ? (
                <label
                  htmlFor="featured-image"
                  className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-[#374151] bg-[#273449]"
                >
                  <img
                    src={imagePreview}
                    alt="Selected featured image"
                    className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-lg border border-white/20 bg-[#1F2937]/95 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      Change image
                    </span>
                  </div>

                  {/* File information */}
                  <div className="border-t border-[#374151] bg-[#1F2937] px-4 py-3">
                    <p className="truncate text-sm font-semibold text-[#F9FAFB]">
                      {selectedImage.name}
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                      {formatFileSize(selectedImage.size)} · Ready to upload
                    </p>
                  </div>

                  <input
                    id="featured-image"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                  />
                </label>
              ) : (
                /* Upload state */
                <label
                  htmlFor="featured-image"
                  className="
                    group
                    relative
                    flex
                    min-h-47.5
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-dashed
                    border-[#475569]
                    bg-[#273449]
                    px-5
                    py-8
                    text-center
                    transition-all
                    duration-300
                    hover:border-[#2A9D8F]
                    hover:bg-[#263A4B]
                    hover:shadow-lg
                    hover:shadow-black/20
                  "
                >
                  {/* Upload icon */}
                  <span
                    className="
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#2A9D8F]/30
                      bg-[#163B38]
                      text-[#38B2A3]
                      transition-all
                      duration-300
                      group-hover:scale-105
                      group-hover:border-[#2A9D8F]/60
                      group-hover:bg-[#1A4945]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3"
                      />
                    </svg>
                  </span>

                  <span className="text-sm font-semibold text-[#F9FAFB]">
                    {post
                      ? "Choose a new featured image"
                      : "Upload a featured image"}
                  </span>

                  <span className="mt-2 text-xs leading-5 text-[#9CA3AF]">
                    Click to browse from your device
                  </span>

                  <span className="mt-3 rounded-full border border-[#374151] bg-[#1F2937] px-3 py-1 text-[11px] font-medium text-[#6B7280]">
                    PNG · JPG · JPEG · GIF
                  </span>

                  <input
                    id="featured-image"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                  />
                </label>
              )}
            </div>

            {/* Existing image when editing */}
            {post && !selectedImage && (
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold text-[#F9FAFB]">
                  Current image
                </p>

                <div className="overflow-hidden rounded-xl border border-[#374151] bg-[#273449]">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="aspect-16/10 h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Status */}
            <div className="mb-6">
              <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-0"
                {...register("status", { required: true })}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              {post ? "Update article" : "Publish article"}
            </Button>
          </div>

          {/* Writing tip */}
          <div className="rounded-2xl border border-[#374151] bg-[#163B38] p-5">
            <p className="text-sm font-semibold text-[#38B2A3]">
              Writing tip
            </p>

            <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
              Give your article a clear title and use a relevant featured
              image to make it easier for readers to discover.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostForm;