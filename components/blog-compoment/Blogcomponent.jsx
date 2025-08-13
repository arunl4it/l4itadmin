"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import Image from "next/image";
import BlogForm from "../blog-form/BlogForm";
import BlogFormsec from "../blog-formsec/Blogformsec";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Blogcomponent() {
  const router = useRouter();
  const { id } = useParams();
  const token = getCookie("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [blogId, setBlogid] = useState(null);

  console.log("initialData", initialData);

  // Redirect to home if token is missing
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.blogTitle?.trim()) errors.heading = "Heading is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.metaTitle?.trim())
      errors.metaTitle = "Meta title is required";
    if (!formData.metaDescription?.trim())
      errors.metaDescription = "Meta description is required";
    // if (!formData.imageFile && !formData.image)
    //   errors.image = "Image is required";

    return errors;
  };

  // Fetch blog data
  useEffect(() => {
    const fetchMspService = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch MSP service");
        const data = await res.json();
        setBlogid(data.id);

        // console.log("data",data);
        

        // Parse the blog_data_raw if it exists
        const blogDataRaw = data.blog_data_raw
          ? JSON.parse(data.blog_data_raw)
          : {};

        console.log("blogDataRaw", blogDataRaw);

        const transformedSections = blogDataRaw.sections?.map(section => ({
          ...section,
          points: section.points?.map(point => {
            // Handle both old (string) and new (object) point formats
            if (typeof point === 'string') {
              return {
                heading: "",
                description: point
              };
            }
            return {
              heading: point.heading || "",
              description: point.description || ""
            };
          }) || []
        })) || [];

        setInitialData({
          ...data,
          metaTitle: data.meta_title || "",
          metaDescription: data.meta_description || "",
          shortDescription: data.short_description || "",
          featuredImage: data.image || "",
          blogTitle: data.heading || "",
          content: data.content || "",
          thumbnailImage: blogDataRaw.thumbnailImage || "",
          authorImage: blogDataRaw.authorImage || "",
          authorImage: blogDataRaw.authorImage || "",

          authorSocialLinks: blogDataRaw.authorSocialLinks || {
            linkedin: "",
            github: "",
            instagram: "",
            facebook: ""
          },
          sections: transformedSections
        });

        // setInitialData({
        //   ...data,
        //   metaTitle: data.meta_title || "",
        //   metaDescription: data.meta_description || "",
        //   shortDescription: data.short_description || "",
        //    featuredImage: data.image || "",
        //   blogTitle: data.heading ||"",
        //   content: data.content || "",
        //   // Spread the parsed blog_data_raw into initialData
        //   ...blogDataRaw,
        // });
      } catch (error) {
        console.error("Fetch MSP service error:", error);
        toast.error("Failed to load MSP service data");
      }
    };

    if (id) {
      fetchMspService();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    console.log("formdata",formData);
    
    setIsSubmitting(true);
    setError("");

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setError("Please fill all required fields");
      setIsSubmitting(false);
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const uploadFormData = new FormData();

      if (formData.imageFile instanceof File) {
        uploadFormData.append("image", formData.imageFile);
      } else if (formData.image) {
        uploadFormData.append("image_url", formData.image);
      }

      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content);
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append("short_description", formData.shortDescription);
      uploadFormData.append("heading", formData.blogTitle);
      uploadFormData.append("type", "blog");
      uploadFormData.append("meta_description", formData.metaDescription);

      const blogData = {
        authorName: formData.authorName || "",
        authorImage: formData.authorImage,
        thumbnailImage: formData.thumbnailImage || "",
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

      uploadFormData.append("blog_data_raw", JSON.stringify(blogData));


      const response = await fetch(`${API_BASE_URL}/blog/update/${blogId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "AI service update failed");
      }

      const data = await response.json();
      toast.success("AI Service updated successfully!");
      router.push("/dashboard/Blog");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update AI service");
      toast.error(error.message || "Failed to update AI service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/Blog");
  };

  if (!initialData) return <div className="p-8">Loading...</div>;

  return (
    <BlogFormsec
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      apiError={error}
    />
  );
}
