/*
Skripta se koristi za test na dev-u. Pokrece se komandom: node scripts/local-cron.js
Nakon zavrsenog testiranja na prod okruzenju, obrisati je
*/

console.log("Starting local cron testing script...");

const triggerCron = async () => {
  console.log("Triggering cron job...");
  try {
    const response = await fetch("http://localhost:3000/api/sitemap/cron");
    console.log("Cron job triggered, status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Cron response data:", data);
    } else {
      console.error("Cron job failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error triggering cron job:", error.message);
  }
};

// Pokreće cron svakih 2 minuta
console.log("Setting up interval for every 20...");
setInterval(() => {
  console.log("Running cron task at:", new Date().toISOString());
  triggerCron();
}, 20 * 1000); // 30 sek
