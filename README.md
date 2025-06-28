# PrepWise

**Practice job interviews with AI** - An intelligent interview preparation platform that helps you ace your next job interview.

## 🚀 Features

- **AI-Powered Interview Practice** - Practice with realistic interview scenarios
- **Authentication System** - Secure sign-up and sign-in functionality
- **Modern UI/UX** - Built with shadcn/ui components and Tailwind CSS
- **Form Validation** - Robust form handling with React Hook Form and Zod
- **Dark Theme** - Beautiful dark mode interface
- **Responsive Design** - Works seamlessly across all devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: React Hook Form with Zod validation
- **Font**: Mona Sans
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prepwise
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Sign in page
│   │   └── sign-up/       # Sign up page
│   ├── (root)/            # Main application routes
│   ├── globals.css        # Global styles and design tokens
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── AuthForm.tsx      # Authentication form component
│   └── FormField.tsx     # Custom form field component
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

## 🎨 Design System

The application uses a custom design system with:
- **Colors**: Custom color palette with primary, secondary, and accent colors
- **Typography**: Mona Sans font family
- **Components**: Consistent UI components built with shadcn/ui
- **Dark Theme**: Optimized for dark mode experience

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 📝 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PROJECT_TITLE="PrepWise"
NEXT_PROJECT_DESCRIPTION="Practice job interviews with AI"
```

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
