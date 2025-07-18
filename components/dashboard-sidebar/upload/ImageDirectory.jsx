"use client";
import { useState, useEffect } from "react";
import {
  ClipboardDocumentIcon,
  TrashIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { getCookie } from "cookies-next";
import { logout } from "@/app/lib/actions/auth";

export default function ImageDirectory() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const token = getCookie("token");

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CREATE_URL}/img`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch images:", errorData);
        return;
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${process.env.NEXT_PUBLIC_CREATE_URL}/img`, true);

      // Add authorization header
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      };
      xhr.onload = () => {
        setIsUploading(false);
        console.log("status ", xhr.status);

        if (xhr.status === 201) {
          // Success case
          setSelectedFile(null);
          fetchImages();
          //   document.getElementById("file-input").value = "";
        } else {
          // Error case
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            console.error(
              "Upload failed:",
              errorResponse.message || errorResponse
            );
          } catch (e) {
            console.error(
              "Upload failed with status:",
              xhr.status,
              "Response:",
              xhr.responseText
            );
          }
        }
      };

      xhr.onerror = () => {
        console.error("Upload error");
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    // console.log("id",id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CREATE_URL}/img/delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // setImages(images.filter((img) => img.id !== id));
        fetchImages();
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Image Directory</h2>

      {/* Upload Section */}
      <div className="mb-8 p-4 border border-dashed border-gray-300 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="block">
            <span className="sr-only">Choose image</span>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            {isUploading ? `Uploading... ${uploadProgress}%` : "Upload"}
          </button>
        </div>

        <p className="mt-2 ml-1.5 text-sm text-gray-600">
          Possible formats : ( jpeg , jpg , png , webp)
        </p>
      </div>

      {/* Image List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Uploaded Images</h3>

        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={image.image}
                    alt={`Uploaded ${image.id}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-3 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500 truncate">
                      ID: {image.id}
                    </span>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete image"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={image.image || ""}
                      readOnly
                      className="flex-1 text-xs p-2 border rounded-l-md bg-gray-100 truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(image.image, image.id)}
                      className={`p-2 rounded-r-md transition-colors ${
                        copiedId === image.id
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                      title="Copy URL"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                    </button>
                  </div>
                  {copiedId === image.id && (
                    <span className="text-xs text-green-600 mt-1 block">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
