import express from "express";
import path from "path";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Set up mock Ethereal mailer account for testing
  let transporter: nodemailer.Transporter;
  
  nodemailer.createTestAccount().then((account) => {
    transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    console.log("Mock Email Server Ready (Ethereal)");
    console.log("Preview URL will be printed when emails are sent");
  }).catch(console.error);

  // Mock Database of Clients
  const clients = [
    {
      id: 1,
      name: "María Garcia",
      email: "maria@example.com",
      points: 125,
      pointsExpiringSoon: 45, // points expiring within the next month
      recentActivity: [
        { date: "2026-06-15", service: "Balayage", pointsEarned: 30 },
        { date: "2026-06-02", service: "Corte y Secado", pointsEarned: 15 },
      ]
    },
    {
      id: 2,
      name: "Laura Rodriguez",
      email: "laura@example.com",
      points: 80,
      pointsExpiringSoon: 0,
      recentActivity: [
        { date: "2026-06-20", service: "Tinte", pointsEarned: 20 },
      ]
    },
    {
      id: 3,
      name: "Ana Fernandez",
      email: "ana@example.com",
      points: 210,
      pointsExpiringSoon: 120, // points expiring within the next month
      recentActivity: [
        { date: "2026-06-10", service: "Tratamiento Keratina", pointsEarned: 40 },
      ]
    }
  ];

  // Automated Monthly Email Summary (Runs on the 1st of every month at 9:00 AM)
  // For testing purposes, we'll also expose an endpoint to trigger it manually
  const sendMonthlySummaries = async () => {
    console.log("Starting to send monthly email summaries...");
    
    if (!transporter) {
      console.log("Email transporter not ready yet.");
      return;
    }

    for (const client of clients) {
      let activityHtml = "<p>No recent activity this month.</p>";
      if (client.recentActivity.length > 0) {
        activityHtml = "<ul>" + client.recentActivity.map(a => 
          `<li>${a.date}: ${a.service} (+${a.pointsEarned} pts)</li>`
        ).join('') + "</ul>";
      }

      let expirationHtml = "";
      if (client.pointsExpiringSoon > 0) {
        expirationHtml = `
          <div style="background-color: #ffebee; color: #c62828; padding: 10px; margin-top: 15px; border-left: 4px solid #c62828;">
            <strong>⚠️ Expiration Warning:</strong> You have <strong>${client.pointsExpiringSoon} points</strong> that will expire within the next 30 days due to the 6-month limit. Book an appointment soon to redeem them!
          </div>
        `;
      }

      const mailOptions = {
        from: '"Peluquería Blanca Granado" <noreply@blancagranado.com>',
        to: client.email,
        subject: `Your Monthly Loyalty Summary - ${client.points} Points!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Hello ${client.name}!</h2>
            <p>Here is your monthly loyalty points summary from Peluquería Blanca Granado.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0; color: #555;">Total Available Points</h3>
              <p style="font-size: 32px; font-weight: bold; color: #cca550; margin: 10px 0;">${client.points}</p>
            </div>

            ${expirationHtml}

            <h3 style="color: #333; margin-top: 30px;">Recent Activity (Last 30 Days)</h3>
            ${activityHtml}
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">
              Thank you for being a loyal customer at Peluquería Blanca Granado!
            </p>
          </div>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Summary email sent to ${client.name} (${client.email})`);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      } catch (err) {
        console.error(`Failed to send email to ${client.email}`, err);
      }
    }
    
    console.log("Finished sending monthly email summaries.");
  };

  // Schedule the cron job
  // Runs at 09:00 on day-of-month 1
  cron.schedule("0 9 1 * *", () => {
    sendMonthlySummaries();
  });

  // API endpoint to trigger manually for testing/demo
  app.post("/api/admin/trigger-monthly-summary", async (req, res) => {
    try {
      await sendMonthlySummaries();
      res.json({ success: true, message: "Monthly summaries triggered successfully. Check server logs for preview URLs." });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send summaries" });
    }
  });

  // API endpoint to fetch user's mock summary (to show in UI)
  app.get("/api/loyalty/summary/:id", (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (client) {
      res.json({ success: true, data: client });
    } else {
      res.status(404).json({ success: false, error: "Client not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
