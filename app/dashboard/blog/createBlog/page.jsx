"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import BlogFormsec from "@/components/blog-formsec/Blogformsec";

const API_BASE_URL = process.env.NEXT_PUBLIC_CREATE_URL;

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const token = getCookie("token");

  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const mime = file.type;
  //       const base64 = reader.result;
  //       if (!base64.startsWith("data:")) {
  //         resolve(`data:${mime};base64,${base64.split(",")[1]}`);
  //       } else {
  //         resolve(base64);
  //       }
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.blogTitle?.trim())
      errors.blogTitle = "Blog title is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.shortDescription?.trim())
      errors.shortDescription = "Short description is required";
    if (!formData.metaTitle?.trim())
      errors.metaTitle = "Meta title is required";
    if (!formData.metaDescription?.trim())
      errors.metaDescription = "Meta description is required";
    if (!formData.imageFile && !formData.featuredImage)
      errors.featuredImage = "Featured image is required";
    return errors;
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError("");
    console.log("Form data received:", formData);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }
    setFormErrors({});

    try {
      const uploadFormData = new FormData();

      // Handle featured image
      if (formData.imageFile) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.featuredImage) {
        uploadFormData.append("image_url", formData.featuredImage);
      }

      // // Convert author image file to base64
      // let authorImageBase64 = formData.authorImage || "";
      // if (formData.authorImageFile) {
      //   authorImageBase64 = await fileToBase64(formData.authorImageFile);
      //   console.log("Author Image Base64:", authorImageBase64);
      // }

      // // Convert section images to base64
      // const sectionsWithImages = await Promise.all(
      //   formData.sections.map(async (section, index) => {
      //     let sectionImageBase64 = section.image || "";
      //     if (section.imageFile) {
      //       sectionImageBase64 = await fileToBase64(section.imageFile);
      //       console.log(`Section ${index + 1} Image Base64:`, sectionImageBase64);
      //     }
      //     return {
      //       ...section,
      //       image: sectionImageBase64,
      //     };
      //   })
      // );

      // Prepare blog_data_raw
      const blogData = {
        authorName: formData.authorName || "",
        authorImage: formData.authorImage,
        thumbnailImage:formData.thumbnailImage,
        authorSocialLinks: formData.authorSocialLinks || {
          linkedin: "",
          github: "",
          instagram: "",
          facebook: "",
        },
        introParagraph: formData.shortDescription || "",
        sections: formData.sections.map(section => ({
          ...section,
          points: section.points.map(point => ({
            heading: point.heading || "",
            description: point.description || ""
          }))
        })),      };

      // Append required fields
      uploadFormData.append("heading", formData.blogTitle);
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription);
      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("meta_description", formData.metaDescription);
      uploadFormData.append("type", "blog");
      uploadFormData.append("content", formData.content || "");
      uploadFormData.append("blog_data_raw", JSON.stringify(blogData));

      // Log FormData content
      for (let [key, value] of uploadFormData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details:", errorData);
        throw new Error(errorData.message || "Blog creation failed");
      }

      await response.json();
      toast.success("Blog created successfully!");
      router.push("/dashboard/Blog");
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message || "Failed to create blog");
      toast.error(error.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/Blog");
  };

  return (
    <BlogFormsec
      onSubmit={handleSubmit}
      isEditing={false}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      errors={formErrors}
      apiError={error}
    />
  );
}
