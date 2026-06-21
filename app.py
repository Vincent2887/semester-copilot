import os
import io
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from google import genai
from fpdf import FPDF

app = Flask(__name__)
# Enable CORS so your frontend can communicate with port 5000 cleanly
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Live Google GenAI integration
# Replace line 13 in your app.py with your direct key token parameter:
client = genai.Client(api_key="AQ.Ab8RN6Jg7DYFkB5alc__vutQ1_YN0D5M-fffmymN2yvHV7WWJA")

@app.route('/api/generate-notes', methods=['POST'])
def handle_notes_generation():
    try:
        request_data = request.get_json()
        if not request_data or 'topic' not in request_data:
            return jsonify({"error": "Missing target topic title parameter."}), 400

        user_topic = request_data['topic']

        # Live Gemini call execution mapping matrix
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=(
                f"Create a highly detailed, comprehensive university engineering revision study guide handout for the topic: '{user_topic}'. "
                f"Break it down into three specific chapters: 1. Core Fundamentals & Concepts, 2. Practical Applications, and 3. Expected Examination Questions. "
                f"Strictly avoid using any markdown formatting tags like '##', '###', or '**' in the output text block. "
                f"Just use regular plain text with clean structural indentations, clear headings, and standard bullet points."
            )
        )
        
        real_ai_output_string = response.text

        return jsonify({
            "success": True,
            "topic": user_topic,
            "content": real_ai_output_string
        })

    except Exception as e:
        return jsonify({"error": f"AI Completion Generation pipeline dropped: {str(e)}"}), 500

@app.route('/api/generate-pdf', methods=['POST'])
def handle_pdf_conversion():
    try:
        request_data = request.get_json()
        text_content = request_data.get('content', '')
        topic_title = request_data.get('topic', 'Study-Notes')

        # Real-time PDF stream generation layout pipeline
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        
        # Draw Center Aligned Header Title Block
        pdf.set_font("Arial", style="B", size=16)
        pdf.cell(190, 10, txt=f"Topperdeck Study Guide Handout: {topic_title.upper()}", ln=True, align='C')
        pdf.ln(8)
        
        # Build Standard Content Multicell Matrix Blocks
        pdf.set_font("Arial", size=11)
        for line in text_content.split('\n'):
            # Clear problematic string characters to avoid standard encoding failures cleanly
            clean_line_bytes = line.encode('latin-1', 'ignore').decode('latin-1')
            pdf.multi_cell(0, 6, txt=clean_line_bytes)

        # Output the structural data array directly into a memory binary array stream buffer
        pdf_memory_buffer = io.BytesIO()
        pdf_memory_buffer.write(pdf.output())
        pdf_memory_buffer.seek(0)

        return send_file(
            pdf_memory_buffer,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=f"{topic_title.lower().replace(' ', '-')}-ai-notes.pdf"
        )
    except Exception as e:
        return jsonify({"error": f"PDF binary serialization runtime crash: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)