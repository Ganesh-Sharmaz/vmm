# Vishal Mega Mart Security Guard Exam Portal

A satirical web application that parodies competitive exams in India, specifically targeting the security guard position at Vishal Mega Mart. Built with modern web technologies and a focus on user experience.

## 🚀 Features

- Interactive mock tests and practice exams
- Real-time analytics and performance tracking
- Admin dashboard for exam management
- News and updates section
- Results portal with AIR rankings
- PDF generation capabilities
- Responsive design for all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.2
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Firebase
- **Analytics:** Vercel Analytics
- **PDF Generation:** jsPDF & html2canvas
- **Fonts:** Geist (Sans & Mono)

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Firebase account and configuration

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd vmm
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
vmm/
├── app/                # Next.js app directory
│   ├── admin/         # Admin dashboard
│   ├── news/          # News and updates
│   ├── results/       # Results portal
│   ├── exams/         # Exam-related pages
│   └── homepage/      # Homepage components
├── components/        # Reusable React components
├── public/           # Static assets
├── assets/           # Project assets
└── ...
```

## 🔒 Security

- Firebase Authentication for user management
- Secure API routes
- Environment variables for sensitive data
- Input validation and sanitization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- All contributors who have helped shape this project
