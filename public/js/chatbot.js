// ===== AI CHATBOT - KETAN'S ASSISTANT =====

class KetanChatbot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
        this.sendWelcomeMessage();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <!-- Floating Toggle Button -->
            <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open Chat">
                <div class="robot-face">
                    <div class="robot-head">
                        <div class="robot-antenna"></div>
                        <div class="robot-eyes">
                            <div class="robot-eye"></div>
                            <div class="robot-eye"></div>
                        </div>
                        <div class="robot-mouth"></div>
                    </div>
                </div>
                <span class="chatbot-badge">1</span>
            </button>

            <!-- Chat Window -->
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">🤖</div>
                    <div class="chatbot-info">
                        <h3>Ketan's AI Assistant</h3>
                        <p><span class="chatbot-status"></span>Online</p>
                    </div>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages"></div>
                
                <div class="quick-replies" id="quick-replies"></div>
                
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Type your message..." />
                    <button class="chatbot-send-btn" id="chatbot-send" aria-label="Send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const window = document.getElementById('chatbot-window');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggle.addEventListener('click', () => {
            window.classList.toggle('active');
            toggle.classList.toggle('active');
            if (window.classList.contains('active')) {
                input.focus();
                document.querySelector('.chatbot-badge').style.display = 'none';
            }
        });

        sendBtn.addEventListener('click', () => this.handleUserMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
    }

    sendWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', `नमस्ते! 👋 I'm Ketan's AI Assistant. Ketan currently away hai, but main aapki madad kar sakta hoon! \n\nAap mujhse Ketan ke baare mein, unke projects, skills, ya kuch bhi pooch sakte hain.`);
            this.showQuickReplies([
                'Tell me about Ketan',
                'Show me projects',
                'Contact information',
                'Skills & Experience'
            ]);
        }, 1000);
    }

    handleUserMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        this.hideQuickReplies();
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            this.processMessage(message.toLowerCase());
        }, 1500);
    }

    processMessage(message) {
        let response = '';
        let quickReplies = [];

        // Greetings
        if (message.match(/^(hi|hello|hey|namaste|hii|hlo)/i)) {
            response = `Hello! 😊 Main Ketan ka AI assistant hoon. Ketan abhi available nahi hain, but main aapki help kar sakta hoon! Aap kya jaanna chahte hain?`;
            quickReplies = ['About Ketan', 'Projects', 'Skills', 'Contact'];
        }
        
        // About Ketan
        else if (message.includes('about') || message.includes('who') || message.includes('ketan')) {
            response = `Ketan Anand ek passionate **Web Developer** aur **Graphics Designer** hain! 🎨💻\n\n✨ **Expertise:**\n- Web Development (HTML, CSS, JavaScript)\n- UI/UX Design (Figma, Adobe XD)\n- 3D Modeling (Blender, 3DS Max)\n- Graphics Design (Photoshop, Illustrator)\n\n🎓 Currently pursuing B.Tech in 3D Animation & Graphics.\n\n🏆 3+ years of experience with 50+ completed projects!`;
            quickReplies = ['View Projects', 'Technical Skills', 'Education', 'Contact'];
        }
        
        // Projects
        else if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
            response = `Ketan ne kaafi impressive projects banaye hain! 🚀\n\n**Featured Projects:**\n\n🎯 **Invoice Generator** - Dynamic invoice creation tool\n\n📱 **YouTube Clone** - Full UI clone with modern design\n\n🎨 **Registration Forms** - Beautiful UI/UX designs\n\n🤖 **ReactJS Portfolio** - Interactive portfolio with React\n\n🎭 **3D Models** - Blender models (Grass, Bottles, etc.)\n\nProjects section mein scroll karke dekh sakte hain!`;
            quickReplies = ['View Live Demos', 'GitHub Profile', 'More Info'];
        }
        
        // Skills
        else if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('know')) {
            response = `Ketan ke technical skills kaafi strong hain! 💪\n\n**Web Development:**\n- HTML5: 95%\n- CSS3: 90%\n- JavaScript: 85%\n\n**Design Tools:**\n- Figma: 92%\n- Photoshop: 88%\n- Illustrator: 80%\n\n**3D & Animation:**\n- Blender\n- 3DS Max\n- Subdivision Modeling\n\n**Other:**\n- Git & GitHub\n- Node.js\n- Responsive Design`;
            quickReplies = ['Projects', 'Certificates', 'Contact'];
        }
        
        // Contact
        else if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
            response = `📬 **Contact Information:**\n\n📧 Email: ketanpaswan53@gmail.com\n📱 Phone: +91 9771735011\n📍 Location: Darbhanga, Bihar, India\n\n**Social Media:**\n- GitHub: github.com/ketananand76\n- LinkedIn: Check profile section\n- Instagram: @ketan_2k4\n\nAap directly contact form bhi fill kar sakte hain! Main Ketan ko inform kar dunga. 😊`;
            quickReplies = ['Fill Contact Form', 'More Info'];
        }
        
        // Education
        else if (message.includes('education') || message.includes('study') || message.includes('degree')) {
            response = `🎓 **Education Background:**\n\n**B.Tech** (2022-2026)\n3D Animation & Graphics\nSpecialization: Graphics Design, Web Dev, Computer Graphics\n\n**12th Grade** (2020-2022)\nBSEB Board - PCM Stream\n\n**10th Grade** (2019-2020)\nCBSE Board - With Distinction`;
            quickReplies = ['Certificates', 'Skills', 'Projects'];
        }
        
        // Certificates
        else if (message.includes('certificate') || message.includes('achievement')) {
            response = `🏆 **Certifications & Achievements:**\n\n✅ Computer Graphics - NPTEL (IIT Guwahati)\n✅ Web Development - HTML, CSS, JavaScript\n✅ Data Analytics - Deloitte Job Simulation\n✅ ReactJS - JavaScript with React\n✅ 3D Modeling - ATCPL\n✅ Python Fundamentals - IIT Roorkee\n✅ Cybersecurity Intro - Cisco\n\nAur bhi bahut saare certificates hain! Portfolio mein check karein.`;
            quickReplies = ['View All', 'Projects', 'Contact'];
        }
        
        // Availability
        else if (message.includes('available') || message.includes('free') || message.includes('hire')) {
            response = `Ketan freelance projects aur full-time opportunities ke liye available hain! 💼\n\n✨ **Services:**\n- Web Development\n- UI/UX Design\n- Graphics Design\n- 3D Modeling\n\nContact form fill karein ya direct email karein. Ketan aapko 24-48 hours mein reply karenge!`;
            quickReplies = ['Contact Now', 'View Projects'];
        }
        
        // Help/Options
        else if (message.includes('help') || message.includes('option') || message.includes('kya')) {
            response = `Main aapki yeh cheezon mein help kar sakta hoon:\n\n💡 Ketan ke baare mein batana\n🎯 Projects dikhana\n🛠️ Technical skills batana\n📚 Education & certificates\n📞 Contact information\n💼 Hiring & availability\n\nKoi bhi sawaal poochiye!`;
            quickReplies = ['About Ketan', 'Projects', 'Skills', 'Contact'];
        }
        
        // Default
        else {
            response = `Hmm, main exactly samajh nahi paya. 🤔\n\nAap yeh pooch sakte hain:\n- Ketan ke baare mein\n- Unke projects\n- Technical skills\n- Contact information\n- Education & certificates\n\nYa phir neeche se option select karein!`;
            quickReplies = ['About Ketan', 'Projects', 'Skills', 'Contact'];
        }

        this.addMessage('bot', response);
        if (quickReplies.length > 0) {
            this.showQuickReplies(quickReplies);
        }
    }

    addMessage(sender, text) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="chat-message ${sender}">
                <div class="message-avatar ${sender}">
                    ${sender === 'bot' ? '🤖' : '👤'}
                </div>
                <div class="message-content">
                    <p>${text.replace(/\n/g, '<br>')}</p>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;
        
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    showTyping() {
        const messagesDiv = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chat-message bot" id="typing-indicator">
                <div class="message-avatar">🤖</div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    showQuickReplies(replies) {
        const quickRepliesDiv = document.getElementById('quick-replies');
        quickRepliesDiv.innerHTML = '';
        
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = reply;
            btn.onclick = () => {
                document.getElementById('chatbot-input').value = reply;
                this.handleUserMessage();
            };
            quickRepliesDiv.appendChild(btn);
        });
    }

    hideQuickReplies() {
        document.getElementById('quick-replies').innerHTML = '';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KetanChatbot();
    console.log('🤖 Ketan AI Assistant initialized!');
});
