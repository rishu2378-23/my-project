import { Link } from 'react-router-dom';
import './Wellness.css';

const Wellness = () => {
  const categories = [
    {
      title: 'Meditation & Mindfulness',
      subtitle: 'Inner stillness & present awareness',
      description: 'Quiet the fluctuations of the mind through guided and silent meditation practices. Learn to observe thoughts without judgment and cultivate deep inner stillness in your daily life.',
      benefits: 'Reduces anxiety, sharpens focus, and deepens self-awareness.',
      tips: ['Start with just 5 minutes daily', 'Focus anchor on your natural breath', 'Practice self-compassion when the mind wanders'],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
      tag: 'Mind & Stillness'
    },
    {
      title: 'Stress Relief & Resilience',
      subtitle: 'Somatic grounding & calm nervous system',
      description: 'Equip yourself with somatic tools, breathwork, and emotional regulation strategies to navigate daily pressures with grace, emotional equanimity, and unshakeable inner resilience.',
      benefits: 'Calms the nervous system, lowers cortisol, and builds emotional agility.',
      tips: ['Try box breathing during high-stress moments', 'Incorporate gentle somatic movement', 'Maintain a regular daily gratitude journal'],
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1000',
      tag: 'Equanimity & Flow'
    },
    {
      title: 'Healthy Sleep & Recovery',
      subtitle: 'Circadian rhythms & restorative rest',
      description: 'Optimize your circadian rhythm and nighttime restoration through sleep hygiene rituals, calming evening stretches, and restorative rest practices that renew body and mind.',
      benefits: 'Elevated mood, increased daily productivity, and deep cellular repair.',
      tips: ['Maintain a consistent sleep and wake schedule', 'Keep bedroom cool, dark, and screen-free', 'Establish a calming pre-sleep relaxation routine'],
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b1fc485?auto=format&fit=crop&w=800&q=80',
      tag: 'Rest & Renewal'
    },
  ];

  const benefits = [
    {
      title: 'Emotional Equilibrium',
      description: 'Develop the emotional space to respond to life with grace rather than reacting out of stress or fatigue.',
      icon: '🌿'
    },
    {
      title: 'Nervous System Reset',
      description: 'Transition effortlessly from fight-or-flight into restorative parasympathetic peace and deep calm.',
      icon: '💧'
    },
    {
      title: 'Enhanced Sleep Quality',
      description: 'Experience deeper, uninterrupted restorative sleep cycles that leave you refreshed every morning.',
      icon: '🌙'
    },
    {
      title: 'Holistic Longevity',
      description: 'Nurture mind, body, and spirit as an interconnected whole for lifelong health and vitality.',
      icon: '☀️'
    },
  ];

  return (
    <div className="wellness-page">
      <div className="wellness-hero">
        <div className="wellness-hero-overlay"></div>
        <div className="wellness-hero-content">
          <span className="wellness-hero-badge">Sanctuary of Peace</span>
          <h1>Sanctuary of Inner Peace</h1>
          <p>Embrace holistic mindfulness, restorative sleep, and emotional resilience for a balanced life.</p>
          <div className="wellness-hero-actions">
            <Link to="/classes" className="cta-button primary">Start Your Wellness Journey</Link>
          </div>
        </div>
      </div>

      <div className="wellness-content-container">
        <section className="wellness-intro-section">
          <div className="wellness-intro-badge">Holistic Integration</div>
          <h2>Cultivating Holistic Wellbeing</h2>
          <p>
            True wellness extends far beyond physical fitness—it is the harmonious integration of mind, body, and spirit. In our fast-paced world, carving out sacred moments for stillness, emotional grounding, and deep restoration is essential. Our wellness offerings are designed to guide you back to your center, helping you thrive with grace, clarity, and vitality.
          </p>
        </section>

        <section className="wellness-benefits-section">
          <div className="section-header">
            <h2>The Gift of Mindful Living</h2>
            <p>Embrace practices that nurture your inner sanctuary and restore lasting balance.</p>
          </div>
          <div className="wellness-benefits-grid">
            {benefits.map((b, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wellness-sections">
          <div className="section-header">
            <h2>Pillars of Holistic Wellness</h2>
            <p>Explore specialized practices designed to anchor your mind and rejuvenate your spirit.</p>
          </div>
          <div className="wellness-feature-container">
            {categories.map((item, index) => (
              <div className={`wellness-feature-card ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
                <div className="wellness-image-wrapper">
                  <img src={item.image} alt={item.title} />
                  <span className="wellness-tag">{item.tag}</span>
                </div>
                <div className="wellness-text-content">
                  <span className="wellness-subtitle">{item.subtitle}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="wellness-highlight-box">
                    <p className="benefit-highlight"><strong>Benefits:</strong> {item.benefits}</p>
                    <p className="tips-title">Practical Daily Tips:</p>
                    <ul>
                      {item.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wellness-cta-section">
          <div className="wellness-cta-bg"></div>
          <div className="wellness-cta-content">
            <h2>Begin Your Transformation Today</h2>
            <p>Take the first step toward a more centered, peaceful life by joining our guided mindfulness classes and wellness community.</p>
            <Link to="/classes" className="cta-button primary">Start Your Wellness Journey</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Wellness;
