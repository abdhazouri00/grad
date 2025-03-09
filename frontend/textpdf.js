import pdf from "html-pdf";
const html = `<div style="padding : 96px"><h2 style="color: #007bff;">1. Introduction</h2>
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
    </ol></div>`;

pdf.create(html).toFile("output5.pdf", (err, res) => {
  if (err) return console.log(err);
  console.log(res); // { filename: '/path/to/output.pdf' }
});
