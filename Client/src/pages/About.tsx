import React from 'react';

const About = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      animation: 'fadeIn 2s ease-in-out',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      animation: 'pulse 2s infinite',
      textAlign: 'center',
      color: '#4A5568',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '1rem',
      color: '#2D3748',
    },
    paragraph: {
      fontSize: '1rem',
      marginBottom: '1.5rem',
      color: '#4A5568',
      lineHeight: '1.6',
    },
    list: {
      paddingLeft: '1.5rem',
      marginBottom: '1.5rem',
    },
    listItem: {
      marginBottom: '0.75rem',
      color: '#4A5568',
    },
    email: {
      color: '#3182CE',
      textDecoration: 'underline',
    },
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About HomeStay Kashmir</h1>
      <div>
        <p style={styles.paragraph}>
          Welcome to HomestayKashmir.com, your gateway to discovering the untouched charm of Jammu & Kashmir. Our platform is dedicated to showcasing offbeat tourism destinations and providing travelers with authentic, personalized experiences that go beyond the ordinary.<br /><br />
          At homestaykashmir.com, we believe that travel is not just about exploring places but also about connecting with people, stories, and traditions. Our homestays are designed to offer comfort and inclusivity, ensuring that there’s room for everyone – from solo travelers and families to adventure enthusiasts and peace seekers.<br /><br />
          From serene mountain villages to picturesque valleys untouched by mainstream tourism, our destinations invite you to step into the heart of Kashmiri culture and hospitality.
        </p>

        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.paragraph}>
          To redefine tourism in Jammu & Kashmir by not only showcasing its unmatched beauty but also by making hospitality the centerpiece of every travel experience. We strive to create a harmonious balance where our guests feel the magic of the region and the warmth of its people in equal measure.
        </p>

        <h2 style={styles.sectionTitle}>Our Story</h2>
        <p style={styles.paragraph}>
          Founded in 2024, homestaykashmir.com emerged from a vision to showcase Kashmir's legendary hospitality to the world while creating sustainable tourism opportunities for local communities.
        </p>

        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}><b>Room for Everyone:</b> Whether you’re a solo traveler seeking adventure, a couple looking for a romantic getaway, or a family on vacation, we have something special for every kind of guest.</li>
          <li style={styles.listItem}><b>Discover Hidden Gems:</b> Explore lesser-known destinations that showcase the breathtaking beauty of Jammu & Kashmir.</li>
          <li style={styles.listItem}><b>Unparalleled Hospitality:</b> Beyond the natural splendor, our mission is to ensure that the beauty of Kashmir is matched by the warmth of our hospitality.</li>
          <li style={styles.listItem}><b>Authentic Experiences:</b> Stay with local families to experience Kashmiri traditions, cuisine, and culture firsthand.</li>
          <li style={styles.listItem}><b>Sustainable Tourism:</b> Support local communities and promote responsible travel by choosing Homestaykashmir.com.</li>
        </ul>

        <h2 style={styles.sectionTitle}>Explore With Us</h2>
        <p style={styles.paragraph}>
          Whether you’re seeking adventure, serenity, or a cultural escape, homestaykashmir.com offers an experience where the beauty of the land is only rivaled by the hospitality of its people. <br /><br />
          Let us guide you to serene locales, welcome you like family, and ensure your stay is filled with comfort, joy, and unforgettable memories. <br /><br />
          Experience the soul of Jammu & Kashmir with HomestayKashmir.com – like home “there is room for everyone.”<br /><br />
          For inquiries and bookings, please reach out to us directly at <a href="mailto:info@homestaykashmir.com" style={styles.email}>info@homestaykashmir.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
