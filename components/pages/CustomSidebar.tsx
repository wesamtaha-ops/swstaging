import React from "react";

const CustomSidebar = () => {
  const tools = [
    { icon: "🔘", title: "Radio Button Group" },
    { icon: "✅", title: "Checkbox" },
    { icon: "🔽", title: "Dropdown" },
    { icon: "📂", title: "File Upload" },
    { icon: "⭐", title: "Rating Scale" },
  ];

  return (
    <div className="bg-white border-r border-gray-300 w-64 p-4 shadow-md h-screen">
      <h3 className="text-lg font-almarai text-gray-700 mb-4">
        Question Types
      </h3>
      {tools.map((tool, index) => (
        <div
          key={index}
          className="flex items-center p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition"
        >
          <span className="text-lg mr-3">{tool.icon}</span>
          <span className="text-gray-800">{tool.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomSidebar;
