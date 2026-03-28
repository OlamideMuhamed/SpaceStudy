// --- NEW SUPABASE CONNECTION CODE ---
const SUPABASE_URL = 'https://xhubozqppvdfddsxnpyc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodWJvenFwcHZkZmRkc3hocHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzE1OTMsImV4cCI6MjA5MDE0NzU5M30.3c435paFFUe216rYC-PUw-cq0aO0bJwc4cePMQKfOjU';

// This creates the connection so your HTML files can use 'supabase'
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// --- YOUR EXISTING LOCAL STORAGE CODE ---
const SStudyDB = {
    // 1. Get data from the "notebook"
    load() {
        const data = localStorage.getItem('sstudy_master_db');
        return data ? JSON.parse(data) : {
            profile: { name: "Muhamed", xp: 0, level: 1 },
            subjects: [],
            tasks: [],
            stats: { totalSeconds: 0, streak: 0, lastDate: null }
        };
    },

    // 2. Save data to the "notebook"
    save(data) {
        localStorage.setItem('sstudy_master_db', JSON.stringify(data));
    },

    // 3. A helper to update specific things
    updateStats(seconds, date) {
        let db = this.load();
        db.stats.totalSeconds += seconds;
        
        if (db.stats.lastDate !== date) {
            db.stats.streak += 1;
            db.stats.lastDate = date;
        }
        
        this.save(db);
    }
};