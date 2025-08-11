"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function CaseStudyForm({
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
    heading: "",
    image: "",

    section2: {
      thumbnailImageUrl: "",
      heroimageurl: "",
    },
    section3: {
      subheading1: "",
      subheading2: "",
      shortSummary: "",
      subimage:"",
    },
    section4: {
      industry: "healthcare",
      authorName: "",
      socialMediaProfiles: [""],
      authorProfilePicture: "",
    },
    section5: {
      overviewDescription: "",
      points: [],
      overviewHeading: "",
    },
    section6: {
      heading: "",
      points: [],
      imageUrl: "",
      description: "",
    },
    section7: {
      heading: "",
      headingDescription: "",
      subheading: "",
      subheadingDescription: "",
      conclusion: "",
    },
    section8: {
      heading: "",
      description: "",
      points: [],
    },
    section9: {
      tools: [],
    },
    section10: {
      heading: "",
      description: "",
      ctaButtonText: "",
      ctaButtonLink: "",
    },
    section11: {
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
  });

  console.log("initialData",initialData);
  
  useEffect(() => {
    if (isEditing && initialData) {
      // Parse the blog_data_raw if it exists and is a string
      const blogData = initialData.blog_data_raw 
        ? typeof initialData.blog_data_raw === 'string'
          ? JSON.parse(initialData.blog_data_raw)
          : initialData.blog_data_raw
        : {};
      
      // Map the initial data to your form structure
      setFormData({
        metaTitle: initialData.meta_title || "",
        metaDescription: initialData.meta_description || "",
        slug: initialData.slug || "",
        heading: initialData.heading || "",
        image: initialData.image || "",
        section2: {
          thumbnailImageUrl: blogData.section2?.thumbnailImageUrl || "",
          heroimageurl: blogData.section2?.heroimageurl || "",
        },
        section3: {
          subheading1: blogData.section3?.subheading1 || "",
          subheading2: blogData.section3?.subheading2 || "",
          shortSummary: blogData.section3?.shortSummary || "",
          subimage: blogData.section3?.subimage || "",
        },
        section4: {
          industry: blogData.section4?.industry || "healthcare",
          authorName: blogData.section4?.authorName || "",
          socialMediaProfiles: blogData.section4?.socialMediaProfiles || [""],
          authorProfilePicture: blogData.section4?.authorProfilePicture || "",
        },
        section5: {
          overviewDescription: blogData.section5?.overviewDescription || "",
          points: blogData.section5?.points || [],
          overviewHeading: blogData.section5?.overviewHeading || "",
        },
        section6: {
          heading: blogData.section6?.heading || "",
          points: blogData.section6?.points || [],
          imageUrl: blogData.section6?.imageUrl || "",
          description: blogData.section6?.description || "",
        },
        section7: {
          heading: blogData.section7?.heading || "",
          headingDescription: blogData.section7?.headingDescription || "",
          subheading: blogData.section7?.subheading || "",
          subheadingDescription: blogData.section7?.subheadingDescription || "",
          conclusion: blogData.section7?.conclusion || "",
        },
        section8: {
          heading: blogData.section8?.heading || "",
          description: blogData.section8?.description || "",
          points: blogData.section8?.points || [],
        },
        section9: {
          tools: blogData.section9?.tools || [],
        },
        section10: {
          heading: blogData.section10?.heading || "",
          description: blogData.section10?.description || "",
          ctaButtonText: blogData.section10?.ctaButtonText || "",
          ctaButtonLink: blogData.section10?.ctaButtonLink || "",
        },
      });
    }
  }, [initialData, isEditing]);
  // console.log("form data", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addSocialMediaProfile = () => {
    setFormData((prev) => ({
      ...prev,
      section4: {
        ...prev.section4,
        socialMediaProfiles: [...prev.section4.socialMediaProfiles, ""],
      },
    }));
  };

  const removeSocialMediaProfile = (index) => {
    const updatedProfiles = formData.section4.socialMediaProfiles.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      section4: {
        ...prev.section4,
        socialMediaProfiles: updatedProfiles,
      },
    }));
  };

  const handleSocialMediaProfileChange = (index, value) => {
    const updatedProfiles = [...formData.section4.socialMediaProfiles];
    updatedProfiles[index] = value;
    setFormData((prev) => ({
      ...prev,
      section4: {
        ...prev.section4,
        socialMediaProfiles: updatedProfiles,
      },
    }));
  };

  const addOverviewPoint = () => {
    setFormData((prev) => ({
      ...prev,
      section5: {
        ...prev.section5,
        points: [
          ...prev.section5.points,
          {
            point: "",
            description: "",
          },
        ],
      },
    }));
  };

  const removeOverviewPoint = (index) => {
    const updatedPoints = formData.section5.points.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      section5: {
        ...prev.section5,
        points: updatedPoints,
      },
    }));
  };

  const addChallengePoint = () => {
    setFormData((prev) => ({
      ...prev,
      section6: {
        ...prev.section6,
        points: [
          ...prev.section6.points,
          {
            point: "",
            description: "",
          },
        ],
      },
    }));
  };

  const removeChallengePoint = (index) => {
    const updatedPoints = formData.section6.points.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      section6: {
        ...prev.section6,
        points: updatedPoints,
      },
    }));
  };

  const addResultPoint = () => {
    setFormData((prev) => ({
      ...prev,
      section8: {
        ...prev.section8,
        points: [
          ...prev.section8.points,
          {
            point: "",
            iconUrl: "",
          },
        ],
      },
    }));
  };

  const removeResultPoint = (index) => {
    const updatedPoints = formData.section8.points.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      section8: {
        ...prev.section8,
        points: updatedPoints,
      },
    }));
  };

  const addTool = () => {
    setFormData((prev) => ({
      ...prev,
      section9: {
        ...prev.section9,
        tools: [
          ...prev.section9.tools,
          {
            name: "",
            imageUrl: "",
          },
        ],
      },
    }));
  };

  const removeTool = (index) => {
    const updatedTools = formData.section9.tools.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      section9: {
        ...prev.section9,
        tools: updatedTools,
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Case Study" : "Create New Case Study"}
        </h1>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Section 1 - Heading */}
          <div className="space-y-2 mb-4 p-6 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700">
              Main Title
            </label>
            <Input
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Enter main service title"
              className="border-gray-300 p-4 text-gray-600 mt-1"
            />
            {errors.heading && (
              <p className="text-sm text-red-500">{errors.heading}</p>
            )}
          </div>

          {/* Section 2 - Image */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Image URL
                </label>
                <Input
                  value={formData.section2.heroimageurl}
                  onChange={(e) =>
                    handleSectionChange(
                      "section2",
                      "heroimageurl",
                      e.target.value
                    )
                  }
                  placeholder="Enter hero image URL"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image URL
                </label>
                <Input
                  value={formData.section2.thumbnailImageUrl}
                  onChange={(e) =>
                    handleSectionChange(
                      "section2",
                      "thumbnailImageUrl",
                      e.target.value
                    )
                  }
                  placeholder="Enter thumbnail image URL"
                  className="border-gray-300 p-4"
                />
              </div>
            </div>
          </div>

          {/* Section 3 - Short Description */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 3 - Short Description
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  heading
                </label>
                <Input
                  value={formData.section3.subheading1}
                  onChange={(e) =>
                    handleSectionChange(
                      "section3",
                      "subheading1",
                      e.target.value
                    )
                  }
                  placeholder="Enter first subheading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <Input
                  value={formData.section3.subheading2}
                  onChange={(e) =>
                    handleSectionChange(
                      "section3",
                      "subheading2",
                      e.target.value
                    )
                  }
                  placeholder="Enter second subheading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  image url
                </label>
                <Input
                  value={formData.section3.subimage}
                  onChange={(e) =>
                    handleSectionChange(
                      "section3",
                      "subimage",
                      e.target.value
                    )
                  }
                  placeholder="Enter image url"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Summary
                </label>
                <Textarea
                  value={formData.section3.shortSummary}
                  onChange={(e) =>
                    handleSectionChange(
                      "section3",
                      "shortSummary",
                      e.target.value
                    )
                  }
                  placeholder="Enter short summary"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Section 4 - Author */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Section 4 - Author</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.section4.industry}
                  onChange={(e) =>
                    handleSectionChange("section4", "industry", e.target.value)
                  }
                  className="border-gray-300 p-4 w-full rounded-md border"
                >
                  <option value="healthcare">Healthcare</option>
                  <option value="legal">Legal</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name 
                </label>
                <Input
                  value={formData.section4.authorName}
                  onChange={(e) =>
                    handleSectionChange(
                      "section4",
                      "authorName",
                      e.target.value
                    )
                  }
                  placeholder="Enter author name"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media Profiles
                </label>
                {formData.section4.socialMediaProfiles.map((profile, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={profile}
                      onChange={(e) =>
                        handleSocialMediaProfileChange(index, e.target.value)
                      }
                      placeholder="Enter social media profile URL"
                      className="border-gray-300 p-4 flex-1"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSocialMediaProfile(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSocialMediaProfile}
                  className="mt-2"
                >
                  <Plus size={16} className="mr-2" />
                  Add Social Media Profile
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Profile Picture URL
                </label>
                <Input
                  value={formData.section4.authorProfilePicture}
                  onChange={(e) =>
                    handleSectionChange(
                      "section4",
                      "authorProfilePicture",
                      e.target.value
                    )
                  }
                  placeholder="Enter author profile picture URL"
                  className="border-gray-300 p-4"
                />
              </div>
            </div>
          </div>

          {/* Section 5 - Overview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Section 5 - Overview</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview Heading
                </label>
                <Input
                  value={formData.section5.overviewHeading}
                  onChange={(e) =>
                    handleSectionChange(
                      "section5",
                      "overviewHeading",
                      e.target.value
                    )
                  }
                  placeholder="Enter overview heading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview Description
                </label>
                <Textarea
                  value={formData.section5.overviewDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "section5",
                      "overviewDescription",
                      e.target.value
                    )
                  }
                  placeholder="Enter overview description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview Points
                </label>
                {formData.section5.points.map((point, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Point {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeOverviewPoint(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={point.point}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section5.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            point: e.target.value,
                          };
                          handleSectionChange(
                            "section5",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter point text"
                        className="border-gray-300 p-3"
                      />
                      <Textarea
                        value={point.description}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section5.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            description: e.target.value,
                          };
                          handleSectionChange(
                            "section5",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter point description"
                        className="border-gray-300 p-3 min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOverviewPoint}
                  className="mt-2"
                >
                  <Plus size={16} className="mr-2" />
                  Add Overview Point
                </Button>
              </div>
            </div>
          </div>

          {/* Section 6 - Key Challenges */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 6 - Key Challenges
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <Input
                  value={formData.section6.heading}
                  onChange={(e) =>
                    handleSectionChange("section6", "heading", e.target.value)
                  }
                  placeholder="Enter challenges heading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.section6.description}
                  onChange={(e) =>
                    handleSectionChange(
                      "section6",
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter challenges description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Points
                </label>
                {formData.section6.points.map((point, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Point {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeChallengePoint(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={point.point}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section6.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            point: e.target.value,
                          };
                          handleSectionChange(
                            "section6",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter challenge point"
                        className="border-gray-300 p-3"
                      />
                      <Textarea
                        value={point.description}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section6.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            description: e.target.value,
                          };
                          handleSectionChange(
                            "section6",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter challenge description"
                        className="border-gray-300 p-3 min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addChallengePoint}
                  className="mt-2"
                >
                  <Plus size={16} className="mr-2" />
                  Add Challenge Point
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <Input
                  value={formData.section6.imageUrl}
                  onChange={(e) =>
                    handleSectionChange("section6", "imageUrl", e.target.value)
                  }
                  placeholder="Enter image URL"
                  className="border-gray-300 p-4"
                />
              </div>
            </div>
          </div>

          {/* Section 7 - Our Approach */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 7 - Our Approach
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <Input
                  value={formData.section7.heading}
                  onChange={(e) =>
                    handleSectionChange("section7", "heading", e.target.value)
                  }
                  placeholder="Enter approach heading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading Description
                </label>
                <Textarea
                  value={formData.section7.headingDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "section7",
                      "headingDescription",
                      e.target.value
                    )
                  }
                  placeholder="Enter approach description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <Input
                  value={formData.section7.subheading}
                  onChange={(e) =>
                    handleSectionChange(
                      "section7",
                      "subheading",
                      e.target.value
                    )
                  }
                  placeholder="Enter approach subheading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading Description
                </label>
                <Textarea
                  value={formData.section7.subheadingDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      "section7",
                      "subheadingDescription",
                      e.target.value
                    )
                  }
                  placeholder="Enter subheading description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conclusion Paragraph
                </label>
                <Textarea
                  value={formData.section7.conclusion}
                  onChange={(e) =>
                    handleSectionChange(
                      "section7",
                      "conclusion",
                      e.target.value
                    )
                  }
                  placeholder="Enter conclusion paragraph"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Section 8 - Results */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Section 8 - Results</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <Input
                  value={formData.section8.heading}
                  onChange={(e) =>
                    handleSectionChange("section8", "heading", e.target.value)
                  }
                  placeholder="Enter results heading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.section8.description}
                  onChange={(e) =>
                    handleSectionChange(
                      "section8",
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter results description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Result Points
                </label>
                {formData.section8.points.map((point, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Point {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeResultPoint(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={point.point}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section8.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            point: e.target.value,
                          };
                          handleSectionChange(
                            "section8",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter result point"
                        className="border-gray-300 p-3"
                      />
                      <Input
                        value={point.iconUrl}
                        onChange={(e) => {
                          const updatedPoints = [...formData.section8.points];
                          updatedPoints[index] = {
                            ...updatedPoints[index],
                            iconUrl: e.target.value,
                          };
                          handleSectionChange(
                            "section8",
                            "points",
                            updatedPoints
                          );
                        }}
                        placeholder="Enter icon image URL"
                        className="border-gray-300 p-3"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addResultPoint}
                  className="mt-2"
                >
                  <Plus size={16} className="mr-2" />
                  Add Result Point
                </Button>
              </div>
            </div>
          </div>

          {/* Section 9 - Tools */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Section 9 - Tools</h2>
            <div className="space-y-4">
              {formData.section9.tools.map((tool, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Tool {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={tool.name}
                      onChange={(e) => {
                        const updatedTools = [...formData.section9.tools];
                        updatedTools[index] = {
                          ...updatedTools[index],
                          name: e.target.value,
                        };
                        handleSectionChange("section9", "tools", updatedTools);
                      }}
                      placeholder="Enter tool name"
                      className="border-gray-300 p-3"
                    />
                    <Input
                      value={tool.imageUrl}
                      onChange={(e) => {
                        const updatedTools = [...formData.section9.tools];
                        updatedTools[index] = {
                          ...updatedTools[index],
                          imageUrl: e.target.value,
                        };
                        handleSectionChange("section9", "tools", updatedTools);
                      }}
                      placeholder="Enter tool image URL"
                      className="border-gray-300 p-3"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addTool}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Tool
              </Button>
            </div>
          </div>

          {/* Section 10 - CTA */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Section 10 - Call to Action
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <Input
                  value={formData.section10.heading}
                  onChange={(e) =>
                    handleSectionChange("section10", "heading", e.target.value)
                  }
                  placeholder="Enter CTA heading"
                  className="border-gray-300 p-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.section10.description}
                  onChange={(e) =>
                    handleSectionChange(
                      "section10",
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter CTA description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Button Text
                  </label>
                  <Input
                    value={formData.section10.ctaButtonText}
                    onChange={(e) =>
                      handleSectionChange(
                        "section10",
                        "ctaButtonText",
                        e.target.value
                      )
                    }
                    placeholder="Enter button text"
                    className="border-gray-300 p-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Button Link
                  </label>
                  <Input
                    value={formData.section10.ctaButtonLink}
                    onChange={(e) =>
                      handleSectionChange(
                        "section10",
                        "ctaButtonLink",
                        e.target.value
                      )
                    }
                    placeholder="Enter button link URL"
                    className="border-gray-300 p-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 11 - SEO */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Section 11 - SEO</h2>
            <div className="space-y-4">
              <div className="space-y-2 mb-4  bg-gray-50">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <Input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="Enter meta title"
                  className="border-gray-300 p-4 text-gray-600 mt-1"
                />
                {errors.metaTitle && (
                  <p className="text-sm text-red-500">{errors.metaTitle}</p>
                )}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description (S11.2)
                </label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Enter meta description"
                  className="border-gray-300 p-4 min-h-[100px]"
                />
              </div> */}
              <div className="space-y-2 mb-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700">
                  Meta description
                </label>
                <Input
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Enter meta description"
                  className="border-gray-300 p-4 text-gray-600 mt-1"
                />
                {errors.metaDescription && (
                  <p className="text-sm text-red-500">
                    {errors.metaDescription}
                  </p>
                )}
              </div>
              <div className="space-y-2 mb-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Enter meta description"
                  className="border-gray-300 p-4 text-gray-600 mt-1"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">
                    {errors.slug}
                  </p>
                )}
              </div>
            </div>
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
                ? "Update Case Study"
                : "Create Case Study"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
