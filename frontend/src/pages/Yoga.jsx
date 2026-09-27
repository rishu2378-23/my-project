import { Link } from 'react-router-dom';
import './Yoga.css';

const Yoga = () => {
  const levels = [
    {
      title: 'Beginner Foundations',
      subtitle: 'Gentle introduction & alignment',
      description: 'Designed for those new to yoga or returning after a break. Focuses on foundational poses, safe alignment, breath awareness, and gentle stretching to build confidence, core stability, and deep body awareness.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
      tag: 'Gentle & Accessible',
      linkText: 'View Beginner Classes',
    },
    {
      title: 'Intermediate Flow',
      subtitle: 'Dynamic Vinyasa & stamina',
      description: 'For practitioners ready to deepen their practice. Combines dynamic Vinyasa sequences, balance postures, core conditioning, and smoother transitions between asanas to build cardiovascular stamina, grace, and focus.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
      tag: 'Energizing & Fluid',
      linkText: 'View Intermediate Classes',
    },
    {
      title: 'Advanced Mastery',
      subtitle: 'Inversions, backbends & depth',
      description: 'Challenging sessions exploring arm balances, deep inversions, complex backbends, and advanced pranayama. Tailored for experienced yogis looking to test their limits, expand their practice, and explore subtle energy.',
      image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1000',
      tag: 'Advanced & Transformative',
      linkText: 'View Advanced Classes',
    }
  ];

  const benefits = [
    {
      title: 'Enhanced Flexibility',
      description: 'Gradually lengthens muscles and lubricates joints, relieving chronic tension and improving overall posture and mobility.',
      icon: '🌿'
    },
    {
      title: 'Mental Clarity',
      description: 'Cultivates present-moment awareness, quieting mental chatter and sharpening cognitive focus throughout your daily life.',
      icon: '✨'
    },
    {
      title: 'Stress Reduction',
      description: 'Activates the parasympathetic nervous system, lowering cortisol levels and fostering deep emotional restoration.',
      icon: '💧'
    },
    {
      title: 'Core Strength',
      description: 'Builds functional, balanced strength across the entire body without high-impact strain on joints.',
      icon: '☀️'
    }
  ];

  return (
    <div className="yoga-page">
      <div className="yoga-hero">
        <div className="yoga-hero-overlay"></div>
        <div className="yoga-hero-content">
          <span className="yoga-hero-badge">Mindful Movement</span>
          <h1>The Art & Practice of Yoga</h1>
          <p>Unite breath, movement, and mindfulness to cultivate profound harmony in body, mind, and spirit.</p>
          <div className="yoga-hero-actions">
            <Link to="/classes" className="cta-button primary">Explore Yoga Classes</Link>
          </div>
        </div>
      </div>

      <div className="yoga-content-container">
        <section className="yoga-intro-section">
          <div className="yoga-intro-badge">Holistic Wellbeing</div>
          <h2>Discover Inner Balance & Serenity</h2>
          <p>
            Yoga is an ancient discipline rooted in philosophy and self-discovery. Through physical postures (asanas), breath control (pranayama), and meditation, yoga offers a holistic path to physical vitality and mental serenity. Whether you are seeking strength, flexibility, or emotional calm, our expert-led sessions meet you wherever you are on your journey.
          </p>
        </section>

        <section className="yoga-benefits-section">
          <div className="section-header">
            <h2>Transformative Benefits of Yoga</h2>
            <p>Experience the enduring gifts of mindful practice on your physical and mental health.</p>
          </div>
          <div className="yoga-benefits-grid">
            {benefits.map((b, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="yoga-levels-section">
          <div className="section-header">
            <h2>Explore By Experience Level</h2>
            <p>Tailored practices designed for every stage of your mindful evolution.</p>
          </div>
          <div className="levels-container">
            {levels.map((lvl, index) => (
              <div className={`level-feature-card ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
                <div className="level-image-wrapper">
                  <img src={lvl.image} alt={lvl.title} />
                  <span className="level-tag">{lvl.tag}</span>
                </div>
                <div className="level-text-content">
                  <span className="level-subtitle">{lvl.subtitle}</span>
                  <h3>{lvl.title}</h3>
                  <p>{lvl.description}</p>
                  <Link to="/classes" className="cta-button secondary">{lvl.linkText}</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="yoga-cta-section">
          <div className="yoga-cta-bg"></div>
          <div className="yoga-cta-content">
            <h2>Ready to Begin Your Practice?</h2>
            <p>Join our live online sessions led by world-class certified instructors and experience the transformative power of community and mindful movement.</p>
            <Link to="/classes" className="cta-button primary">Explore Yoga Classes</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Yoga;
