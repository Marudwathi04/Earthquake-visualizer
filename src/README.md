# 🌍 Global Earthquake Visualizer

**Aganitha Cognitive Solutions - Take Home Assignment**  
**CONFIDENTIAL PROJECT**

---

## 👤 Candidate Information
- **Name**: Marudwathi Kusuluru
- **Candidate ID**: Naukri1025
- **Email**: kusulurumarudwathi@gmail.com
- **Phone**: 8125605852
- **Position Applied**: Full Stack Developer

---

## 🚀 Live Deployment
**Production URL**: https://earthquake-visualizer-marudwathi.vercel.app/
---

## 📋 Project Overview

Interactive real-time earthquake visualization application built for **Casey**, a Geography Student who wants to visualize recent earthquake activity around the world to understand seismic patterns.

---

## ✨ Features Implemented

### Core Features
- ✅ **Interactive World Map** - Powered by Leaflet.js
- ✅ **Real-time Data** - USGS Earthquake Hazards Program API
- ✅ **Time-based Filtering** - Last Hour, 24 Hours, 7 Days, 30 Days
- ✅ **Magnitude Filtering** - Adjustable slider (0.0 - 7.0+)
- ✅ **Color-coded Severity Indicators**
  - 🟢 Green: < 2.5 (Minor)
  - 🟡 Yellow: 2.5 - 4.5 (Light)
  - 🟠 Orange: 4.5 - 6.0 (Moderate)
  - 🔴 Red: 6.0+ (Strong)
- ✅ **Detailed Information Popups** - Location, time, depth, coordinates
- ✅ **Live Statistics Dashboard** - Total events, average magnitude
- ✅ **Responsive Design** - Works on mobile and desktop
- ✅ **Error Handling** - Graceful error messages with retry option
- ✅ **Loading States** - User-friendly loading indicators

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern component-based UI
- **Vite** - Lightning-fast build tool

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- Custom dark theme for better map visibility

### Mapping Library
- **Leaflet.js** - Interactive map library
- Circle markers for earthquake visualization
- Custom popup styling

### API Integration
- **USGS Earthquake API** - Real-time GeoJSON feeds
- No authentication required
- Updates every minute

### Deployment
- **Vercel** - Serverless deployment platform
- Direct CLI deployment (no public repository)

---

## 📊 Data Source

**USGS (United States Geological Survey) Earthquake Hazards Program**
- Real-time earthquake data in GeoJSON format
- Global coverage
- Multiple time ranges available
- Reliable and frequently updated

**API Endpoints Used:**
- Last Hour: `all_hour.geojson`
- Last 24 Hours: `all_day.geojson`
- Last 7 Days: `all_week.geojson`
- Last 30 Days: `all_month.geojson`

---

## 🧠 AI (LLM) Usage

### Tool Used
**Claude AI by Anthropic** (Claude Sonnet 4.5)

### Conversation Link
[INSERT YOUR CLAUDE CHAT LINK]

### How AI Assisted
1. **Project Setup** - Guided through React + Vite + Tailwind installation
2. **Architecture Decisions** - Recommended component structure and state management
3. **Leaflet Integration** - Helped with proper React hooks usage for map initialization
4. **Error Debugging** - Solved Leaflet loading issues and marker management
5. **Code Optimization** - Improved performance for handling large datasets
6. **Documentation** - Assisted with README structure and deployment guide

### Problem-Solving Approach with AI
- Started with requirements analysis
- Discussed technology choices
- Iterative debugging and improvements
- Best practices implementation

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation Steps
```bash
# 1. Extract the ZIP file

# 2. Navigate to project directory
cd earthquake-visualizer

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Open browser
# Visit: http://localhost:5173
```

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder.

---

## 🎨 Design Decisions

### Why React + Vite?
- Fast development with Hot Module Replacement (HMR)
- Modern build tool with optimal bundle size
- Better performance than Create React App
- Industry standard for modern web applications

### Why Tailwind CSS?
- Rapid UI development
- Consistent design system
- Smaller bundle size (only used classes)
- Easy responsive design

### Why Leaflet?
- Lightweight (38KB gzipped)
- No API keys required
- Rich ecosystem and documentation
- Perfect for custom visualizations

### Dark Theme Choice
- Better visibility for map data
- Reduces eye strain
- Makes colored markers stand out
- Professional appearance

---

## 🔍 Technical Challenges & Solutions

### Challenge 1: Leaflet + React Integration
**Problem**: Leaflet manipulates DOM directly, conflicts with React's virtual DOM  
**Solution**: Used `useRef` for map container, `useEffect` for lifecycle management

### Challenge 2: Performance with Large Datasets
**Problem**: Rendering 1000+ markers caused lag  
**Solution**: 
- Implemented efficient marker cleanup
- Optimized re-renders with proper dependencies
- Used circle markers instead of custom icons

### Challenge 3: Real-time Data Updates
**Problem**: Managing loading states during API calls  
**Solution**: 
- Proper loading indicators
- Error boundaries
- Retry mechanism for failed requests

### Challenge 4: Responsive Design
**Problem**: Map not resizing properly on mobile  
**Solution**: 
- Used Tailwind responsive utilities
- Proper CSS height calculations
- Tested on multiple screen sizes

---

## 📱 User Experience Features

