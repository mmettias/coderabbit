# Ankh.ai - AI-Powered Self-Discovery Platform

A comprehensive self-discovery and wellness web application powered by AI. Journey through the five sacred stages of healing: Awakening, Descent, Purification, Integration, and Embodiment.

## 🌟 Features

### Core Functionality
- **Sacred Journal**: AI-powered journaling with deep insights
- **Dream Analysis**: Record and interpret dreams with AI
- **Future Self Letters**: Write to and receive responses from your future self
- **Therapy Companion**: 24/7 AI emotional support and guidance
- **Mood Tracking**: Monitor emotional patterns over time
- **Values Discovery**: Uncover your core values through AI analysis

### Advanced Features
- **Soul Quest**: Gamified personal growth challenges
- **Mirror Matches**: Find historical/fictional psychological twins
- **Media Vault**: AI-curated books, podcasts, and music
- **Archetype Mapping**: Jungian archetype analysis
- **Psychometric Profiling**: Comprehensive personality assessment
- **Subscription Management**: Stripe-powered premium features

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Database**: Prisma with SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js with credentials provider
- **AI**: OpenAI GPT-4 for analysis and insights
- **Payments**: Stripe integration
- **UI Components**: Radix UI primitives with custom styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional for demo mode)
- Stripe account (optional for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ankh-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual API keys:
   ```env
   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # OpenAI (optional - uses demo mode if not provided)
   OPENAI_API_KEY=your-openai-api-key
   
   # Stripe (optional)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-webhook-secret
   STRIPE_PRICE_ID=your-price-id
   
   # Database
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Getting Started
1. **Sign Up**: Create your account on the landing page
2. **Dashboard**: Explore the feature cards to understand available tools
3. **Sacred Journal**: Start with your first journal entry
4. **AI Analysis**: Get insights on your writing
5. **Explore**: Try other features like dream analysis and mood tracking

### Key Features

#### Sacred Journal
- Write reflective journal entries
- Get AI-powered psychological insights
- Track emotional patterns and themes
- Receive personalized growth suggestions

#### Dream Analysis
- Record your dreams with title and content
- Receive AI interpretations of dream symbolism
- Explore recurring patterns and themes

#### Therapy Companion
- Chat with an AI therapist 24/7
- Get emotional support and guidance
- Practice CBT and mindfulness techniques

#### Mood Tracking
- Rate your daily mood (1-10 scale)
- Add notes about your emotional state
- View patterns and trends over time

## 🎨 Design System

### Color Palette
- **Background**: Pure black (`#000000`)
- **Foreground**: Pure white (`#FFFFFF`)
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Dark gray (`#262626`)
- **Accent**: Purple variations
- **Muted**: Darker grays for subtle elements

### Typography
- **Font**: Inter (clean, modern sans-serif)
- **Scale**: 14px (small) → 16px (body) → 24px (h3) → 32px (h2) → 40px (h1)

### Components
- **Cards**: Rounded corners, subtle borders, hover effects
- **Buttons**: Multiple variants (primary, secondary, ghost, outline)
- **Forms**: Focus states, validation, consistent spacing

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio (database browser)
```

### Project Structure

```
ankh-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/                  # Utilities and configurations
│   └── types/                # TypeScript type definitions
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── README.md
```

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma`
2. **API Routes**: Add endpoints in `src/app/api/`
3. **Pages**: Create new pages in `src/app/dashboard/`
4. **Components**: Add reusable components in `src/components/`
5. **Navigation**: Update sidebar in `src/components/dashboard/sidebar.tsx`

## 🔐 Security Features

- **Authentication**: Secure session management with NextAuth.js
- **Password Hashing**: bcrypt with 12+ rounds
- **Input Validation**: Server-side validation for all user inputs
- **CSRF Protection**: Built-in with NextAuth.js
- **Rate Limiting**: Planned for API endpoints
- **SQL Injection Prevention**: Prisma ORM parameterized queries

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Database**: Migrate to PostgreSQL for production
4. **Deploy**: Automatic deployments on git push

### Environment Variables for Production

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=production-secret-key
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=postgresql://user:password@host:port/database
# ... other production keys
```

### Database Migration

For production, migrate from SQLite to PostgreSQL:

1. Update `DATABASE_URL` in `.env`
2. Change provider in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run migrations:
   ```bash
   npx prisma db push
   ```

## 📊 Monitoring & Analytics

### Built-in Features
- Error logging and handling
- User session tracking
- API response monitoring
- Database query optimization

### Recommended Additions
- **Analytics**: Vercel Analytics or Google Analytics
- **Error Tracking**: Sentry for error monitoring
- **Performance**: Vercel Speed Insights
- **Uptime**: Status page monitoring

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test new features thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 API
- **Vercel** for Next.js framework
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling
- **Prisma** for database management

## 📞 Support

For support, email support@ankh.ai or open an issue on GitHub.

---

**Ankh.ai** - Transforming lives through AI-powered self-discovery. 🌟
