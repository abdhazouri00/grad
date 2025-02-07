// import React, { useState } from "react";
// import * as mammoth from "mammoth";

// function View() {
//   const [htmlContent, setHtmlContent] = useState("");

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const arrayBuffer = await file.arrayBuffer();
//         const result = await mammoth.convertToHtml(
//           { arrayBuffer },
//           {
//             styleMap: [
//               "p[style-name='Normal (Web)'] => p", // Map "Normal (Web)" to a standard paragraph
//             ],
//           }
//         );

//         // Set the converted HTML content
//         setHtmlContent(result.value);

//         // Log messages (e.g., warnings)
//         result.messages.forEach((message) => {
//           console.log(message.message);
//         });
//       } catch (error) {
//         console.error("Error converting file:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Convert DOCX to HTML</h1>
//       <input type="file" accept=".docx" onChange={handleFileChange} />
//       <div
//         style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//       />
//     </div>
//   );
// }

// export default View;


import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function View() {
  return <Viewer fileUrl="/output3.pdf" />;
}

export default View;
