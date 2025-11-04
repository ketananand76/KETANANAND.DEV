// ===== CONTACT FORM DEBUG SCRIPT =====
// Run this script in your browser's developer console while on the portfolio page
// to test and debug the contact form functionality

console.log('🔧 Contact Form Debug Script Started');

// Test 1: Check if elements exist
function checkElements() {
    console.log('\n1️⃣ Checking DOM elements...');
    
    const contactForm = document.getElementById('contact-form');
    const nameField = contactForm?.querySelector('input[name="name"]');
    const emailField = contactForm?.querySelector('input[name="email"]');
    const subjectField = contactForm?.querySelector('input[name="subject"]');
    const messageField = contactForm?.querySelector('textarea[name="message"]');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    
    console.log('Contact form:', contactForm ? '✅ Found' : '❌ Missing');
    console.log('Name field:', nameField ? '✅ Found' : '❌ Missing');
    console.log('Email field:', emailField ? '✅ Found' : '❌ Missing');
    console.log('Subject field:', subjectField ? '✅ Found' : '❌ Missing');
    console.log('Message field:', messageField ? '✅ Found' : '❌ Missing');
    console.log('Submit button:', submitBtn ? '✅ Found' : '❌ Missing');
    
    return { contactForm, nameField, emailField, subjectField, messageField, submitBtn };
}

// Test 2: Check server connectivity
async function checkServer() {
    console.log('\n2️⃣ Checking server connectivity...');
    
    try {
        const response = await fetch('/health');
        const data = await response.json();
        console.log('Server status:', data.status);
        console.log('Email configured:', data.emailConfigured ? '✅ Yes' : '❌ No');
        return true;
    } catch (error) {
        console.error('❌ Server connectivity failed:', error);
        return false;
    }
}

// Test 3: Test form submission manually
async function testFormSubmission() {
    console.log('\n3️⃣ Testing form submission...');
    
    const testData = {
        name: 'Debug Test User',
        email: 'debug@example.com',
        subject: 'Contact Form Debug Test',
        message: 'This is a debug test message from the browser console.',
        type: 'contact'
    };
    
    try {
        console.log('Sending test data:', testData);
        
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Form submission successful:', result.message);
            return true;
        } else {
            console.error('❌ Form submission failed:', result.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Form submission error:', error);
        return false;
    }
}

// Test 4: Check event listeners
function checkEventListeners() {
    console.log('\n4️⃣ Checking event listeners...');
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Check if form has submit event listener
        const hasListener = contactForm.onsubmit !== null || 
                          contactForm.addEventListener !== undefined;
        console.log('Form has event listeners:', hasListener ? '✅ Yes' : '❌ No');
        
        // Try to trigger a test submission
        console.log('Form action attribute:', contactForm.action || 'none');
        console.log('Form method attribute:', contactForm.method || 'get');
    }
}

// Test 5: Fill and submit form automatically
function fillAndSubmitForm() {
    console.log('\n5️⃣ Auto-filling and submitting form...');
    
    const elements = checkElements();
    
    if (elements.contactForm && elements.nameField && elements.emailField && 
        elements.subjectField && elements.messageField) {
        
        // Fill form with test data
        elements.nameField.value = 'Console Test User';
        elements.emailField.value = 'console-test@example.com';
        elements.subjectField.value = 'Console Debug Test';
        elements.messageField.value = 'This test was submitted from the browser console.';
        
        console.log('✅ Form filled with test data');
        
        // Trigger form submission
        setTimeout(() => {
            console.log('🚀 Submitting form...');
            elements.submitBtn.click();
        }, 1000);
        
    } else {
        console.error('❌ Cannot fill form - missing elements');
    }
}

// Run all tests
async function runAllTests() {
    console.log('🧪 Running all contact form tests...');
    console.log('=====================================');
    
    // Test 1: Elements
    const elements = checkElements();
    
    // Test 2: Server
    const serverOk = await checkServer();
    
    // Test 3: API
    if (serverOk) {
        await testFormSubmission();
    }
    
    // Test 4: Event listeners
    checkEventListeners();
    
    console.log('\n📋 Summary:');
    console.log('- Elements present:', elements.contactForm ? '✅' : '❌');
    console.log('- Server responding:', serverOk ? '✅' : '❌');
    
    console.log('\n💡 To test form submission manually:');
    console.log('   fillAndSubmitForm()');
    
    console.log('\n🔧 Debug complete!');
}

// Auto-run tests
runAllTests();

// Make functions available globally for manual testing
window.debugContactForm = {
    runAllTests,
    checkElements,
    checkServer,
    testFormSubmission,
    fillAndSubmitForm
};