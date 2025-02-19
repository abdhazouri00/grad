import fs from "fs";
import htmlDocx from "html-docx-js";

// HTML content
const html = `
  <h2 style="color: #007bff;">1. Introduction</h2>
    <p><strong>Purpose:</strong> This document outlines the functional and non-functional requirements of the system.</p>

    <h3 style="color: #28a745;">1.1 Scope</h3>
    <p>The system will provide the following key features:</p>
    <ul style="margin-left: 20px;">
        <li>User authentication and authorization</li>
        <li>Real-time data synchronization</li>
        <li>Customizable reporting</li>
    </ul>

    <h3 style="color: #dc3545;">1.2 Key Requirements</h3>
    <ol style="margin-left: 20px;">
        <li>Users must be able to register and log in securely.</li>
        <li>The system must support multiple user roles.</li>
    </ol>
`;

// Async function to generate the docx file
async function generateDocx() {
  // Convert HTML to DOCX Blob
  const docxBlob = htmlDocx.asBlob(html);

  // Convert Blob to ArrayBuffer, and wait for the Promise to resolve
  const arrayBuffer = await docxBlob.arrayBuffer();

  // Convert ArrayBuffer to Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Write the Buffer to a .docx file
  fs.writeFileSync("output4.docx", buffer);
  console.log("File saved as output.docx");
}

// Call the function to generate the file
generateDocx().catch(console.error);
