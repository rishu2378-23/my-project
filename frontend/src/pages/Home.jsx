import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Holistic Sanctuary</div>
          <h1>Elevate Your Body, Mind, and Spirit</h1>
          <p>Discover a sanctuary of inner peace, mindful movement, nourishing nutrition, and expert-led wellness classes designed for your personal evolution.</p>
          <div className="hero-buttons">
            <Link to="/yoga" className="btn-primary">Explore Yoga</Link>
            <Link to="/classes" className="btn-secondary">View Classes</Link>
          </div>
        </div>
      </header>

      <section className="home-intro-section" style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--forest-green)', fontSize: '2.25rem', marginBottom: '1.5rem' }}>Welcome to Yoga & Wellness Wave</h2>
        <p style={{ color: 'var(--muted-text)', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 auto' }}>
          In a fast-paced world, taking time to reconnect with your center is essential. Our platform integrates mindful yoga flows, wholesome nutritional guidance, and transformative wellness practices to help you cultivate a radiant, balanced, and harmonious life.
        </p>
      </section>

      <section className="features">
        <Link to="/yoga" className="card">
          <div className="card-icon">🌿</div>
          <h3>Mindful Yoga</h3>
          <p>Find your balance, strength, and flexibility with expert-led sessions tailored for every level.</p>
        </Link>
        <Link to="/diet" className="card">
          <div className="card-icon">🍃</div>
          <h3>Mindful Diet</h3>
          <p>Nourish your body and support sustained vitality with wholesome, seasonal nutritional plans.</p>
        </Link>
        <Link to="/wellness" className="card">
          <div className="card-icon">✨</div>
          <h3>Inner Wellness</h3>
          <p>Explore meditation, restorative sleep rituals, and stress resilience for complete harmony.</p>
        </Link>
      </section>

      <section className="home-stats-section" style={{ background: 'var(--warm-beige)', padding: '4rem 2rem', margin: '2rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--forest-green)', marginBottom: '0.5rem' }}>100+</h3>
            <p style={{ color: 'var(--muted-text)', fontWeight: 500 }}>Expert Classes</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--forest-green)', marginBottom: '0.5rem' }}>15k+</h3>
            <p style={{ color: 'var(--muted-text)', fontWeight: 500 }}>Active Members</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--forest-green)', marginBottom: '0.5rem' }}>50+</h3>
            <p style={{ color: 'var(--muted-text)', fontWeight: 500 }}>Certified Instructors</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--forest-green)', marginBottom: '0.5rem' }}>100%</h3>
            <p style={{ color: 'var(--muted-text)', fontWeight: 500 }}>Holistic Growth</p>
          </div>
        </div>
      </section>

      <section className="home-cta-banner" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'linear-gradient(135deg, var(--natural-green) 0%, var(--embrace-deep) 100%)', color: '#fff' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Ready to Begin Your Wellness Journey?</h2>
        <p style={{ fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2rem', opacity: 0.95 }}>
          Join our thriving community today. Register your account, explore our available classes, and secure your spot in seconds.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn-primary" style={{ backgroundColor: '#fff', color: 'var(--embrace-deep)' }}>Create Account</Link>
          <Link to="/classes" className="btn-secondary" style={{ backgroundColor: 'var(--embrace-deep)', color: '#fff' }}>Browse Classes</Link>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Yoga & Wellness Wave. Elevating body, mind, and spirit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
