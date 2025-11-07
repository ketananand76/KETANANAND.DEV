# Ketan Anand - Professional Portfolio

A fully dynamic, professional-level personal portfolio website built with HTML, CSS, and vanilla JavaScript, featuring a Node.js backend for email functionality and visitor analytics.

## ✨ Features

### 🎨 Frontend Features
- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern Animations** - Scroll-based animations, hover effects, and smooth transitions
- **Multi-Theme System** - Light, Dark, and Custom color themes with localStorage persistence
- **Custom Cursor** - Interactive custom cursor with hover effects
- **Particle Background** - Animated particle system in hero section
- **Typing Animation** - Dynamic typing effect for role descriptions
- **Interactive Navigation** - Sticky navbar with smooth scrolling
- **Project Showcase** - Cards with hover effects and project links
- **Skills Visualization** - Animated progress bars and tool icons
- **Timeline Education** - Animated timeline for education history
- **Certificate Gallery** - Grid layout with hover overlays
- **Contact Forms** - Visitor profile and contact forms with validation
- **Analytics Dashboard** - Real-time visitor statistics and metrics

### 🚀 Backend Features
- **Email Integration** - Direct email sending via Nodemailer
- **Visitor Tracking** - Analytics for visitors, hires, and geographic reach
- **State Tracking** - Unique state visitor counting
- **Form Processing** - Handle contact and visitor profile submissions
- **Admin Endpoints** - Secure admin access for data management
- **Data Persistence** - JSON-based data storage
- **Error Handling** - Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for email functionality)

### Setup Steps

1. **Clone or Download the Project**
   ```bash
   # If you have the project files
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Email Settings**
   
   **Option 1: Environment Variables (Recommended)**
   ```bash
   # Create a .env file
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_KEY=your-secret-admin-key
   ```

   **Option 2: Direct Configuration**
   Edit `server.js` lines 71-72:
   ```javascript
   user: 'your-gmail@gmail.com',
   pass: 'your-app-password'
   ```

4. **Gmail App Password Setup**
   - Go to your [Google Account settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification
   - Generate an App Password for "Mail"
   - Use this app password instead of your regular password

5. **Add Your Images**
   Place your images in the `public/images/` directory:
   - `profile.jpg` - Your profile photo
   - `project1.jpg` to `project6.jpg` - Project screenshots
   - `cert1.jpg` to `cert4.jpg` - Certificate images

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# or
npm start
```

### Production Mode
```bash
NODE_ENV=production npm start
```

The server will start on `http://localhost:3000`

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account → Security
   - Select "App passwords"
   - Generate password for "Mail"
   - Use this password in your configuration

### Email Templates
The system sends beautifully formatted HTML emails for:
- Contact form submissions
- Visitor profile submissions
- Both include sender information, message content, and metadata

## 📊 Analytics & Dashboard

### Visitor Tracking
- **Total Visitors** - Counts unique page visits
- **Hire Requests** - Tracks "Hire Me" button clicks
- **Geographic Reach** - Counts unique states/regions
- **Messages** - Counts form submissions

### Admin Endpoints
Access with `X-Admin-Key` header:
- `GET /api/submissions` - View all submissions
- `POST /api/clear-data` - Clear analytics data
- `GET /api/analytics` - Get current statistics

## 🎨 Customization

### Personal Information
Edit the HTML file (`public/index.html`) to update:
- Personal details (name, email, phone)
- Social media links
- Project information
- Education history
- Skills and tools

### Themes
The website includes three themes:
- **Light Theme** - Clean white background
- **Dark Theme** - Modern dark interface  
- **Custom Theme** - Pink/purple gradient theme

### Styling
- Main styles: `public/css/style.css`
- Theme styles: `public/css/themes.css`
- Animations: `public/css/animations.css`

### JavaScript Modules
- Core functionality: `public/js/main.js`
- Theme system: `public/js/themes.js`
- Advanced animations: `public/js/animations.js`

## 🌐 Deployment

### Render.com (Recommended)
1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set environment variables:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_KEY=your-secret-key
   ```

### Vercel + Backend
1. Deploy frontend to Vercel
2. Deploy backend to Render/Railway/Heroku
3. Update API endpoints in frontend

### Netlify + Functions
1. Use Netlify Functions for backend
2. Convert Express routes to Netlify Functions
3. Deploy static files to Netlify

## 🔧 Configuration

### Environment Variables
```bash
EMAIL_USER=your-gmail@gmail.com      # Gmail address
EMAIL_PASS=your-app-password          # Gmail app password
ADMIN_KEY=your-secret-admin-key       # Admin access key
PORT=3000                             # Server port (optional)
NODE_ENV=production                   # Environment mode
```

### Features Toggle
You can enable/disable features by modifying:
- Custom cursor: `initCustomCursor()` in `main.js`
- Particle system: `initParticles()` in `main.js`
- Mouse trail: Uncomment in `animations.js`
- Theme system: `themes.js`

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Mobile-friendly navigation menu
- Touch-optimized interactions
- Responsive grid layouts
- Optimized images and fonts
- Touch gesture support

## 🔒 Security

- Input validation and sanitization
- Email validation
- Admin endpoint protection
- XSS protection
- CORS configuration
- Rate limiting (recommended for production)

## 📈 Performance

### Optimizations Included
- CSS and JavaScript minification ready
- Image optimization recommendations
- Lazy loading for images
- GPU-accelerated animations
- Debounced scroll events
- Efficient DOM manipulation

### Recommended Additions
- Image compression (WebP format)
- CDN integration
- Caching headers
- Service worker for offline support

## 🐛 Troubleshooting

### Email Not Sending
1. Verify Gmail credentials
2. Check App Password setup
3. Enable "Less secure app access" (not recommended)
4. Check server logs for error details

### Animations Not Working
1. Check browser compatibility
2. Verify JavaScript console for errors
3. Ensure CSS files are loading properly

### Mobile Issues
1. Test on actual devices
2. Check viewport meta tag
3. Verify touch event handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ketan Paswan**
- Email: ketanpaswan53@gmail.com
- Portfolio: [Your Portfolio URL]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔄 Updates

### Version 1.0.0
- Initial release with all core features
- Multi-theme system
- Email integration
- Analytics dashboard
- Mobile optimization

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Create production build
NODE_ENV=production npm start
```

**Ready to launch your professional portfolio! 🎉**
