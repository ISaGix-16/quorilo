import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-[#374151] bg-[#1F2937] transition-all duration-300 hover:-translate-y-1 hover:border-[#2A9D8F]/50 hover:bg-[#273449] hover:shadow-xl hover:shadow-black/20">
        <div className="aspect-16/10 w-full overflow-hidden bg-[#273449]">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-[#F9FAFB] transition-colors duration-200 group-hover:text-[#38B2A3]">
            {title}
          </h2>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[#9CA3AF]">
              Read article
            </span>

            <span className="text-lg text-[#2A9D8F] transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
