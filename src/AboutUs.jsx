import './AboutUs.css';

// Data lives in an array, and .map() below turns each entry into a card
const highlights = [
  {
    icon: '🌱',
    title: 'Hand-Picked Plants',
    text: 'Every plant is chosen by our growers for its health, shape, and easy care.',
  },
  {
    icon: '🚚',
    title: 'Safe Delivery',
    text: 'Carefully packed so your plants arrive fresh, upright, and ready to thrive.',
  },
  {
    icon: '💚',
    title: 'Care Guidance',
    text: 'Simple watering and light tips for every plant, even if you are a beginner.',
  },
];

function AboutUs() {
  return (
    <section className="about-us" id="about">
      <h2 className="about-title">About Paradise Nursery</h2>
      <p className="about-text">
        Paradise Nursery is a family-run plant shop with one simple mission: to
        make every home and workspace greener, calmer, and more alive. Since
        2015 we have grown and delivered thousands of houseplants, from tiny
        succulents to statement foliage, all chosen to be beginner friendly.
      </p>
      <p className="about-text">
        We believe plants do more than look beautiful. They freshen the air,
        lift your mood, and turn a space into a place you love to be. Whether
        you are starting your first collection or adding to a jungle, we are
        here to help your plants flourish.
      </p>

      <div className="about-cards">
        {highlights.map((item) => (
          <div className="about-card" key={item.title}>
            <span className="about-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutUs;