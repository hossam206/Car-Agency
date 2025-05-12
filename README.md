# Car Agency 

A car management system — Used to store and manage car data in a MongoDB database. Each car has its own detailed
PDF generated dynamically based on its information. The PDF includes a unique QR code that, when scanned,
links to a live webpage showing the car’s data directly from the site, verifying its authenticity and presence on the platform.

## User Api Docs For Preview
https://car-agency-jhyu.onrender.com/api-docs/user/

## Car Api Docs For Preview
https://car-agency-jhyu.onrender.com/api-docs/car/

##Screenshot
![user](https://github.com/user-attachments/assets/e30f0322-a517-4a8a-acdd-495cbe161108)
![car](https://github.com/user-attachments/assets/042a9f46-935e-42f1-b986-578c88300f79)

## Technologies Used
 - Backend: Node.js, Express.js (for building scalable backend services)
 - Database: MongoDB with Mongoose (for storing car data, admin info, and related entities)
 - Authentication: JWT (for secure and efficient admin authentication)
 - Authorization: Role-based access control (Admin roles only)
 - PDF Generation: pdf-lib (for generating car PDF certificates)
 - QR Code: qrcode, node-canvas (for generating and embedding QR codes in PDF)
 - Encryption: crypto (custom lightweight encryption for encoding tokens in QR)
 - Frontend: React.js (for admin interface and viewing car info)
 - Deployment: Nginx (for reverse proxy), VPS (GoDaddy-hosted Linux server)
 - API Design: RESTful API (for car and auth endpoints)
 - Documentation: Swagger (for documenting the backend APIs)
