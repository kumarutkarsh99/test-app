import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadForm = () => {
  const [textValue, setTextValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!textValue.trim()) {
      alert("Please enter some text.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("input_type", "text");
    formData.append("text", textValue);

    try {
      const response = await fetch("https://test-app-2-2.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error analyzing data.");

      const result = await response.json();
      console.log(result);

      localStorage.setItem("analysisResults", JSON.stringify(result));

      window.location.href = "/results";
    } catch (error) {
      console.error(error);
      alert("Failed to analyze data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="uploadform p-5">
      <div className="uformbox m-2 p-4">
        <h3 className="mb-3 text-center">Upload Text</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Enter Text</label>
            <textarea
              className="form-control"
              rows="3"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Enter text"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? "Wait a minute!" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
