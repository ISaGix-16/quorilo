import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block text-sm font-semibold text-[#F9FAFB]">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-xl border border-[#374151] bg-[#1F2937] transition-all duration-200 focus-within:border-[#2A9D8F] focus-within:ring-2 focus-within:ring-[#2A9D8F]/15">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              initialValue={defaultValue}
              init={{
                height: 500,

                menubar: true,

                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],

                toolbar:
                  "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image | removeformat | help",

                toolbar_mode: "sliding",

                /* Dark TinyMCE theme */
                skin: "oxide-dark",
                content_css: "dark",

                /* Editor content */
                content_style: `
                  body {
                    font-family:
                      Inter,
                      ui-sans-serif,
                      system-ui,
                      -apple-system,
                      BlinkMacSystemFont,
                      "Segoe UI",
                      sans-serif;

                    font-size: 15px;
                    line-height: 1.7;

                    color: #D1D5DB;
                    background: #1F2937;

                    padding: 16px 18px;
                  }

                  p {
                    margin: 0 0 12px;
                  }

                  h1,
                  h2,
                  h3,
                  h4 {
                    color: #F9FAFB;
                  }

                  a {
                    color: #38B2A3;
                  }

                  blockquote {
                    border-left: 4px solid #2A9D8F;
                    margin-left: 0;
                    padding-left: 16px;
                    color: #9CA3AF;
                  }

                  code {
                    background: #273449;
                    color: #38B2A3;
                    padding: 2px 5px;
                    border-radius: 4px;
                  }
                `,

                branding: false,
                promotion: false,
                resize: false,

                elementpath: false,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>

      <p className="mt-2 text-xs text-[#6B7280]">
        Write your article using headings, lists, links, images, and formatting.
      </p>
    </div>
  );
}
