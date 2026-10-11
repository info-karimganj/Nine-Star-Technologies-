const fs = require('fs');

const aboutPage = {
  hero: {
    title: "About 9STAR Technologies",
    description: "We are a dedicated team providing practical digital services and technology solutions to help people and organizations solve problems."
  },
  whoWeAre: {
    title: "Who We Are",
    p1: "9STAR Technologies is a digital problem-solving organization. We believe that technology should be accessible, practical, and focused on real-world results.",
    p2: "We are not just developers or consultants; we are partners who take the time to understand your unique challenges and deliver solutions that actually work."
  },
  whatWeDo: {
    title: "What We Do",
    p1: "We build websites, develop applications, automate business processes, and solve complex online challenges.",
    p2: "Whether you need a simple digital presence, help with complex documentation, or a complete operational automation system, we have the capability to guide you from concept to launch."
  },
  missionVision: {
    missionTitle: "Our Mission",
    missionDesc: "To simplify the digital landscape for our clients by providing straightforward, reliable, and high-quality technology solutions that solve tangible problems.",
    visionTitle: "Our Vision",
    visionDesc: "To become the most trusted and approachable technology partner for organizations looking to navigate and thrive in a digital-first world."
  },
  coreValues: {
    title: "Our Core Values",
    values: [
      {
        title: "Transparency",
        desc: "We speak plainly, set clear expectations, and keep you informed every step of the way. No hidden surprises."
      },
      {
        title: "Practicality",
        desc: "We focus on what works. We prioritize functional, effective solutions over unnecessary complexity."
      },
      {
        title: "Quality",
        desc: "We take pride in our craft. Our work is built to be secure, reliable, and scalable for the long term."
      },
      {
        title: "Human-Centric",
        desc: "Technology is for people. We design and build with the end-user in mind, ensuring our solutions are usable and accessible."
      }
    ]
  },
  howWeWork: {
    title: "How We Work",
    description: "Our process is designed to be clear, collaborative, and focused on delivering exactly what you need.",
    steps: [
      {
        title: "Understand",
        desc: "We start by listening. We learn about your goals, challenges, and requirements to ensure we have a clear picture."
      },
      {
        title: "Plan",
        desc: "We outline the solution, establish timelines, and agree on the deliverables so you know exactly what to expect."
      },
      {
        title: "Build",
        desc: "Our team develops the solution with regular check-ins, ensuring alignment with the plan and high-quality standards."
      },
      {
        title: "Deliver",
        desc: "We hand over the finished project, provide necessary training, and offer ongoing support to ensure your success."
      }
    ]
  },
  technology: {
    title: "Technology & Capability",
    p1: "We are technology agnostic, meaning we choose the right tools for your specific problem, rather than forcing a one-size-fits-all solution.",
    p2: "Our capabilities span modern web frameworks, native and cross-platform app development, secure backend infrastructure, and intelligent automation systems. We stay current with technology so you don't have to.",
    items: {
      web: { title: "Web", desc: "Responsive, accessible, and fast web applications." },
      mobile: { title: "Mobile", desc: "iOS and Android applications built for real users." },
      automation: { title: "Automation", desc: "Streamlined workflows and integrated systems." },
      infrastructure: { title: "Infrastructure", desc: "Secure, scalable, and reliable cloud hosting." }
    }
  },
  team: {
    title: "Our Team",
    placeholderTitle: "CMS Placeholder: Team Members",
    placeholderDesc: "This section is ready to be populated with your actual team profiles from the CMS. It will automatically render photos, roles, and short biographies for your leadership and core team members."
  },
  storyDirection: {
    storyTitle: "Our Story",
    storyPlaceholderTitle: "CMS Placeholder: Company History",
    storyPlaceholderDesc: "Update this section via the CMS to tell the story of how 9STAR Technologies was founded, the early challenges, and the milestones achieved along the way.",
    directionTitle: "Future Direction",
    directionPlaceholderTitle: "CMS Placeholder: Looking Forward",
    directionPlaceholderDesc: "Update this section via the CMS to share your strategic goals, upcoming service expansions, and your commitment to evolving alongside technology."
  },
  cta: {
    title: "Ready to work together?",
    description: "Whether you know exactly what you need or you're just starting to explore solutions, we're here to help. Let's discuss your next project.",
    explore: "Explore Our Services",
    contact: "Contact Us"
  }
};

['en', 'bn', 'ar'].forEach(lang => {
  const path = 'src/i18n/dictionaries/' + lang + '.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  data.aboutPage = aboutPage;
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});
