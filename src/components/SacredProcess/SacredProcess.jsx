import React from 'react';
import { Leaf, FlaskConical, Hand, Sun } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    title: 'Sourcing',
    desc: 'We handpick the finest natural herbs, resins, and essential oils from trusted farms across India.',
  },
  {
    icon: FlaskConical,
    title: 'Blending',
    desc: 'Master perfumers create unique fragrance blends using recipes perfected over generations.',
  },
  {
    icon: Hand,
    title: 'Rolling',
    desc: 'Each stick is carefully hand-rolled by skilled artisans, ensuring consistent quality and burn.',
  },
  {
    icon: Sun,
    title: 'Drying',
    desc: 'Natural sun-drying preserves the purity of ingredients and enhances the lasting fragrance.',
  },
];

const SacredProcess = () => {
  return (
    <section className="sacred-process" id="process">
      <div className="section-container">
        <h2 className="section-title">The Sacred Process</h2>

        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.title} className="process-step">
              <div className="process-icon">
                <step.icon size={24} />
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SacredProcess;
