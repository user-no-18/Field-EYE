import Link from "next/link";
import { ArrowRight, MapPin, BarChart3, Users, TrendingUp, Clock, Target, Shield } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <div className={styles.logoBadge}>TL</div>
            <span className={styles.logoText}>Trace Lite</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#benefits" className={styles.navLink}>Benefits</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
          </div>
          <Link href="/dashboard" className="glass-button primary">
            Launch App
          </Link>
        </div>
      </nav>

      <main className={styles.hero}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <TrendingUp size={14} />
              <span>Real-time Field Management</span>
            </div>
            <h1 className={styles.title}>
              Trace and Manage Your Field Teams 
              <span className={styles.highlight}> Effortlessly</span>
            </h1>
            <p className={styles.subtitle}>
              Enterprise-grade field workforce management platform. Monitor real-time locations, track budgets, analyze routes, and optimize team performance all in one intuitive dashboard.
            </p>

            <div className={styles.actions}>
              <Link href="/dashboard" className="glass-button primary">
                View Admin Demo <ArrowRight size={20} />
              </Link>
              <button className={styles.secondaryButton}>
                Schedule Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>500+</span>
                <span className={styles.trustLabel}>Active Teams</span>
              </div>
              <div className={styles.trustDivider}></div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>99.9%</span>
                <span className={styles.trustLabel}>Uptime</span>
              </div>
              <div className={styles.trustDivider}></div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>24/7</span>
                <span className={styles.trustLabel}>Support</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.imageBg}>
                <div className={styles.imageAccent1}></div>
                <div className={styles.imageAccent2}></div>
                <MapPin size={64} color="#10b981" style={{ opacity: 0.3 }} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Powerful Features</h2>
            <p className={styles.sectionSubtitle}>Everything you need to manage field teams efficiently</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <MapPin size={28} color="#10b981" />
              </div>
              <h3 className={styles.featureTitle}>Real-time Tracking</h3>
              <p className={styles.featureDesc}>Monitor worker locations with precision using interactive maps and live GPS tracking</p>
              <div className={styles.featureTag}>Live • GPS</div>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <BarChart3 size={28} color="#3b82f6" />
              </div>
              <h3 className={styles.featureTitle}>Budget Analytics</h3>
              <p className={styles.featureDesc}>Track spending patterns and compare expenses against budgets with detailed reports</p>
              <div className={styles.featureTag}>Analytics • Reports</div>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                <Users size={28} color="#a855f7" />
              </div>
              <h3 className={styles.featureTitle}>Team Management</h3>
              <p className={styles.featureDesc}>Manage worker profiles, roles, performance metrics, and team assignments seamlessly</p>
              <div className={styles.featureTag}>Profiles • Roles</div>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
                <Clock size={28} color="#ec4899" />
              </div>
              <h3 className={styles.featureTitle}>Time Tracking</h3>
              <p className={styles.featureDesc}>Automated clock-in/out, idle time detection, and comprehensive attendance reports</p>
              <div className={styles.featureTag}>Attendance • Hours</div>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
                <Target size={28} color="#f97316" />
              </div>
              <h3 className={styles.featureTitle}>Route Optimization</h3>
              <p className={styles.featureDesc}>Analyze travel patterns and optimize routes for maximum efficiency and cost savings</p>
              <div className={styles.featureTag}>Routes • Optimization</div>
            </div>

            <div className={`glass-panel ${styles.featureCard}`}>
              <div className={styles.featureIcon} style={{ background: 'rgba(14, 165, 233, 0.1)' }}>
                <Shield size={28} color="#0ea5e9" />
              </div>
              <h3 className={styles.featureTitle}>Security & Privacy</h3>
              <p className={styles.featureDesc}>Enterprise-grade security with encrypted data, role-based access, and compliance standards</p>
              <div className={styles.featureTag}>Secure • Encrypted</div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className={styles.benefitsSection}>
          <div className={styles.benefitsContent}>
            <div className={styles.benefitsText}>
              <h2 className={styles.benefitsTitle}>Why Teams Choose Trace Lite</h2>
              <ul className={styles.benefitsList}>
                <li className={styles.benefitItem}>
                  <div className={styles.checkmark}>✓</div>
                  <div>
                    <strong>Increased Visibility</strong>
                    <p>Know exactly where your team members are and what they're doing in real-time</p>
                  </div>
                </li>
                <li className={styles.benefitItem}>
                  <div className={styles.checkmark}>✓</div>
                  <div>
                    <strong>Cost Reduction</strong>
                    <p>Optimize routes and reduce fuel costs by up to 30% through smart analytics</p>
                  </div>
                </li>
                <li className={styles.benefitItem}>
                  <div className={styles.checkmark}>✓</div>
                  <div>
                    <strong>Better Decision Making</strong>
                    <p>Data-driven insights help you make informed business decisions</p>
                  </div>
                </li>
                <li className={styles.benefitItem}>
                  <div className={styles.checkmark}>✓</div>
                  <div>
                    <strong>Improved Accountability</strong>
                    <p>Track performance metrics and hold teams accountable with transparent reporting</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.benefitsImage}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.imageBg2}>
                  <BarChart3 size={80} color="#10b981" style={{ opacity: 0.2 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Field Operations?</h2>
            <p className={styles.ctaSubtitle}>Join hundreds of teams already using Trace Lite to manage their workforce</p>
            <div className={styles.ctaActions}>
              <Link href="/dashboard" className="glass-button primary">
                Start Free Trial <ArrowRight size={20} />
              </Link>
              <a href="#" className={styles.ctaLink}>Learn more →</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logoBadge}>TL</div>
            <span className={styles.logoText}>Trace Lite</span>
          </div>
          <p className={styles.footerText}>© 2024 Trace Lite. All rights reserved. | Premium Field Management Platform</p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
