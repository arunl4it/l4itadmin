"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function BlogFormsec({
  initialData = {},
  onSubmit,
  isEditing = false,
  onCancel,
  isSubmitting,
  errors = {},
  apiError,
}) {
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    slug: "",
    blogTitle: "",
    shortDescription: "",
    featuredImage: "",
    authorName: "",
    authorImage: "",
    authorSocialLinks: {
      linkedin: "",
      github: "",
      instagram: "",
      facebook: "",
    },
    sections: [
      {
        title: "",
        description: "",
        points: [],
        image: "",
        linkText: "",
        linkUrl: "",
      },
    ],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [authorImageFile, setAuthorImageFile] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState("");

  useEffect(() => {
    if (isEditing && initialData) {
      const blogData = JSON.parse(initialData.blog_data_raw);
      setFormData({
        metaTitle: initialData.metaTitle || "",
        metaDescription: initialData.metaDescription || "",
        slug: initialData.slug || "",
        blogTitle: initialData.blogTitle || "",
        shortDescription: initialData.shortDescription,
        authorName: blogData.authorName || "",
        authorImage: blogData.authorImage || "",
        authorSocialLinks: blogData.authorSocialLinks || [],
        introParagraph: blogData.introParagraph || "",
        sections: blogData.sections || [
          {
            title: "Problem Statement",
            description: "",
            points: [],
            image: "",
            linkText: "",
            linkUrl: "",
          },
        ],
      });

      if (initialData.featuredImage) {
        setImagePreview(initialData.featuredImage);
      }
      if (blogData.authorImage) {
        setAuthorImagePreview(blogData.authorImage);
      }
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // const handleAuthorImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAuthorImageFile(file);
  //     const previewUrl = URL.createObjectURL(file);
  //     setAuthorImagePreview(previewUrl);
  //   }
  // };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      authorSocialLinks: {
        ...prev.authorSocialLinks,
        [platform]: value,
      },
    }));
  };

  //   const addSocialLink = () => {
  //     setFormData(prev => ({
  //       ...prev,
  //       authorSocialLinks: [...prev.authorSocialLinks, ""]
  //     }));
  //   };

  const removeSocialLink = (index) => {
    const updatedLinks = formData.authorSocialLinks.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      authorSocialLinks: updatedLinks,
    }));
  };

  const addSectionPoint = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].points.push({
      heading: "",
      description: "",
    });
    setFormData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const removeSectionPoint = (sectionIndex, pointIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].points = updatedSections[
      sectionIndex
    ].points.filter((_, i) => i !== pointIndex);
    setFormData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const addNewSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          description: "",
          points: [],
          image: "",
          linkText: "",
          linkUrl: "",
        },
      ],
    }));
  };

  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      sections: updatedSections,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile, authorImageFile });
  };

  // const handleSectionImageChange = (sectionIndex, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const updatedSections = [...formData.sections];
  //     const previewUrl = URL.createObjectURL(file);

  //     updatedSections[sectionIndex] = {
  //       ...updatedSections[sectionIndex],
  //       imageFile: file,
  //       imagePreview: previewUrl,
  //       image: "" // Clear URL if file is selected
  //     };

  //     setFormData(prev => ({
  //       ...prev,
  //       sections: updatedSections
  //     }));
  //   }
  // };

  // const handleSectionImageUrlChange = (sectionIndex, value) => {
  //   const updatedSections = [...formData.sections];
  //   updatedSections[sectionIndex] = {
  //     ...updatedSections[sectionIndex],
  //     image: value,
  //     imageFile: null,
  //     imagePreview: ""
  //   };
  //   setFormData(prev => ({
  //     ...prev,
  //     sections: updatedSections
  //   }));
  // };

  // const removeSectionImage = (sectionIndex) => {
  //   const updatedSections = [...formData.sections];
  //   updatedSections[sectionIndex] = {
  //     ...updatedSections[sectionIndex],
  //     image: "",
  //     imageFile: null,
  //     imagePreview: ""
  //   };
  //   setFormData(prev => ({
  //     ...prev,
  //     sections: updatedSections
  //   }));
  // };

  return (
    <div className="bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* SEO Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">SEO Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <Input
                  name="metaTitle"
                  value={formData.metaTitle ||""}
                  onChange={handleChange}
                  placeholder="SEO-friendly title (50-60 characters)"
                  className="border-gray-300 p-4"
                />
                {errors.metaTitle && (
                  <p className="text-sm text-red-500">{errors.metaTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <Textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO-friendly description (150-160 characters)"
                  className="min-h-[100px] border-gray-300 p-4"
                />
                {errors.metaDescription && (
                  <p className="text-sm text-red-500">
                    {errors.metaDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL identifier)
                </label>
                <Input
                  name="slug"
                  value={formData.slug ||""}
                  onChange={handleChange}
                  placeholder="blog-post-url"
                  className="border-gray-300 p-4"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug}</p>
                )}
              </div>
            </div>
          </div>

          {/* Blog Basic Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Blog Information</h2>

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <Input
                name="blogTitle"
                value={formData.blogTitle||""}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.blogTitle && (
                <p className="text-sm text-red-500">{errors.blogTitle}</p>
              )}
            </div>

            {/* Introduction Paragraph (Short Description) */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Introduction Paragraph (2-3 lines summarizing the topic and
                hook)
              </label>
              <Textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Enter a compelling introduction that summarizes the topic and hooks readers"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
                maxLength={200} // Limits to about 2-3 lines
              />
              {/* <p className="text-xs text-gray-500 text-right">
              {formData.shortDescription.length}/200 characters
            </p> */}
              {errors.shortDescription && (
                <p className="text-sm text-red-500">
                  {errors.shortDescription}
                </p>
              )}
            </div>

            {/* Featured Image Upload */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-gray-300 p-5 text-gray-600 mt-2 hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer border border-gray-300 rounded-md px-4 py-3 inline-block hover:bg-gray-100 transition-colors"
                  >
                    {imageFile ? imageFile.name : "Choose an image"}
                  </label>
                  {/* <p className="text-sm text-gray-500 mt-1">
                    {imageFile ? "Click to change image" : "Or enter URL below"}
                  </p>
                  <Input
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    placeholder="Or enter image URL"
                    className="border-gray-300 p-3 mt-2"
                  /> */}
                </div>
              </div>
              {errors.featuredImage && (
                <p className="text-sm text-red-500">{errors.featuredImage}</p>
              )}
            </div>
          </div>

          {/* Author Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Author Details</h2>

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Author Name
              </label>
              <Input
                name="authorName"
                value={formData.authorName ||""}
                onChange={handleChange}
                placeholder="Enter author name"
                className="border-gray-300 p-4 text-gray-600 mt-1"
              />
              {errors.authorName && (
                <p className="text-sm text-red-500">{errors.authorName}</p>
              )}
            </div>

            {/* Author Image Upload */}
            {/* <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Author Image
              </label>
              <div className="flex items-center gap-4">
                {authorImagePreview && (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={authorImagePreview}
                      alt="Author Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleAuthorImageChange}
                    className="border-gray-300 p-5 text-gray-600 mt-2 hidden"
                    id="author-image-upload"
                  />
                  <label
                    htmlFor="author-image-upload"
                    className="cursor-pointer border border-gray-300 rounded-md px-4 py-3 inline-block hover:bg-gray-100 transition-colors"
                  >
                    {"Choose an image (jpg, png, gif, webp)"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    {authorImageFile ? "Click to change image" : "Or enter URL below"}
                  </p>
                  <Input
                    name="authorImage"
                    value={formData.authorImage}
                    onChange={handleChange}
                    placeholder="Or enter author image URL"
                    className="border-gray-300 p-3 mt-2"
                  />
                </div>
              </div>
              {errors.authorImage && (
                <p className="text-sm text-red-500">{errors.authorImage}</p>
              )}
            </div> */}

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Author Image URL
              </label>
              <div className="flex items-center gap-4">
                {formData.authorImage && (
                  <div className="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                      src={formData.authorImage}
                      alt="Author Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    name="authorImage"
                    value={formData.authorImage ||""}
                    onChange={handleChange}
                    placeholder="Enter author image URL (e.g., https://example.com/author.jpg)"
                    className="border-gray-300 p-4"
                  />
                </div>
              </div>
              {errors.authorImage && (
                <p className="text-sm text-red-500">{errors.authorImage}</p>
              )}
            </div>

            {/* Fixed Social Media Links */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Links
              </label>

              {/* LinkedIn */}
              <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  value={formData.authorSocialLinks.linkedin ||""}
                  onChange={(e) =>
                    handleSocialLinkChange("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="flex-1 border-gray-300 p-4"
                />
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  value={formData.authorSocialLinks.github ||""}
                  onChange={(e) =>
                    handleSocialLinkChange("github", e.target.value)
                  }
                  placeholder="https://github.com/username"
                  className="flex-1 border-gray-300 p-4"
                />
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  value={formData.authorSocialLinks.instagram ||""}
                  onChange={(e) =>
                    handleSocialLinkChange("instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/username"
                  className="flex-1 border-gray-300 p-4"
                />
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-2">
                <div className="w-8 flex justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  value={formData.authorSocialLinks.facebook ||""}
                  onChange={(e) =>
                    handleSocialLinkChange("facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/username"
                  className="flex-1 border-gray-300 p-4"
                />
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Blog Content</h2>

            {/* Intro Paragraph */}
            {/* <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Introduction Paragraph (2-3 lines summarizing the topic and hook)
              </label>
              <Textarea
                name="introParagraph"
                value={formData.introParagraph}
                onChange={handleChange}
                placeholder="Enter introduction paragraph"
                className="border-gray-300 p-4 text-gray-600 mt-1 min-h-[100px]"
              />
              {errors.introParagraph && (
                <p className="text-sm text-red-500">{errors.introParagraph}</p>
              )}
            </div> */}

            {/* Blog Sections */}
            {formData.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="mb-8 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Section {sectionIndex + 1}
                  </h3>
                  {sectionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                {/* Section Title */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Section Title (H2)
                  </label>
                  <Input
                    value={section.title ||""}
                    onChange={(e) =>
                      handleSectionChange(sectionIndex, "title", e.target.value)
                    }
                    placeholder="Enter section title"
                    className="border-gray-300 p-4"
                  />
                </div>

                {/* Section Description */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    value={section.description}
                    onChange={(e) =>
                      handleSectionChange(
                        sectionIndex,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter section description"
                    className="border-gray-300 p-4 min-h-[100px]"
                  />
                </div>

                {/* Section Points */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Points (Optional)
                  </label>
                  {section.points.map((point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="space-y-2 mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">
                          Point {pointIndex + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            removeSectionPoint(sectionIndex, pointIndex)
                          }
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Heading
                        </label>
                        <Input
                          value={point.heading ||""}
                          onChange={(e) => {
                            const updatedPoints = [...section.points];
                            updatedPoints[pointIndex] = {
                              ...updatedPoints[pointIndex],
                              heading: e.target.value,
                            };
                            handleSectionChange(
                              sectionIndex,
                              "points",
                              updatedPoints
                            );
                          }}
                          placeholder="Enter point heading"
                          className="border-gray-300 p-3 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Description
                        </label>
                        <Textarea
                          value={point.description}
                          onChange={(e) => {
                            const updatedPoints = [...section.points];
                            updatedPoints[pointIndex] = {
                              ...updatedPoints[pointIndex],
                              description: e.target.value,
                            };
                            handleSectionChange(
                              sectionIndex,
                              "points",
                              updatedPoints
                            );
                          }}
                          placeholder="Enter point description"
                          className="border-gray-300 p-3 text-sm min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSectionPoint(sectionIndex)}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Point
                  </Button>
                </div>

                {/* Section Image Upload */}
                {/* <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>

                  {(section.imagePreview || section.image) && (
                    <div className="mb-4">
                      <div className="relative w-48 h-32 border rounded-md overflow-hidden">
                        <img
                          src={section.imagePreview || section.image}
                          alt="Section preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeSectionImage(sectionIndex)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSectionImageChange(sectionIndex, e)
                        }
                        className="border-gray-300 p-5 text-gray-600 mt-2 hidden"
                        id={`section-image-upload-${sectionIndex}`}
                      />
                      <label
                        htmlFor={`section-image-upload-${sectionIndex}`}
                        className="cursor-pointer border border-gray-300 rounded-md px-4 py-3 inline-block hover:bg-gray-100 transition-colors"
                      >
                        {"Choose an image ( jpg, png, gif, webp)"}
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                    {section.imageFile ? "Click to change image" : "Or enter URL below"}
                  </p>
                    </div>
                  </div>

                   <Input
                value={section.image}
                onChange={(e) => handleSectionImageUrlChange(sectionIndex, e.target.value)}
                placeholder="Or enter image URL"
                className="border-gray-300 p-3 mt-2"
              />
                </div> */}

                {/* Section Image URL */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {section.image && (
                      <div className="w-32 h-32 border rounded-md overflow-hidden">
                        <img
                          src={section.image}
                          alt="Section preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        value={section.image ||""}
                        onChange={(e) =>
                          handleSectionChange(
                            sectionIndex,
                            "image",
                            e.target.value
                          )
                        }
                        placeholder="Enter image URL (e.g., https://example.com/section-image.jpg)"
                        className="border-gray-300 p-4"
                      />
                    </div>
                    {section.image && (
                      <button
                        type="button"
                        onClick={() => removeSectionImage(sectionIndex)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Section Link */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Link Text (Optional)
                    </label>
                    <Input
                      value={section.linkText ||""}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "linkText",
                          e.target.value
                        )
                      }
                      placeholder="Enter link text"
                      className="border-gray-300 p-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Link URL (Optional)
                    </label>
                    <Input
                      value={section.linkUrl ||""}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "linkUrl",
                          e.target.value
                        )
                      }
                      placeholder="Enter link URL"
                      className="border-gray-300 p-4"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addNewSection}
              className="mt-4"
            >
              <Plus size={16} className="mr-2" />
              Add New Section
            </Button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              size="lg"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting
                ? "Processing..."
                : isEditing
                ? "Update Blog"
                : "Create Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
