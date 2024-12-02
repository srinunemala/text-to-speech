let timerInterval;
        let elapsedTime = 0;
        const undoStack = [];
        const redoStack = [];

        // Day-Night Toggle
        function toggleDayNight() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);

            const toggleIcon = document.getElementById('dayNightToggle');
            toggleIcon.textContent = newTheme === 'dark' ? '🌙' : '🌞';

            localStorage.setItem('theme', newTheme);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);

            const toggleIcon = document.getElementById('dayNightToggle');
            toggleIcon.textContent = savedTheme === 'dark' ? '🌙' : '🌞';
        });

        // Login and Logout
        function login() {
            const email = document.getElementById('email').value;
            if (!email) {
                alert('Please enter your email.');
                return;
            }
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
        }

        function logout() {
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('mainPage').style.display = 'none';
        }

        // Timer
        function startListening() {
            elapsedTime = 0;
            const timerDisplay = document.getElementById('recordingTimer');
            timerDisplay.style.display = 'block';

            timerInterval = setInterval(() => {
                elapsedTime++;
                timerDisplay.textContent = `Recording: ${elapsedTime}s`;
            }, 1000);
        }

        function stopListening() {
            clearInterval(timerInterval);
            document.getElementById('recordingTimer').style.display = 'none';
        }

        // Text Management
        function copyText() {
            const text = document.getElementById('outputText').value;
            navigator.clipboard.writeText(text);
            alert('Text copied to clipboard!');
        }

        function changeLanguage(language) {
            alert(`Language changed to: ${language}`);
        }

        function undoText() {
            const text = document.getElementById('outputText').value;
            if (undoStack.length < 5) undoStack.push(text);
            redoStack.push(text);
            document.getElementById('outputText').value = undoStack.pop() || '';
        }

        function redoText() {
            document.getElementById('outputText').value = redoStack.pop() || '';
        }

        function eraseText() {
            const text = document.getElementById('outputText').value;
            document.getElementById('outputText').value = text.slice(0, -1);
        }

        function clearText() {
            document.getElementById('outputText').value = '';
        }

        function downloadPDF() {
            const { jsPDF } = window.jspdf;
            const text = document.getElementById('outputText').value;
            const pdf = new jsPDF();
            pdf.text(text, 10, 10);
            pdf.save('speech-to-text.pdf');
        }