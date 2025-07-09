"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MyFroalaEditor from "@/components/text-editor/Texteditor";

export default function BlogForm({
  initialData = {},
  onSubmit,
  isEditing = false,
  onCancel,
  isSubmitting,
  errors = {},
  apiError,
}) {
  const [formData, setFormData] = useState({
    image: "",
    heading: "",
    shortDescription: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        image: initialData.image || "",
        heading: initialData.heading || "",
        shortDescription: initialData.short_description || "",
        content: initialData.content || "",
        metaTitle: initialData.meta_title || "",
        metaDescription: initialData.meta_description || "",
        slug: initialData.slug || "",
      });

      if (initialData.image) {
        setImagePreview(initialData.image);
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

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile });
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit" : "Create New "}
        </h1>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
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
                  className="border-black p-5 text-gray-600 mt-2 hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer border border-black rounded-md p-4 inline-block hover:bg-gray-50"
                >
                  {imageFile ? imageFile.name : "Choose an image"}
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  {imageFile ? "Click to change image" : "Or enter URL below"}
                </p>
              </div>
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image}</p>
            )}

            {/* <div className="mt-4">
              <label className="text-sm font-medium leading-none">
                Image URL
              </label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="border-black p-5 text-gray-600 mt-2"
              />
            </div> */}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Heading</label>
            <Input
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Blog post title"
              className="border-black p-5 text-gray-600 mt-2"
            />
            {errors.heading && (
              <p className="text-sm text-red-500">{errors.heading}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Slug (URL identifier)
            </label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="blog-post-title"
              className="border-black p-5 text-gray-600 mt-2"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Short Description
            </label>
            <Textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="A brief summary of the blog post"
              className="border-black p-5 text-gray-600 mt-2 min-h-[100px]"
            />
            {errors.shortDescription && (
              <p className="text-sm text-red-500">{errors.shortDescription}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Content</label>
            <MyFroalaEditor
              model={formData.content || ""}
              setModel={handleContentChange}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Meta Title (for SEO)
            </label>
            <Input
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="SEO-friendly title"
              className="border-black p-5 text-gray-600 mt-2"
            />
            {errors.metaTitle && (
              <p className="text-sm text-red-500">{errors.metaTitle}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Meta Description (for SEO)
            </label>
            <Textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="SEO-friendly description"
              className="min-h-[80px] border-black p-5 text-gray-600 mt-2"
            />
            {errors.metaDescription && (
              <p className="text-sm text-red-500">{errors.metaDescription}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Processing..."
                : isEditing
                ? "Update Blog Post"
                : "Create Blog Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}