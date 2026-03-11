export type Category = 'Software Development' | 'Data and AI' | 'Cloud and DevOps' | 'Security' | 'Product and Design' | 'Infrastructure';

export interface Role {
  id: string;
  title: string;
  category: Category;
  description: string;
  skills: string[];
  questions: string[];
}

export const categories: Category[] = [
  'Software Development',
  'Data and AI',
  'Cloud and DevOps',
  'Security',
  'Product and Design',
  'Infrastructure',
];

export const roles: Role[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Development',
    description: 'Designs, develops, and maintains software systems and applications.',
    skills: ['Programming Languages', 'System Design', 'Algorithms', 'Code Quality'],
    questions: [
      'What programming languages and frameworks do you primarily work with and what production systems have you built using them?',
      'Describe a complex software problem you solved and explain your approach.',
      'How do you ensure code quality scalability and maintainability in your projects?',
      'What experience do you have with system design and distributed systems?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples from your work?'
    ]
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Software Development',
    description: 'Specializes in building user interfaces and client-side web applications.',
    skills: ['HTML/CSS', 'JavaScript/TypeScript', 'React/Vue/Angular', 'Web Performance'],
    questions: [
      'Which frontend technologies and frameworks have you used in production applications?',
      'How do you optimize frontend performance for large scale web applications?',
      'How do you manage application state in modern frontend frameworks?',
      'How do you ensure accessibility responsiveness and cross browser compatibility?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with real project examples?'
    ]
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Software Development',
    description: 'Focuses on server-side logic, databases, and APIs.',
    skills: ['Node.js/Python/Java', 'API Design', 'Database Management', 'Security'],
    questions: [
      'Which backend languages frameworks and tools have you used in production systems?',
      'How do you design scalable APIs and microservices?',
      'Explain your experience with database design indexing and query optimization.',
      'How do you handle authentication authorization and API security?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Software Development',
    description: 'Proficient in both frontend and backend development.',
    skills: ['Frontend Frameworks', 'Backend Technologies', 'Databases', 'CI/CD'],
    questions: [
      'What technologies have you used across frontend backend and database layers?',
      'Describe a full stack project you built from scratch.',
      'How do you ensure performance scalability and maintainability across the stack?',
      'How do you handle deployments and CI pipelines for full stack applications?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    category: 'Software Development',
    description: 'Builds applications for mobile devices (iOS, Android, or cross-platform).',
    skills: ['iOS/Android', 'React Native/Flutter', 'Mobile UI/UX', 'API Integration'],
    questions: [
      'What platforms and frameworks have you used for mobile development?',
      'Describe a mobile application you developed and deployed to users.',
      'How do you optimize mobile app performance and battery usage?',
      'How do you handle API integration and offline functionality in mobile apps?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'android-developer',
    title: 'Android Developer',
    category: 'Software Development',
    description: 'Specializes in creating applications for the Android operating system.',
    skills: ['Kotlin/Java', 'Android SDK', 'App Lifecycle', 'Data Persistence'],
    questions: [
      'What Android frameworks tools and architectures have you used?',
      'How do you manage lifecycle and performance in Android apps?',
      'What experience do you have with Kotlin Java and Android SDK?',
      'How do you handle network calls caching and data persistence?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'ios-developer',
    title: 'iOS Developer',
    category: 'Software Development',
    description: 'Specializes in building applications for Apple devices.',
    skills: ['Swift', 'UIKit/SwiftUI', 'Memory Management', 'App Store Deployment'],
    questions: [
      'What tools and frameworks do you use for iOS development?',
      'What experience do you have with Swift UIKit and SwiftUI?',
      'How do you manage memory performance and background tasks in iOS apps?',
      'Describe an app you built and deployed on the App Store.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    category: 'Software Development',
    description: 'Creates interactive games for various platforms.',
    skills: ['Unity/Unreal', 'C++/C#', 'Physics Engines', 'Performance Optimization'],
    questions: [
      'What game engines and programming languages have you used?',
      'Describe a game you developed and the challenges you faced.',
      'How do you optimize performance in graphics intensive applications?',
      'What experience do you have with physics engines and rendering pipelines?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data and AI',
    description: 'Analyzes complex data to extract insights and build predictive models.',
    skills: ['Machine Learning', 'Python/R', 'Statistical Analysis', 'Data Visualization'],
    questions: [
      'What machine learning algorithms have you used in real world projects?',
      'Describe a project where your model produced meaningful insights.',
      'What tools do you use for data analysis visualization and modeling?',
      'How do you validate and evaluate machine learning models?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data and AI',
    description: 'Interprets data and turns it into information which can offer ways to improve a business.',
    skills: ['SQL', 'Excel', 'Tableau/PowerBI', 'Data Cleaning'],
    questions: [
      'What tools do you use for data analysis and reporting?',
      'Describe a dashboard or analysis that influenced business decisions.',
      'How do you clean preprocess and transform raw data?',
      'What statistical methods do you commonly apply in analysis?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    category: 'Data and AI',
    description: 'Builds systems that collect, manage, and convert raw data into usable information.',
    skills: ['ETL Pipelines', 'Big Data Tools', 'SQL/NoSQL', 'Data Orchestration'],
    questions: [
      'What data pipelines or ETL systems have you built?',
      'What tools do you use for data orchestration and pipeline monitoring?',
      'What experience do you have with big data tools like Spark Kafka or Hadoop?',
      'How do you ensure data reliability quality and scalability?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    category: 'Data and AI',
    description: 'Designs and builds machine learning models and systems.',
    skills: ['ML Frameworks', 'Model Deployment', 'Feature Engineering', 'Python'],
    questions: [
      'What ML frameworks and tools have you used in production?',
      'How do you deploy machine learning models into scalable systems?',
      'How do you handle feature engineering model tuning and evaluation?',
      'How do you monitor models after deployment?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Data and AI',
    description: 'Develops intelligent algorithms and systems that simulate human intelligence.',
    skills: ['Generative AI', 'LLMs', 'Model Training', 'AI Frameworks'],
    questions: [
      'What AI technologies or frameworks have you implemented in production?',
      'What experience do you have with generative AI or large language models?',
      'How do you manage AI model training inference and deployment?',
      'How do you measure model performance and accuracy?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'nlp-engineer',
    title: 'NLP Engineer',
    category: 'Data and AI',
    description: 'Specializes in natural language processing and text analysis.',
    skills: ['NLP Models', 'Text Processing', 'Machine Learning', 'Python'],
    questions: [
      'What NLP models and frameworks have you worked with?',
      'Describe an NLP project you built such as chatbots search or classification systems.',
      'How do you preprocess and clean text data for NLP tasks?',
      'What evaluation metrics do you use for NLP models?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'computer-vision-engineer',
    title: 'Computer Vision Engineer',
    category: 'Data and AI',
    description: 'Develops algorithms that allow computers to process and analyze visual data.',
    skills: ['Image Processing', 'Object Detection', 'Deep Learning', 'OpenCV'],
    questions: [
      'What computer vision frameworks have you used?',
      'What image processing or object detection projects have you built?',
      'How do you handle dataset preparation and labeling for vision models?',
      'What evaluation metrics do you use for vision models?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Cloud and DevOps',
    description: 'Bridges the gap between development and operations to improve software delivery.',
    skills: ['CI/CD', 'Docker/Kubernetes', 'Infrastructure Automation', 'Monitoring'],
    questions: [
      'What CI CD pipelines have you built or maintained?',
      'What experience do you have with containerization tools like Docker and Kubernetes?',
      'How do you manage infrastructure automation and monitoring?',
      'Describe a production incident you handled and resolved.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud and DevOps',
    description: 'Designs, implements, and manages cloud-based systems and infrastructure.',
    skills: ['AWS/Azure/GCP', 'Cloud Architecture', 'Infrastructure as Code', 'Security'],
    questions: [
      'What cloud platforms have you deployed applications on?',
      'How do you design scalable cloud architectures?',
      'What infrastructure as code tools have you used?',
      'How do you manage security access control and compliance in cloud environments?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'site-reliability-engineer',
    title: 'Site Reliability Engineer',
    category: 'Cloud and DevOps',
    description: 'Ensures that software systems are reliable, scalable, and highly available.',
    skills: ['System Reliability', 'Observability', 'Incident Management', 'Scalability'],
    questions: [
      'How do you ensure system reliability availability and fault tolerance?',
      'What monitoring and observability tools have you used?',
      'How do you handle incident management and production outages?',
      'How do you design systems that scale under heavy traffic?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Security',
    description: 'Protects computer systems and networks from security breaches and attacks.',
    skills: ['Security Frameworks', 'Vulnerability Management', 'Threat Detection', 'Incident Response'],
    questions: [
      'What security frameworks or standards are you familiar with?',
      'How do you detect and prevent security vulnerabilities?',
      'What tools do you use for threat detection or penetration testing?',
      'Describe a security incident you handled.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    category: 'Software Development',
    description: 'Ensures software quality through manual and automated testing.',
    skills: ['Test Planning', 'Test Automation', 'Bug Tracking', 'Quality Assurance'],
    questions: [
      'What types of testing have you performed manual automation performance or security testing?',
      'What tools or frameworks do you use for test automation?',
      'How do you design effective test cases and test plans?',
      'How do you collaborate with developers to improve product quality?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'automation-test-engineer',
    title: 'Automation Test Engineer',
    category: 'Software Development',
    description: 'Designs and builds automated testing frameworks and scripts.',
    skills: ['Automation Frameworks', 'Scripting', 'CI/CD Integration', 'Test Coverage'],
    questions: [
      'What automation frameworks have you built or used?',
      'What programming languages do you use for writing test scripts?',
      'How do you integrate automated testing into CI pipelines?',
      'How do you measure test coverage and reliability?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'performance-engineer',
    title: 'Performance Engineer',
    category: 'Software Development',
    description: 'Focuses on optimizing system performance and load capacity.',
    skills: ['Load Testing', 'Performance Analysis', 'Optimization', 'Monitoring'],
    questions: [
      'What tools do you use for load testing and performance analysis?',
      'How do you identify performance bottlenecks in applications?',
      'Describe a performance optimization project you worked on?',
      'What metrics do you monitor for system performance?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'database-administrator',
    title: 'Database Administrator',
    category: 'Infrastructure',
    description: 'Manages and maintains database systems for performance and reliability.',
    skills: ['Database Management', 'Backup/Recovery', 'Query Optimization', 'Monitoring'],
    questions: [
      'What database technologies have you worked with?',
      'How do you manage database backups replication and recovery?',
      'How do you optimize slow queries and database performance?',
      'What monitoring tools do you use for database health?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'database-engineer',
    title: 'Database Engineer',
    category: 'Infrastructure',
    description: 'Designs, builds, and optimizes database architectures.',
    skills: ['Schema Design', 'Relational/NoSQL', 'Indexing', 'Data Migration'],
    questions: [
      'How do you design scalable and efficient database schemas?',
      'What experience do you have with relational and non relational databases?',
      'How do you optimize queries and indexing strategies?',
      'How do you manage data migrations and schema changes?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    category: 'Software Development',
    description: 'Develops decentralized applications and smart contracts.',
    skills: ['Blockchain Platforms', 'Smart Contracts', 'Cryptography', 'Web3'],
    questions: [
      'What blockchain platforms have you built applications on?',
      'What experience do you have with smart contracts?',
      'How do you ensure smart contract security?',
      'What tools frameworks and languages do you use for blockchain development?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    category: 'Infrastructure',
    description: 'Designs and develops software for embedded devices and hardware.',
    skills: ['Microcontrollers', 'C/C++', 'Hardware Integration', 'Debugging'],
    questions: [
      'What microcontrollers processors or embedded platforms have you worked with in your projects?',
      'What programming languages and tools do you use for embedded development?',
      'Describe a real world embedded system you built and the challenges you faced.',
      'How do you debug hardware and software integration issues?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples from your work?'
    ]
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    category: 'Infrastructure',
    description: 'Designs, builds, and programs robotic systems.',
    skills: ['ROS', 'Sensor Integration', 'Control Systems', 'Simulation'],
    questions: [
      'What robotics frameworks or platforms have you worked with such as ROS?',
      'Describe a robotics system or robot you helped design or build.',
      'How do you integrate sensors actuators and control systems in robotics applications?',
      'What programming languages and simulation tools do you use for robotics development?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'ar-vr-developer',
    title: 'AR VR Developer',
    category: 'Software Development',
    description: 'Creates augmented and virtual reality experiences.',
    skills: ['Unity/Unreal', '3D Modeling', 'Performance Optimization', 'Interactive Design'],
    questions: [
      'What AR or VR frameworks tools or engines have you used such as Unity or Unreal?',
      'Describe an immersive application you built using AR or VR technologies.',
      'How do you optimize performance in AR VR applications?',
      'What challenges have you faced when building interactive immersive environments?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'iot-engineer',
    title: 'IoT Engineer',
    category: 'Infrastructure',
    description: 'Develops solutions for the Internet of Things, connecting devices to the cloud.',
    skills: ['IoT Platforms', 'Hardware Devices', 'Communication Protocols', 'Security'],
    questions: [
      'What IoT platforms hardware devices or protocols have you worked with?',
      'Describe an IoT system you built including devices connectivity and backend integration.',
      'What communication protocols do you commonly use such as MQTT or HTTP?',
      'How do you handle device security and data reliability in IoT systems?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    category: 'Infrastructure',
    description: 'Designs, implements, and manages computer networks.',
    skills: ['Networking Protocols', 'Network Architecture', 'Troubleshooting', 'Security'],
    questions: [
      'What networking technologies protocols or tools have you worked with?',
      'How do you design secure and reliable network architectures?',
      'Describe a network troubleshooting problem you solved.',
      'What monitoring tools do you use for network performance and security?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'systems-engineer',
    title: 'Systems Engineer',
    category: 'Infrastructure',
    description: 'Manages and monitors all installed systems and infrastructure.',
    skills: ['System Administration', 'Scalability', 'Diagnostics', 'Monitoring'],
    questions: [
      'What types of systems infrastructure or platforms have you managed or designed?',
      'How do you ensure system scalability reliability and availability?',
      'Describe a system failure you encountered and how you resolved it.',
      'What tools do you use for monitoring and system diagnostics?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'infrastructure-engineer',
    title: 'Infrastructure Engineer',
    category: 'Infrastructure',
    description: 'Builds and maintains the IT infrastructure that supports applications.',
    skills: ['Infrastructure Platforms', 'Automation', 'Reliability', 'Security'],
    questions: [
      'What infrastructure platforms tools or services have you worked with?',
      'How do you design scalable infrastructure for growing applications?',
      'What experience do you have with infrastructure automation?',
      'How do you ensure reliability security and monitoring in infrastructure environments?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'platform-engineer',
    title: 'Platform Engineer',
    category: 'Infrastructure',
    description: 'Builds internal tools and platforms to improve developer productivity.',
    skills: ['Internal Developer Platforms', 'Container Orchestration', 'Automation', 'Scalability'],
    questions: [
      'What internal developer platforms or tools have you built or maintained?',
      'How do you improve developer productivity through platform engineering?',
      'What experience do you have with container orchestration and infrastructure automation?',
      'How do you design platforms that scale across engineering teams?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'technical-support-engineer',
    title: 'Technical Support Engineer',
    category: 'Infrastructure',
    description: 'Provides technical assistance and resolves issues for customers or internal teams.',
    skills: ['Troubleshooting', 'Customer Support', 'Diagnostics', 'Communication'],
    questions: [
      'What types of technical products or systems have you supported?',
      'How do you diagnose and resolve complex technical issues for customers?',
      'Describe a challenging customer issue you solved successfully.',
      'How do you collaborate with engineering teams to resolve product problems?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'implementation-engineer',
    title: 'Implementation Engineer',
    category: 'Infrastructure',
    description: 'Deploys and configures software solutions for clients.',
    skills: ['Software Implementation', 'Project Management', 'System Integration', 'Client Communication'],
    questions: [
      'What experience do you have implementing software solutions for customers?',
      'Describe a product implementation project you handled from start to finish.',
      'How do you manage integration between client systems and your product?',
      'How do you handle technical challenges during deployment?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'solutions-architect',
    title: 'Solutions Architect',
    category: 'Infrastructure',
    description: 'Designs complex technical solutions to meet business needs.',
    skills: ['System Architecture', 'Cloud Computing', 'Distributed Systems', 'Business Alignment'],
    questions: [
      'Describe a complex system architecture you designed or implemented.',
      'How do you translate business requirements into technical solutions?',
      'What experience do you have with cloud architecture and distributed systems?',
      'How do you ensure scalability reliability and security in large systems?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    category: 'Cloud and DevOps',
    description: 'Oversees a company\'s cloud computing strategy and architecture.',
    skills: ['Cloud Platforms', 'High Availability', 'Cost Optimization', 'Security'],
    questions: [
      'What cloud platforms have you designed architectures for?',
      'Describe a large scale cloud architecture you implemented.',
      'How do you ensure high availability and fault tolerance in cloud systems?',
      'How do you manage cost optimization and security in cloud environments?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'enterprise-architect',
    title: 'Enterprise Architect',
    category: 'Infrastructure',
    description: 'Aligns IT strategy with business goals across the entire organization.',
    skills: ['Enterprise Architecture', 'Business Strategy', 'System Transformation', 'Architecture Frameworks'],
    questions: [
      'How do you design enterprise level technology architecture for large organizations?',
      'How do you align technology decisions with long term business strategy?',
      'Describe a transformation project where you redesigned enterprise systems.',
      'What architecture frameworks or standards are you familiar with?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'security-analyst',
    title: 'Security Analyst',
    category: 'Security',
    description: 'Monitors and analyzes security systems to protect against cyber threats.',
    skills: ['Security Monitoring', 'Threat Detection', 'Incident Investigation', 'Vulnerability Assessment'],
    questions: [
      'What security monitoring tools or systems have you worked with?',
      'How do you detect and respond to security threats in real time?',
      'Describe a security incident you analyzed or investigated.',
      'What experience do you have with vulnerability assessment?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'penetration-tester',
    title: 'Penetration Tester',
    category: 'Security',
    description: 'Simulates cyber attacks to identify vulnerabilities in systems.',
    skills: ['Penetration Testing', 'Vulnerability Discovery', 'Web App Security', 'Reporting'],
    questions: [
      'What tools and methodologies do you use for penetration testing?',
      'Describe a security vulnerability you discovered and how it was fixed.',
      'What experience do you have with web application security testing?',
      'How do you document and report vulnerabilities to development teams?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product and Design',
    description: 'Guides the success of a product and leads the cross-functional team that is responsible for improving it.',
    skills: ['Product Strategy', 'Prioritization', 'Customer Insights', 'Metrics'],
    questions: [
      'Describe a product you managed from idea to launch.',
      'How do you prioritize product features and roadmap decisions?',
      'How do you gather customer insights and feedback?',
      'What metrics do you use to measure product success?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'technical-product-manager',
    title: 'Technical Product Manager',
    category: 'Product and Design',
    description: 'Manages technically complex products, bridging the gap between engineering and business.',
    skills: ['Technical Feasibility', 'Product Requirements', 'Engineering Collaboration', 'Tradeoff Evaluation'],
    questions: [
      'How do you balance technical feasibility with product requirements?',
      'Describe a technically complex product you managed.',
      'How do you collaborate with engineering teams during product development?',
      'How do you evaluate tradeoffs between performance scalability and delivery timelines?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'technical-program-manager',
    title: 'Technical Program Manager',
    category: 'Product and Design',
    description: 'Oversees complex technical programs and coordinates across multiple teams.',
    skills: ['Program Management', 'Risk Management', 'Cross-team Coordination', 'Delivery'],
    questions: [
      'How do you manage large technical programs across multiple teams?',
      'What project management frameworks or tools do you use?',
      'How do you handle project risks dependencies and delays?',
      'Describe a technical program you successfully delivered.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'ui-designer',
    title: 'UI Designer',
    category: 'Product and Design',
    description: 'Designs the visual elements and interactive properties of user interfaces.',
    skills: ['Design Tools', 'Visual Consistency', 'Usability', 'Developer Collaboration'],
    questions: [
      'What design tools do you use in your workflow?',
      'Describe a UI design project you worked on.',
      'How do you ensure visual consistency and usability in designs?',
      'How do you collaborate with developers during implementation?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'ux-researcher',
    title: 'UX Researcher',
    category: 'Product and Design',
    description: 'Studies target users to collect and analyze data that will help inform the product design process.',
    skills: ['User Research', 'Data Analysis', 'Qualitative/Quantitative Methods', 'Insights Communication'],
    questions: [
      'What user research methods do you commonly use?',
      'Describe a research study that influenced product design decisions.',
      'How do you collect and analyze qualitative and quantitative user data?',
      'How do you communicate research insights to product teams?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    category: 'Product and Design',
    description: 'Oversees the design process of a product from start to finish.',
    skills: ['Design Thinking', 'Wireframing/Prototyping', 'Design Systems', 'Success Measurement'],
    questions: [
      'Describe a product design project you led from concept to launch.',
      'How do you combine user research with design thinking in your work?',
      'What tools do you use for wireframing prototyping and design systems?',
      'How do you measure the success of your design decisions?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'technical-writer',
    title: 'Technical Writer',
    category: 'Product and Design',
    description: 'Creates technical documentation, manuals, and guides for software products.',
    skills: ['Technical Documentation', 'Simplifying Concepts', 'Documentation Tools', 'Engineering Collaboration'],
    questions: [
      'What types of technical documentation have you created?',
      'How do you simplify complex technical concepts for non technical audiences?',
      'What tools or platforms do you use for documentation?',
      'How do you collaborate with engineers to ensure accurate documentation?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'business-intelligence-engineer',
    title: 'Business Intelligence Engineer',
    category: 'Data and AI',
    description: 'Develops and maintains BI solutions to help businesses make data-driven decisions.',
    skills: ['BI Tools', 'Data Modeling', 'Reporting', 'Data Accuracy'],
    questions: [
      'What BI tools and data platforms have you worked with?',
      'Describe a dashboard or analytics solution you built for business teams.',
      'How do you model data for reporting and analytics?',
      'How do you ensure accuracy and reliability in BI reports?',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'analytics-engineer',
    title: 'Analytics Engineer',
    category: 'Data and AI',
    description: 'Bridges the gap between data engineering and data analysis, building analytics data models.',
    skills: ['Data Modeling', 'Data Transformation', 'SQL/Data Warehouses', 'Analytics Platforms'],
    questions: [
      'What tools do you use for building analytics data models and pipelines?',
      'How do you transform raw data into analytics ready datasets?',
      'What experience do you have with SQL data warehouses or analytics platforms?',
      'Describe a project where your analytics work influenced business decisions.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  },
  {
    id: 'growth-engineer',
    title: 'Growth Engineer',
    category: 'Product and Design',
    description: 'Focuses on building features and running experiments to drive user acquisition and retention.',
    skills: ['Experimentation', 'A/B Testing', 'Data Analytics', 'Growth Strategies'],
    questions: [
      'What experiments or growth strategies have you implemented in products?',
      'How do you use data and analytics to improve product growth?',
      'What tools or frameworks do you use for experimentation and A B testing?',
      'Describe a growth initiative that significantly improved user engagement or conversion.',
      'Can you rate yourself for the skills you mentioned and justify those ratings with examples?'
    ]
  }
];
