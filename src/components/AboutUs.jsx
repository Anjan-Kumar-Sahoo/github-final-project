import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Paradise Nursery</h1>
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to Paradise Nursery, where green meets serenity! We are passionate about bringing 
            nature closer to you by offering a wide variety of beautiful houseplants that not only 
            enhance your living spaces but also purify the air and promote wellness.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Paradise Nursery, our mission is to provide high-quality houseplants that inspire 
            healthier lifestyles and create peaceful environments. We believe that every home deserves 
            a touch of nature, and we're here to make that happen with our carefully curated selection 
            of plants.
          </p>
        </div>
        
        <div className="about-section">
          <h2>What We Offer</h2>
          <p>
            We specialize in a diverse range of houseplants including:
          </p>
          <ul>
            <li><strong>Air Purifying Plants:</strong> Natural air filters for your home</li>
            <li><strong>Aromatic Fragrant Plants:</strong> Fill your space with natural fragrances</li>
            <li><strong>Insect Repellent Plants:</strong> Natural pest control solutions</li>
            <li><strong>Medicinal Plants:</strong> Traditional healing herbs and plants</li>
            <li><strong>Low Maintenance Plants:</strong> Perfect for busy lifestyles</li>
            <li><strong>Flowering Plants:</strong> Add color and beauty to your home</li>
          </ul>
        </div>
        
        <div className="about-section">
          <h2>Why Choose Us</h2>
          <p>
            With years of experience in horticulture and a deep love for plants, our team carefully 
            selects each plant to ensure you receive only the best quality. We provide detailed care 
            instructions and ongoing support to help your plants thrive. Whether you're a seasoned 
            plant parent or just starting your green journey, Paradise Nursery is here to guide you 
            every step of the way.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Our Commitment</h2>
          <p>
            We are committed to sustainability and eco-friendly practices. All our plants are grown 
            with care, using organic methods whenever possible. We believe in nurturing not just 
            plants, but also our relationship with the environment and our valued customers.
          </p>
        </div>
        
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions or need plant care advice? We're always here to help! 
            Join our growing community of plant lovers and transform your space into a green paradise.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
