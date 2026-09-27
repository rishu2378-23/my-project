import { Link } from 'react-router-dom';
import './Diet.css';

const Diet = () => {
  const plans = [
    {
      title: 'Weight Management',
      subtitle: 'Nourishing satiety & metabolism',
      description: 'Balanced caloric intake paired with nutrient-dense, fiber-rich whole foods to support healthy metabolism, lasting satiety, and gradual sustainable weight management.',
      benefits: 'Sustainable weight management, improved metabolism, stable all-day energy.',
      meals: ['Quinoa avocado & lime harvest bowl', 'Grilled herb chicken with steamed broccoli', 'Mixed antioxidant berries with Greek yogurt'],
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1000',
      tag: 'Metabolic Balance'
    },
    {
      title: 'Energy & Muscle',
      subtitle: 'High-protein fueling & recovery',
      description: 'High-protein, complex carbohydrate plans designed to fuel intense workouts, accelerate muscle recovery, and maintain peak physical performance throughout your busy day.',
      benefits: 'Increased physical strength, sustained vitality, rapid muscle recovery.',
      meals: ['Grass-fed beef steak with roasted sweet potato', 'Plant-powered superfood recovery smoothie', 'Steel-cut organic oats with raw seeds & nuts'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
      tag: 'Strength & Vitality'
    },
    {
      title: 'Balanced Wellness',
      subtitle: 'Anti-inflammatory & gut harmony',
      description: 'Wholesome, anti-inflammatory nutrition focusing on flourishing gut health, immune resilience, and steady mood regulation through colorful seasonal produce and healthy fats.',
      benefits: 'Overall vitality, stable emotional mood, optimal digestive health.',
      meals: ['Hearty organic lentil and root vegetable soup', 'Baked wild Alaskan salmon with asparagus', 'Tropical fresh fruit and mint salad'],
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000',
      tag: 'Holistic Nourishment'
    },
  ];

  const benefits = [
    {
      title: 'Sustained Vitality',
      description: 'Eliminates energy crashes by maintaining steady blood sugar levels throughout your entire day.',
      icon: '⚡'
    },
    {
      title: 'Cellular Regeneration',
      description: 'Provides essential antioxidants and vitamins that protect against oxidative stress and premature aging.',
      icon: '🌿'
    },
    {
      title: 'Digestive Harmony',
      description: 'Supports a flourishing gut microbiome, enhancing natural nutrient absorption and immune defense.',
      icon: '🍃'
    },
    {
      title: 'Emotional Balance',
      description: 'Nourishes the gut-brain axis, promoting serotonin production and a naturally calmer mood.',
      icon: '✨'
    },
  ];

  return (
    <div className="diet-page">
      <div className="diet-hero">
        <div className="diet-hero-overlay"></div>
        <div className="diet-hero-content">
          <span className="diet-hero-badge">Mindful Nutrition</span>
          <h1>Nourishing Your Body & Soul</h1>
          <p>Discover wholesome nutrition plans crafted to energize your spirit and nurture your physical well-being.</p>
          <div className="diet-hero-actions">
            <Link to="/wellness" className="cta-button primary">Explore Wellness</Link>
          </div>
        </div>
      </div>

      <div className="diet-content-container">
        <section className="diet-intro-section">
          <div className="diet-intro-badge">Nutritional Philosophy</div>
          <h2>The Power of Mindful Nutrition</h2>
          <p>
            Food is much more than fuel—it is information that communicates with every cell in your body. When you nourish yourself with wholesome, vibrant, plant-forward and balanced meals, you support clarity of mind, emotional stability, and radiant physical health. Our nutritional philosophy emphasizes quality, seasonality, and mindful enjoyment.
          </p>
        </section>

        <section className="diet-benefits-section">
          <div className="section-header">
            <h2>Benefits of Balanced Nutrition</h2>
            <p>Discover how wholesome, mindful eating transforms your daily vitality.</p>
          </div>
          <div className="diet-benefits-grid">
            {benefits.map((b, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="diet-sections">
          <div className="section-header">
            <h2>Specialized Nutritional Programs</h2>
            <p>Carefully crafted dietary paths designed to align with your personal wellness goals.</p>
          </div>
          <div className="diet-feature-container">
            {plans.map((plan, index) => (
              <div className={`diet-feature-card ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
                <div className="diet-image-wrapper">
                  <img src={plan.image} alt={plan.title} />
                  <span className="diet-tag">{plan.tag}</span>
                </div>
                <div className="diet-text-content">
                  <span className="diet-subtitle">{plan.subtitle}</span>
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                  <div className="diet-highlight-box">
                    <p className="benefit-highlight"><strong>Key Benefits:</strong> {plan.benefits}</p>
                    <p className="meals-title">Sample Meal Ideas:</p>
                    <ul>
                      {plan.meals.map((meal, i) => <li key={i}>{meal}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="diet-cta-section">
          <div className="diet-cta-bg"></div>
          <div className="diet-cta-content">
            <h2>Continue Your Wellness Journey</h2>
            <p>Pair mindful nutrition with daily mindfulness practices and holistic wellness approaches to achieve complete mind-body alignment.</p>
            <Link to="/wellness" className="cta-button primary">Explore Wellness</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Diet;
