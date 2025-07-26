// For development, using console.log
// In production, integrate with Nodemailer, SendGrid, or AWS SES

const sendEmail = async (to, subject, html) => {
  // In production, implement actual email sending
  console.log(`EMAIL SENT TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`CONTENT: ${html}`);
  return { success: true };
};

const sendReceipt = async (to, transaction) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4361ee;">Payment Receipt</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
        <p><strong>Event:</strong> ${transaction.eventId?.name || 'N/A'}</p>
        <p><strong>Amount:</strong> ₹${transaction.amount}</p>
        <p><strong>Date:</strong> ${new Date(transaction.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> <span style="color: #2ec4b6;">${transaction.status}</span></p>
        <p><strong>Hash:</strong> <code>${transaction.hash}</code></p>
      </div>
      <p style="margin-top: 20px;">Thank you for using our secure payment system!</p>
    </div>
  `;
  
  return await sendEmail(to, 'Payment Receipt - Secure Event Portal', html);
};

module.exports = {
  sendEmail,
  sendReceipt
};