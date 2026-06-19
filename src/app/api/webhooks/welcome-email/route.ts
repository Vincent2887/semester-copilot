import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 📨 AUTOMATED WELCOME EMAIL WEBHOOK ROUTE
 * Listens for new row insertions within your user registration tracking tables.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Extract the newly generated account email metadata coming from the database record
    // Note: Supabase trigger payloads contain the new row inside 'record' or 'new_record'
    const targetEmail = payload?.record?.email || payload?.email;

    if (!targetEmail) {
      return NextResponse.json(
        { success: false, message: "Missing recipient validation details." },
        { status: 400 }
      );
    }

    // Deliver the welcome material layout
    const { data, error } = await resend.emails.send({
      from: "Topperdeck <onboarding@resend.dev>", // Replace with your custom domain once verified
      to: [targetEmail],
      subject: "⚡ Welcome to Topperdeck - Time to Crack the Exam!",
      html: `
        <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; color: #1e293b;">
          <h2 style="font-size: 20px; font-weight: 900; color: #0f172a; margin-bottom: 4px;">Welcome to Topperdeck! 🚀</h2>
          <p style="font-size: 13px; color: #64748b; margin-top: 0;">Your academic copilot workspace is officially primed.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 13px; line-height: 1.6;">Hey there,</p>
          <p style="font-size: 13px; line-height: 1.6;">Thanks for syncing your profile with Topperdeck. Whether you're tracking down official university past-year papers, organizing class handouts, or preparing your career profile in the <strong>Placement Hub</strong>, your environment is ready to deliver.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; rounded-xl; margin: 20px 0; border-radius: 12px;">
            <h4 style="font-size: 12px; margin: 0 0 6px 0; uppercase; color: #4f46e5; font-weight: 800; letter-spacing: 0.5px;">YOUR CO-PILOT CHECKLIST:</h4>
            <ul style="font-size: 12px; margin: 0; padding-left: 18px; line-height: 1.7; color: #334155;">
              <li>Select your active University and branch parameters.</li>
              <li>Bookmark high-priority handouts right to your sidebar repository.</li>
              <li>Unlock the Career Placement tracks to practice aptitude concepts.</li>
            </ul>
          </div>
          
          <p style="font-size: 13px; line-height: 1.6;">Good luck with your upcoming semester parameters!</p>
          <p style="font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 0;">— The Topperdeck Engineering Team</p>
        </div>
      `
    });

    if (error) {
      throw new Error(`Email routing engine faulted: ${error.message}`);
    }

    return NextResponse.json(
      { success: true, message: "Welcome dispatch pipeline successfully executed.", data },
      { status: 200 }
    );

  } catch (pipelineInterrupt: any) {
    console.error("Welcome email automation route dropped execution:", pipelineInterrupt.message);
    return NextResponse.json(
      { success: false, error: pipelineInterrupt.message },
      { status: 500 }
    );
  }
}