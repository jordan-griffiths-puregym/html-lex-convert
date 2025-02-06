import React, { useState } from "react";
import "./index.css";

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  const handleConvert = async () => {
    try {
      console.log("converting");
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-convert-key": "12345",
        },
        body: JSON.stringify({ htmlString: inputText, fieldName: "content" }),
      });

      console.log(response.status);

      const data = await response.json();

      setOutputText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setOutputText("An error occurred while converting the text.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-8">
      {/* Outer container with increased max width */}
      <div className="max-w-[95rem] mx-auto px-4">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          HTML to Lexical Converter
        </h1>

        {/* Welcome Message */}
        <p className="text-lg text-center text-gray-600 mb-5">
          Welcome to the HTML to Lexical Converter! Paste your HTML content in
          the input box, click "Convert," and see the transformed Lexical output
          in the box on the right.
        </p>

        {/* Convert Button */}
        <div className="text-center">
          <button
            className="bg-teal-600 text-white py-3 px-5 rounded-lg text-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 hover:cursor-pointer"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>

        {/* Input and Output Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Input Text Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">HTML</h2>
            <textarea
              className="w-full min-h-[750px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              rows={20}
              placeholder="Enter HTML content to convert..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Output Text Box */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Lexical (JSON)
            </h2>
            <textarea
              className="w-full min-h-[750px] p-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              rows={20}
              placeholder="Lexical output will appear here..."
              value={outputText}
              readOnly
            />
            <button
              className="absolute top-4 right-4 text-sm text-gray-400 bg-gray-100 border border-gray-300 rounded px-2 py-1 hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
