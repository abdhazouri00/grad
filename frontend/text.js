import fs from "fs";
import htmlDocx from "html-docx-js";

// HTML content
const html = `
  <h1 style="text-align: center;">FUK WORK PLEASE</h1>
  <p><strong>The system</strong> must be intuitive and efficient.</p>
  <h2>Functional Requirements</h2>
  <ul>
    <li>Create, edit, and delete tasks</li>
    <li>Assign due dates and priorities</li>
  </ul>
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
  fs.writeFileSync("output3.docx", buffer);
  console.log("File saved as output.docx");
}

// Call the function to generate the file
generateDocx().catch(console.error);
