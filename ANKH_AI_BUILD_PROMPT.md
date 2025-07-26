# Build Ankh.ai - Complete Self-Discovery Platform

Create a comprehensive self-discovery and wellness web application called **Ankh.ai** using Next.js 14, TypeScript, and modern web technologies. This is a premium AI-powered platform for personal growth, emotional healing, and psychological insights.

## 🎯 Core Concept
Ankh.ai is a sophisticated wellness platform that uses AI to help users understand their inner world through journaling, dream analysis, emotional tracking, and psychological profiling. The app follows a "sacred journey" theme with five stages of healing: Awakening, Descent, Purification, Integration, and Embodiment.

## 🛠️ Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Database**: Prisma with SQLite (for development)
- **Authentication**: NextAuth.js with credentials provider
- **AI Integration**: OpenAI GPT-4 for analysis and insights
- **Payments**: Stripe integration for premium features
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks and context
- **Icons**: Lucide React icons

## 🎨 Design System
- **Theme**: Dark, mystical aesthetic with purple/indigo accents
- **Typography**: Clean, modern fonts with proper hierarchy
- **Colors**: Black background, white text, purple/indigo highlights
- **Layout**: Responsive grid system with sidebar navigation
- **Animations**: Subtle hover effects and transitions

## 📱 Core Features & Pages

### 1. Landing Page (`/`)
- Hero section with "Decode Your Inner World with AI" tagline
- Five Sacred Stages of Healing visualization
- AI Analysis showcase
- Call-to-action buttons for sign up/sign in

### 2. Authentication System
- **Sign In** (`/auth/signin`): Email/password login with error handling
- **Sign Up** (`/auth/signup`): User registration with validation
- **NextAuth.js** integration with session management

### 3. Dashboard (`/dashboard`)
- Welcome message with user's first name
- Grid of feature cards for all main tools
- Recent activity section showing latest journal entries
- Responsive layout with sidebar navigation

### 4. Sacred Journal (`/dashboard/sacred-journal`)
- Create, edit, and view journal entries
- Rich text editor for content
- Entry listing with timestamps
- Individual entry view pages
- AI-powered insights on journal content

### 5. Dream Journal (`/dashboard/dreams`)
- Log dreams with title and content
- AI dream interpretation using GPT-4
- Dream pattern analysis
- Dream entry management

### 6. Future Self Letters (`/dashboard/letters`)
- Write letters to future self
- AI-generated responses from "future self"
- Letter scheduling and management
- Emotional healing through self-reflection

### 7. Soul Quest (`/dashboard/quest`)
- AI-generated personalized quests
- Gamification with XP system
- Weekly quest themes (Mindfulness, Emotional Awareness, etc.)
- Quest completion tracking

### 8. Therapy Companion (`/dashboard/therapy`)
- AI-powered therapy chat interface
- Streaming responses using AI SDK
- Compassionate, non-judgmental AI therapist
- CBT and mindfulness techniques integration

### 9. Mirror Matches (`/dashboard/matches`)
- AI analysis of user profile to find historical/fictional matches
- Character recommendations based on values and archetypes
- Profile sharing functionality

### 10. Media Vault (`/dashboard/media`)
- AI-curated media recommendations
- Books, podcasts, music suggestions
- Personalized based on user's emotional state and values

### 11. Emotion Analysis (`/dashboard/mood`)
- Daily mood tracking (1-10 scale)
- Mood pattern analysis over time
- AI insights on emotional trends
- Mood visualization charts

### 12. Values Discovery (`/dashboard/values`)
- AI analysis of journal entries to identify core values
- Values-based activity recommendations
- Personal values profile

### 13. Archetype Mapping (`/dashboard/archetypes`)
- Psychological archetype analysis
- Jungian archetype identification
- Archetype-based insights

### 14. Psychometric Profile (`/dashboard/profiling`)
- Comprehensive personality analysis
- Psychological trait assessment
- Detailed profile reports

### 15. Billing & Subscription (`/dashboard/billing`)
- Stripe integration for payments
- Subscription management
- Payment history
- Upgrade/downgrade functionality

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js routes

### Journal & Content
- `GET/POST /api/journal` - Sacred journal entries
- `GET/POST /api/sacred-journal` - Sacred journal management
- `GET/POST /api/dreams` - Dream journal entries
- `POST /api/dreams/interpret` - AI dream interpretation
- `GET/POST /api/letters` - Future self letters

### AI Analysis
- `POST /api/analyze` - General content analysis
- `POST /api/emotion` - Emotional analysis
- `POST /api/values/analyze` - Values analysis
- `POST /api/values/recommend` - Values-based recommendations
- `POST /api/profiling/analyze` - Psychometric profiling
- `POST /api/mood/analyze` - Mood pattern analysis
- `POST /api/archetypes/analyze` - Archetype analysis

### Wellness Features
- `POST /api/therapy/companion` - Therapy chat
- `POST /api/companion` - General AI companion
- `POST /api/healing` - Healing exercises
- `POST /api/forgiveness` - Forgiveness exercises
- `POST /api/space` - Guided meditations
- `POST /api/quest` - Soul quest generation
- `POST /api/community` - Community content

