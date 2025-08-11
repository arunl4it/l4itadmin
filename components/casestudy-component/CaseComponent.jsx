"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import CaseStudyForm from "@/components/case-study-form/Casestudyform";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Casecomponent() {
  const router = useRouter();
  const { id } = useParams();
  const token = getCookie("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [initialData, setInitialData] = useState(null);
  const[caseId,setCaseid]=useState()

  // Redirect to home if token is missing
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.heading?.trim()) errors.heading = "Heading is required";
    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    if (!formData.metaTitle?.trim()) errors.metaTitle = "Meta title is required";
    if (!formData.metaDescription?.trim())
      errors.metaDescription = "Meta description is required";
    // if (!formData.section2?.heroimageurl?.trim() && !formData.imageFile)
    //   errors.image = "Hero image is required";

    return errors;
  };

  // Fetch case study data
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch case study");
        const data = await res.json();
        // console.log("data",data);
        setCaseid(data.id)
        
        // Parse the blog_data_raw if it exists
        const blogDataRaw = data.blog_data_raw ? JSON.parse(data.blog_data_raw) : {};

        // console.log("blogDataRaw",blogDataRaw);
        
        
        setInitialData({
          ...data,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          short_description:  data.short_description || "",
          heading:data.heading,
          section2: blogDataRaw.section2 || {
            thumbnailImageUrl: "",
            heroimageurl: data.image || "",
          },
          section3: blogDataRaw.section3 || {
            subheading1: "",
            subheading2: "",
            shortSummary: "",
            subimage: "",
          },
          section4: blogDataRaw.section4 || {
            industry: "healthcare",
            authorName: "",
            socialMediaProfiles: [""],
            authorProfilePicture: "",
          },
          section5: blogDataRaw.section5 || {
            overviewDescription: "",
            points: [],
            overviewHeading: "",
          },
          section6: blogDataRaw.section6 || {
            heading: "",
            points: [],
            imageUrl: "",
            description: "",
          },
          section7: blogDataRaw.section7 || {
            heading: "",
            headingDescription: "",
            subheading: "",
            subheadingDescription: "",
            conclusion: "",
          },
          section8: blogDataRaw.section8 || {
            heading: "",
            description: "",
            points: [],
          },
          section9: blogDataRaw.section9 || {
            tools: [],
          },
          section10: blogDataRaw.section10 || {
            heading: "",
            description: "",
            ctaButtonText: "",
            ctaButtonLink: "",
          },
          section11: blogDataRaw.section11 || {
            metaTitle: data.meta_title || "",
            metaDescription: data.meta_description || "",
            slug: data.slug || "",
          }
        });
      } catch (error) {
        console.error("Fetch case study error:", error);
        toast.error("Failed to load case study data");
      }
    };

    if (id) {
      fetchCaseStudy();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError("");

    console.log("formdata", formData);

    // Validate form
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

      // Append image files if they exist
      // if (formData.imageFile) {
      //   uploadFormData.append("image", formData.imageFile);
      // } else if (formData.section2.heroimageurl) {
      //   uploadFormData.append("image_url", formData.section2.heroimageurl);
      // }

      // Append basic fields
      uploadFormData.append("meta_title", formData.metaTitle);
      uploadFormData.append("content", formData.content || "");
      uploadFormData.append("slug", formData.slug);
      uploadFormData.append(
        "short_description",
        formData.shortDescription || ""
      );
      uploadFormData.append("heading", formData.heading);
      uploadFormData.append("type", "case");
      uploadFormData.append("meta_description", formData.metaDescription);

      // Prepare nested case study data
      const caseStudyData = {
        section2: {
          thumbnailImageUrl: formData.section2.thumbnailImageUrl || "",
          heroimageurl: formData.section2.heroimageurl || "",
        },
        section3: {
          subheading1: formData.section3.subheading1 || "",
          subheading2: formData.section3.subheading2 || "",
          shortSummary: formData.section3.shortSummary || "",
          subimage: formData.section3.subimage || "",
        },
        section4: {
          industry: formData.section4.industry || "healthcare",
          authorName: formData.section4.authorName || "",
          socialMediaProfiles: formData.section4.socialMediaProfiles || [""],
          authorProfilePicture: formData.section4.authorProfilePicture || "",
        },
        section5: {
          overviewDescription: formData.section5.overviewDescription || "",
          points: formData.section5.points || [],
          overviewHeading: formData.section5.overviewHeading || "",
        },
        section6: {
          heading: formData.section6.heading || "",
          points: formData.section6.points || [],
          imageUrl: formData.section6.imageUrl || "",
          description: formData.section6.description || "",
        },
        section7: {
          heading: formData.section7.heading || "",
          headingDescription: formData.section7.headingDescription || "",
          subheading: formData.section7.subheading || "",
          subheadingDescription: formData.section7.subheadingDescription || "",
          conclusion: formData.section7.conclusion || "",
        },
        section8: {
          heading: formData.section8.heading || "",
          description: formData.section8.description || "",
          points: formData.section8.points || [],
        },
        section9: {
          tools: formData.section9.tools || [],
        },
        section10: {
          heading: formData.section10.heading || "",
          description: formData.section10.description || "",
          ctaButtonText: formData.section10.ctaButtonText || "",
          ctaButtonLink: formData.section10.ctaButtonLink || "",
        },
        section11: {
          metaTitle: formData.metaTitle || "",
          metaDescription: formData.metaDescription || "",
          slug: formData.slug || "",
        },
      };

      // Stringify the nested case study data
      uploadFormData.append("blog_data_raw", JSON.stringify(caseStudyData));

      const response = await fetch(`${API_BASE_URL}/blog/update/${caseId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData",errorData);
        
        throw new Error(errorData.message || "Case study update failed");
      }

      const data = await response.json();
      console.log("Case study updated successfully:", data);
      toast.success("Case study updated successfully!");
      router.push("/dashboard/CaseStudy");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Failed to update case study");
      toast.error(error.message || "Failed to update case study");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/CaseStudy");
  };

  if (!initialData) return <div className="p-8">Loading...</div>;

  return (
    <CaseStudyForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      errors={formErrors}
      apiError={error}
    />
  );
}