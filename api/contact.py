from http.server import BaseHTTPRequestHandler
import json
import smtplib
from email.message import EmailMessage
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        name = data.get('name', 'Unknown')
        email = data.get('email', 'No Email')
        phone = data.get('phone', 'No Phone')
        message = data.get('message', 'No Message')
        
        # We expect environment variables for secure SMTP authentication
        # You will need to add these to your Vercel or hosting platform's environment variables
        sender_email = os.environ.get("SENDER_EMAIL") 
        sender_password = os.environ.get("SENDER_PASSWORD") # Suggestion: Use Gmail App Passwords
        receiver_email = "sakthivelrmvs2757@gmail.com"
        
        # Check if config exists
        if not sender_email or not sender_password:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Server email configuration is missing"}).encode())
            return
            
        try:
            # Construct the email
            msg = EmailMessage()
            msg.set_content(f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}")
            msg['Subject'] = f"New Enquiry from {name} - Lakshana Bridal Studio"
            msg['From'] = sender_email
            msg['To'] = receiver_email
            msg['Reply-To'] = email

            # Connect and send via Gmail SMTP
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(sender_email, sender_password)
                smtp.send_message(msg)
                
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Email sent successfully"}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
            
    def do_OPTIONS(self):
        # Handle CORS preflight request for frontend clients
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
