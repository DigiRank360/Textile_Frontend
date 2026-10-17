import React from 'react';
import { Leaf, Shirt, Palette, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    title: 'Yarn Sourcing',
    desc: 'We select the finest cotton, silk and blended yarns from trusted suppliers across India.',
  },
  {
    icon: Shirt,
    title: 'Weaving',
    desc: 'Skilled weavers and modern looms produce fabrics with precise texture, strength and drape.',
  },
  {
    icon: Palette,
    title: 'Dyeing & Printing',
    desc: 'Colour-fast dyes and detailed prints ensure vibrant, long-lasting shades in every batch.',
  },
  {
    icon: Sparkles,
    title: 'Finishing',
    desc: 'Every roll is softened, inspected and packed carefully to meet strict quality standards.',
  },
];

const SacredProcess = () => {
  return (
    <section className="sacred-process" id="process">
      <div className="section-container">
        <h2 className="section-title">Our Manufacturing Process</h2>

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