### User & Profile
- `GET /api/user/values` - User values management
- `GET /api/profile/[id]` - Public profile sharing
- `GET /api/matches` - Mirror matches generation
- `GET /api/media/recommendations` - Media recommendations

### Payments
- `POST /api/stripe/checkout-sessions` - Stripe checkout
- `POST /api/stripe/create-portal-session` - Customer portal
- `POST /api/stripe/webhooks` - Stripe webhooks

## 🗄️ Database Schema (Prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id                    String    @id @default(cuid())
  name                  String?
  email                 String?   @unique
  emailVerified         DateTime?
  image                 String?
  password              String?
  accounts              Account[]
  sessions              Session[]
  journalEntries        JournalEntry[]
  dreamEntries          DreamEntry[]
  moods                 Mood[]
  values                String? // JSON string
  archetypes            String? // JSON string
  psychometricProfile   String? // JSON string
  stripeCustomerId      String?   @unique
  stripeSubscriptionId  String?   @unique
  stripePriceId         String?
  stripeCurrentPeriodEnd DateTime?
  futureSelfLetters     FutureSelfLetter[]
  moodEntries           MoodEntry[]
  mirrorMessages        MirrorMessage[]
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model JournalEntry {
  id        String   @id @default(cuid())
  title     String
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model DreamEntry {
  id             String   @id @default(cuid())
  title          String
  content        String
  interpretation String?
  userId         String
  user           User     @relation(fields: [userId], references: [id])
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model FutureSelfLetter {
  id        String   @id @default(cuid())
  title     String
  content   String
  response  String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Mood {
  id        String   @id @default(cuid())
  rating    Int
  notes     String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model MoodEntry {
  id        String   @id @default(cuid())
  rating    Int
  notes     String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model MirrorMessage {
  id        String   @id @default(cuid())
  message   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  matched   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🧩 UI Components

### Core Components
- **AnkhIcon**: Custom ankh symbol icon
- **Header**: Dashboard header with user menu
- **Sidebar**: Navigation sidebar with all feature links
- **Card**: Reusable card components with dark theme
- **Button**: Styled button variants (primary, secondary, ghost)
- **Input/Textarea**: Form inputs with validation states
- **Badge**: Status and category badges
- **Avatar**: User profile images with fallbacks
- **Progress**: Progress indicators for quests and goals
- **Tabs**: Tab navigation for content organization
- **Sheet**: Slide-out panels for mobile navigation
- **Dropdown**: Dropdown menus for user actions
- **Dialog**: Modal dialogs for confirmations

### Dashboard Components
- **MoodChart**: Mood tracking visualization with charts
- **MoodEmoji**: Mood emoji indicators (😢 😐 😊)
- **RedditFeed**: Community content feed integration
- **MediaHub**: Media recommendations carousel
- **ContentCreation**: AI content generation interface
- **Billing**: Subscription management interface
- **JournalCard**: Journal entry preview cards
- **DreamCard**: Dream entry preview cards
- **QuestCard**: Active quest display cards

### Sacred Stages Components
- **StageCard**: Individual healing stage visualization
- **StageProgress**: Progress tracking through stages
- **StageInsights**: AI insights for each stage

## 🔐 Environment Variables

```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OpenAI
OPENAI_API_KEY=your-openai-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
STRIPE_PRICE_ID=your-price-id

# Database
DATABASE_URL="file:./dev.db"

# Optional
REDIS_URL=your-redis-url
RESEND_API_KEY=your-resend-key
```

## 🔧 Key Implementation Details

### AI Integration
- Use OpenAI GPT-4 for all analysis features
- Implement streaming responses for chat features using Vercel AI SDK
- Structured JSON responses for data analysis
- Error handling for API rate limits and failures
- Context-aware prompts for personalized insights

### Authentication Flow
- NextAuth.js with credentials provider
- bcrypt for password hashing and validation
- JWT tokens for session management
- Protected routes with middleware
- Role-based access control for premium features

### Payment Integration
- Stripe checkout sessions for subscriptions
- Webhook handling for payment events (subscription created, updated, canceled)
- Customer portal for subscription management
- Premium feature gating based on subscription status
- Usage tracking and limits

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Sidebar collapses to bottom navigation on mobile
- Touch-friendly interactions and gestures
- Optimized for all screen sizes (320px to 4K)
- Progressive Web App capabilities

### Performance Optimizations
- Server-side rendering for SEO-critical pages
- Client-side streaming for AI responses
- Optimized database queries with Prisma
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Caching strategies for API responses

## 🎯 User Experience Flow

### Onboarding Journey
1. **Landing Page**: Compelling hero with sacred stages visualization
2. **Sign Up**: Simple email/password registration
3. **Welcome**: Personalized welcome with user's name
4. **Feature Discovery**: Guided tour of dashboard features
5. **First Journal Entry**: Encouraged to write first entry
6. **AI Analysis**: Show first AI insights to demonstrate value

### Navigation Patterns
- **Sidebar Navigation**: Always visible on desktop with feature icons
- **Mobile Navigation**: Bottom tab bar with key features
- **Breadcrumb Navigation**: Clear path indication
- **Quick Actions**: Floating action button for new entries
- **Search**: Global search across all user content

### Feedback & Validation
- **Real-time Validation**: Form validation with helpful error messages
- **Loading States**: Skeleton screens and spinners for AI operations
- **Success Confirmations**: Toast notifications for completed actions
- **Error Handling**: User-friendly error messages with recovery options
- **Progress Indicators**: Show progress through multi-step processes

## 🎨 Design Guidelines

### Color Palette
```css
:root {
  --background: 0 0% 0%;           /* Pure black */
  --foreground: 0 0% 100%;         /* Pure white */
  --primary: 262 83% 58%;          /* Purple */
  --primary-foreground: 0 0% 100%; /* White */
  --secondary: 240 5% 15%;         /* Dark gray */
  --accent: 262 83% 58%;           /* Purple accent */
  --muted: 240 5% 10%;             /* Darker gray */
  --border: 240 6% 20%;            /* Border gray */
}
```

### Typography Scale
- **Heading 1**: 2.5rem (40px) - Page titles
- **Heading 2**: 2rem (32px) - Section titles
- **Heading 3**: 1.5rem (24px) - Card titles
- **Body**: 1rem (16px) - Regular text
- **Small**: 0.875rem (14px) - Captions and labels

### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Consistent margins and padding throughout

### Component Styling
- **Cards**: Rounded corners (8px), subtle borders, hover effects
- **Buttons**: Multiple variants (primary, secondary, ghost, destructive)
- **Inputs**: Focus states, error states, disabled states
- **Icons**: Consistent sizing (16px, 20px, 24px)

## 🔒 Security Considerations

### Data Protection
- Input validation and sanitization on all user inputs
- SQL injection prevention with Prisma ORM
- XSS protection with proper escaping
- CSRF protection with NextAuth.js
- Rate limiting on API endpoints (especially AI endpoints)

### Authentication Security
- Secure password hashing with bcrypt (12+ rounds)
- JWT token security with proper expiration
- Session management with secure cookies
- Password strength requirements
- Account lockout after failed attempts

### API Security
- Environment variable protection
- API key rotation policies
- Request/response logging for monitoring
- Error handling that doesn't expose sensitive information
- CORS configuration for production

## 📱 Mobile-First Considerations

### Touch Interactions
- Minimum touch target size of 44px
- Swipe gestures for navigation between entries
- Pull-to-refresh for content updates
- Long press for context menus

### Performance
- Optimized bundle sizes for mobile networks
- Progressive loading of images and content
- Offline capability with service workers
- Push notifications for reminders and insights

### Layout Adaptations
- Sidebar becomes bottom navigation
- Cards stack vertically on mobile
- Text inputs expand to full width
- Modals become full-screen on small devices

## 🚀 Development Workflow

### Project Setup
```bash
npx create-next-app@latest ankh-ai --typescript --tailwind --eslint --app
cd ankh-ai
npm install prisma @prisma/client next-auth bcryptjs
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install stripe @stripe/stripe-js
npm install ai openai
npm install @types/bcryptjs
```

### Database Setup
```bash
npx prisma init
# Add schema to prisma/schema.prisma
npx prisma generate
npx prisma db push
```

### Environment Configuration
1. Copy `.env.example` to `.env.local`
2. Add all required API keys and secrets
3. Configure database connection string

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database browser
- `npx prisma db push` - Push schema changes

## 📊 Analytics & Monitoring

### User Analytics
- Track feature usage and engagement
- Monitor AI API usage and costs
- User journey analysis
- Conversion funnel tracking

### Performance Monitoring
- Core Web Vitals tracking
- API response times
- Database query performance
- Error tracking and alerting

### Business Metrics
- Subscription conversion rates
- Feature adoption rates
- User retention metrics
- Revenue tracking

## 🎯 Launch Strategy

### MVP Features (Phase 1)
1. User authentication and dashboard
2. Sacred journal with AI insights
3. Dream journal with interpretations
4. Basic mood tracking
5. Stripe subscription integration

### Enhanced Features (Phase 2)
1. Therapy companion chat
2. Future self letters
3. Values discovery
4. Archetype mapping
5. Media recommendations

### Advanced Features (Phase 3)
1. Soul quest gamification
2. Mirror matches
3. Community features
4. Advanced analytics
5. Mobile app (React Native)

## 🔄 Maintenance & Updates

### Regular Tasks
- Monitor AI API costs and optimize usage
- Update dependencies and security patches
- Backup database regularly
- Monitor user feedback and feature requests
- A/B test new features and improvements

### Scaling Considerations
- Database migration to PostgreSQL for production
- Redis caching for improved performance
- CDN for static asset delivery
- Load balancing for high traffic
- Microservices architecture for specific features

This comprehensive platform will provide users with a complete self-discovery journey, combining AI-powered insights with traditional wellness practices in a beautiful, intuitive interface that grows with their personal development needs.