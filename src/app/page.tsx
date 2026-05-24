import Link from "next/link";
import { ArrowRight, MapPin, BarChart3, Users } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={`glass-panel ${styles.heroContent}`}>
        <h1 className={styles.title}>
          <span className="text-gradient">Trace Lite</span>
          <br />
          Route Management
        </h1>
        <p className={styles.subtitle}>
          A premium administration dashboard to monitor your field workers, analyze travel history, and track budget spending in real-time.
        </p>

        <div className={styles.actions}>
          <Link href="/dashboard" className="glass-button primary">
            View Admin Demo <ArrowRight size={20} />
          </Link>
          <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="glass-button">
            Documentation
          </a>
        </div>

        <div className={styles.featuresGrid}>
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <MapPin size={32} />
            </div>
            <h3>Real-time Mapping</h3>
            <p>Track locations with interactive Leaflet maps</p>
          </div>
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <BarChart3 size={32} />
            </div>
            <h3>Budget Analytics</h3>
            <p>Monitor spending vs budget across the team</p>
          </div>
          <div className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.iconWrapper}>
              <Users size={32} />
            </div>
            <h3>Worker History</h3>
            <p>Analyze past routes and performance</p>
          </div>
        </div>
      </div>
    </main>
  );
}