### Intuitive Filters
- **Time Range Dropdown** - Easy switching between time periods
- **Magnitude Slider** - Visual representation of filter value
- **Real-time Updates** - Immediate feedback on filter changes

### Interactive Elements
- **Clickable Markers** - Detailed information on demand
- **Color Coding** - Quick visual assessment of severity
- **Statistics Dashboard** - At-a-glance overview

### Error Handling
- Graceful error messages
- Retry button for failed requests
- Loading indicators during data fetch

---

## 🎯 Development Process

### 1. Requirement Analysis
- Understood Casey's need for earthquake pattern visualization
- Identified key features: filtering, real-time data, interactivity

### 2. Technology Selection
- Chose modern stack for optimal performance
- Considered learning curve vs. capabilities

### 3. Implementation
- Set up project structure
- Integrated USGS API
- Built interactive map
- Added filters and statistics

### 4. Testing
- Tested across different time ranges
- Verified filter functionality
- Checked responsive design
- Error scenario testing

### 5. Deployment
- Built production version
- Deployed to Vercel
- Verified live application

---

## 📈 Future Enhancements

If given more time, potential improvements:
- Historical data comparison charts
- Email alerts for significant earthquakes
- Custom region/country selection
- Export data functionality (CSV/JSON)
- Multiple map layers (satellite, terrain)
- Earthquake prediction trends
- Social sharing features

---

## 🎓 Key Learnings

1. **Effective AI Collaboration** - Using Claude AI significantly improved development speed
2. **Modern React Patterns** - Proper hooks usage and component lifecycle
3. **API Integration** - Handling real-time data and error states
4. **Performance Optimization** - Efficient rendering of large datasets
5. **User-Centric Design** - Building for specific user persona (Casey)

---

## 👨‍💻 About the Developer

### Marudwathi Kusuluru

**Education**
- B.Tech, Minor in Computer Science and Engineering
- Annamacharya Institute of Technology & Sciences, Tirupati
- CGPA: 9.22/10

**Experience**
- **Software Engineering Intern** at Mphasis (Jan 2025 - May 2025)
  - API testing, UI testing, test automation
  - Java + Selenium automation
  - Agile methodology

**Technical Skills**
- **Languages**: Java, Python, C
- **Frameworks**: React, Spring Boot, Flask
- **Tools**: Git, Postman, JIRA, Selenium
- **Databases**: MySQL, SQLite
- **Web**: HTML, CSS, JavaScript, Tailwind CSS

**Other Projects**
1. **BookHub** - Library Management System (Java, Spring Boot, MySQL)
2. **Medicinal Plant Disease Detection** - Deep Learning (ResNet50, Flask)
3. **Food Munch** - Responsive Restaurant Website (HTML, CSS, Bootstrap)

**Certifications**
- Google Cybersecurity - Coursera
- AI-ML Hands-on Bootcamp - IIT Tirupati

---

## 📞 Contact Information

- **Email**: kusulurumarudwathi@gmail.com
- **Phone**: +91 8125605852
- **LinkedIn**: [linkedin.com/in/marudwathi-kusuluru](https://linkedin.com/in/marudwathi-kusuluru-3771ba260)
- **GitHub**: [github.com/Marudwathi04](https://github.com/Marudwathi04)

---

## 📄 Project Structure
```
earthquake-visualizer/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind imports
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template with Leaflet CSS
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

---

## 🙏 Acknowledgments

- **Aganitha Cognitive Solutions** - For the opportunity
- **USGS** - For providing reliable earthquake data
- **Claude AI** - For development assistance
- **Open Source Community** - React, Vite, Tailwind, Leaflet

---

## ⚖️ License & Confidentiality

This project is developed as part of Aganitha Cognitive Solutions take-home assignment and is strictly confidential. It must not be shared publicly or on any social media platforms.

---

**Built with ❤️ by Marudwathi Kusuluru**  
**For Aganitha Cognitive Solutions**  
**October 2025**
```

---

## 📹 **Step 5: Record Demo Video (3-5 min)**

### **Script for Video:**
```
"Hello, I'm Marudwathi Kusuluru, Candidate ID Naukri1025.

This is my Earthquake Visualizer application for the Aganitha take-home assignment, built for Casey, a geography student.

[Show deployed URL]
Let me show you the features:

1. Time Range Filter - I can view earthquakes from the last hour, day, week, or month
2. Magnitude Filter - This slider lets me filter by earthquake strength
3. Interactive Map - Each colored circle represents an earthquake
   - Green for minor, yellow for light, orange for moderate, red for strong
4. Click any marker to see details - magnitude, location, time, depth, coordinates
5. Statistics update in real-time - total events and average magnitude

[Quick code view - optional]
Built with React, Vite, Tailwind CSS, and Leaflet for the mapping.

I used Claude AI throughout development for guidance and problem-solving.

Thank you for this opportunity!"
```

### **How to Record:**
1. **Windows Game Bar**: Win + G → Record
2. **Or use**: OBS Studio (free download)
3. **Upload**: YouTube (Unlisted) or Google Drive

---

## 📋 **Final Submission Checklist:**
```
✅ 1. Vercel Deployment URL
✅ 2. Code ZIP file (with README.md)
✅ 3. Demo Video (3-5 min)
✅ 4. Claude AI conversation link
✅ 5. Candidate ID: Naukri1025