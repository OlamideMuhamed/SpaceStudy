// db.js
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