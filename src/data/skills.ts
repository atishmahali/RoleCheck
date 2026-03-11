export type SkillCategory = 'Programming Languages' | 'Frontend Technologies' | 'Backend Technologies' | 'Databases' | 'Cloud and DevOps' | 'Data Engineering' | 'Machine Learning and AI' | 'Security' | 'Product and Analytics' | 'Other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  questions: string[];
}

export const skillCategories: SkillCategory[] = [
  'Programming Languages',
  'Frontend Technologies',
  'Backend Technologies',
  'Databases',
  'Cloud and DevOps',
  'Data Engineering',
  'Machine Learning and AI',
  'Security',
  'Product and Analytics',
  'Other'
];

export const skills: Skill[] = [
  {
    "id": "python",
    "name": "Python",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Python skills.",
    "questions": [
      "What types of applications or systems have you built using Python in production environments",
      "What Python frameworks or libraries do you commonly use and why",
      "How do you manage performance and memory efficiency in Python applications",
      "Describe a complex problem you solved using Python and the approach you used",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "java",
    "name": "Java",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Java skills.",
    "questions": [
      "What enterprise applications or backend systems have you built using Java",
      "What Java frameworks such as Spring or Hibernate have you used in production",
      "How do you manage concurrency and multithreading in Java applications",
      "How do you design scalable Java services for high traffic systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for JavaScript skills.",
    "questions": [
      "What web applications have you built using JavaScript",
      "How do you manage asynchronous programming in JavaScript",
      "What frontend or backend frameworks have you used with JavaScript",
      "How do you structure maintainable and scalable JavaScript applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for TypeScript skills.",
    "questions": [
      "What projects have you built using TypeScript and why did you choose it over JavaScript",
      "How do you design strong type systems for large applications",
      "How do you integrate TypeScript with modern frameworks like React or Node",
      "What benefits have you seen when migrating a codebase from JavaScript to TypeScript",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "cpp",
    "name": "C++",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for C++ skills.",
    "questions": [
      "What types of systems or applications have you developed using C++",
      "How do you manage memory allocation and avoid memory leaks in C++",
      "What experience do you have with object oriented programming in C++",
      "How do you optimize performance in C++ based applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "csharp",
    "name": "C#",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for C# skills.",
    "questions": [
      "What applications have you built using C# and the .NET framework",
      "What experience do you have with ASP.NET for building web applications",
      "How do you handle asynchronous programming in C#",
      "How do you structure scalable enterprise applications using C#",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "go",
    "name": "Go (Golang)",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Go skills.",
    "questions": [
      "What backend services or distributed systems have you built using Go",
      "How do you handle concurrency using goroutines and channels",
      "How do you structure Go projects for maintainability and scalability",
      "What performance advantages have you experienced while using Go",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "rust",
    "name": "Rust",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Rust skills.",
    "questions": [
      "What systems programming projects have you built using Rust",
      "How do you manage memory safety using Rust ownership and borrowing concepts",
      "What experience do you have with asynchronous programming in Rust",
      "What benefits have you seen when using Rust compared to other systems languages",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "html",
    "name": "HTML",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for HTML skills.",
    "questions": [
      "What types of web pages or applications have you structured using HTML",
      "How do you ensure semantic and accessible HTML structure",
      "How do you optimize HTML markup for performance and SEO",
      "What accessibility standards do you follow while writing HTML",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "css",
    "name": "CSS",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for CSS skills.",
    "questions": [
      "What responsive layouts or UI systems have you built using CSS",
      "How do you manage scalable CSS architecture in large projects",
      "What experience do you have with CSS frameworks or preprocessors",
      "How do you optimize CSS performance for large web applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "tailwind-css",
    "name": "Tailwind CSS",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for Tailwind CSS skills.",
    "questions": [
      "What projects have you built using Tailwind CSS",
      "How do you maintain design consistency using utility based styling",
      "How do you customize Tailwind configuration for large applications",
      "What advantages do you see in using Tailwind compared to traditional CSS frameworks",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "redux",
    "name": "Redux",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for Redux skills.",
    "questions": [
      "What applications have you built using Redux for state management",
      "How do you structure Redux stores for large scale applications",
      "How do you handle asynchronous actions using Redux middleware",
      "How do you debug state related issues in Redux applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "graphql",
    "name": "GraphQL",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for GraphQL skills.",
    "questions": [
      "What APIs have you designed or consumed using GraphQL",
      "How do you design GraphQL schemas for scalable applications",
      "What strategies do you use for optimizing GraphQL queries",
      "How do you manage authentication and authorization in GraphQL APIs",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "rest-api-development",
    "name": "REST API Development",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for REST API Development skills.",
    "questions": [
      "What production APIs have you built using REST architecture",
      "How do you design scalable and versioned REST APIs",
      "How do you secure REST APIs against common vulnerabilities",
      "How do you document APIs for developers and consumers",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "microservices-architecture",
    "name": "Microservices Architecture",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Microservices Architecture skills.",
    "questions": [
      "What systems have you built using microservices architecture",
      "How do you manage communication between microservices",
      "How do you ensure resilience and fault tolerance in distributed systems",
      "What tools do you use for service monitoring and logging",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "system-design",
    "name": "System Design",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for System Design skills.",
    "questions": [
      "Describe a scalable system architecture you have designed",
      "How do you handle high traffic systems and load balancing",
      "What tradeoffs do you consider when designing distributed systems",
      "How do you ensure reliability and scalability in large systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "linux",
    "name": "Linux",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Linux skills.",
    "questions": [
      "What types of systems have you administered using Linux",
      "How do you monitor and troubleshoot Linux server performance",
      "What shell commands and tools do you frequently use",
      "How do you manage processes networking and system resources in Linux",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "bash-scripting",
    "name": "Bash Scripting",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Bash Scripting skills.",
    "questions": [
      "What automation tasks have you implemented using Bash scripts",
      "How do you structure scripts for reliability and maintainability",
      "How do you debug issues in shell scripts",
      "What system administration tasks have you automated using Bash",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "git",
    "name": "Git",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Git skills.",
    "questions": [
      "How do you manage version control workflows using Git",
      "What branching strategies have you used in team projects",
      "How do you resolve merge conflicts in collaborative repositories",
      "What Git tools or platforms do you commonly use",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "ci-cd",
    "name": "CI CD",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for CI CD skills.",
    "questions": [
      "What CI CD pipelines have you built or maintained",
      "What tools do you use for automated build and deployment",
      "How do you ensure safe deployments using CI CD practices",
      "How do you manage testing and code quality checks in pipelines",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Terraform skills.",
    "questions": [
      "What infrastructure have you provisioned using Terraform",
      "How do you structure Terraform modules for large projects",
      "How do you manage state and environment configurations in Terraform",
      "What cloud services have you automated using Terraform",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "apache-kafka",
    "name": "Apache Kafka",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Apache Kafka skills.",
    "questions": [
      "What streaming systems have you built using Kafka",
      "How do you design producers consumers and topics in Kafka",
      "How do you ensure message reliability and ordering",
      "How do you monitor Kafka clusters in production",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "rabbitmq",
    "name": "RabbitMQ",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for RabbitMQ skills.",
    "questions": [
      "What systems have you built using message queues with RabbitMQ",
      "How do you design reliable messaging architectures",
      "How do you handle message retries and failures",
      "How do you scale messaging systems in distributed environments",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "redis",
    "name": "Redis",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for Redis skills.",
    "questions": [
      "What applications have you built using Redis as a caching layer",
      "How do you manage Redis performance and memory usage",
      "What data structures have you used in Redis for performance optimization",
      "How do you ensure persistence and replication in Redis deployments",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "elasticsearch",
    "name": "Elasticsearch",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for Elasticsearch skills.",
    "questions": [
      "What search or analytics systems have you built using Elasticsearch",
      "How do you design indexes and queries for performance",
      "How do you handle scaling and cluster management in Elasticsearch",
      "How do you troubleshoot slow search queries",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-warehousing",
    "name": "Data Warehousing",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Data Warehousing skills.",
    "questions": [
      "What data warehouses have you worked with in production systems",
      "How do you design scalable data warehouse schemas",
      "How do you handle ETL pipelines for data warehousing",
      "How do you optimize analytical queries for large datasets",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "feature-engineering",
    "name": "Feature Engineering",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Feature Engineering skills.",
    "questions": [
      "What techniques have you used for feature engineering in machine learning projects",
      "How do you select and transform features for model performance",
      "What tools do you use for feature processing pipelines",
      "How do you avoid data leakage in feature engineering",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "model-deployment",
    "name": "Model Deployment",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Model Deployment skills.",
    "questions": [
      "What machine learning models have you deployed into production",
      "What tools or frameworks do you use for model deployment",
      "How do you monitor model performance after deployment",
      "How do you manage versioning and rollback of models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "a-b-testing",
    "name": "A B Testing",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for A B Testing skills.",
    "questions": [
      "What experiments have you run using A B testing methodologies",
      "How do you design statistically valid experiments",
      "What tools do you use for experiment tracking and analysis",
      "How do you interpret experiment results for business decisions",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "product-analytics",
    "name": "Product Analytics",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Product Analytics skills.",
    "questions": [
      "What product metrics do you track to measure user engagement",
      "What tools do you use for product analytics",
      "How do you analyze user behavior to improve product features",
      "Describe a product improvement driven by analytics insights",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-visualization",
    "name": "Data Visualization",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Data Visualization skills.",
    "questions": [
      "What tools do you use to build data visualizations",
      "How do you design dashboards that communicate insights clearly",
      "How do you handle large datasets in visualization tools",
      "What principles do you follow for effective data storytelling",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "next-js",
    "name": "Next.js",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for Next.js skills.",
    "questions": [
      "What production applications have you built using Next.js",
      "How do you manage server side rendering and static site generation in Next.js",
      "How do you optimize performance and SEO in Next.js applications",
      "How do you structure scalable Next.js projects with routing and APIs",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "vue-js",
    "name": "Vue.js",
    "category": "Frontend Technologies",
    "description": "Screening questions and evaluation criteria for Vue.js skills.",
    "questions": [
      "What applications have you built using Vue.js",
      "How do you manage state in Vue based applications",
      "What experience do you have with Vue components and lifecycle methods",
      "How do you optimize performance in large Vue applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "django",
    "name": "Django",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Django skills.",
    "questions": [
      "What web applications have you built using Django",
      "How do you structure Django projects for scalability",
      "How do you handle authentication and permissions in Django applications",
      "What experience do you have with Django REST framework",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "flask",
    "name": "Flask",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Flask skills.",
    "questions": [
      "What backend services or APIs have you built using Flask",
      "How do you structure Flask applications for maintainability",
      "What extensions or libraries have you used with Flask",
      "How do you secure Flask APIs and manage authentication",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "spring-boot",
    "name": "Spring Boot",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Spring Boot skills.",
    "questions": [
      "What enterprise applications have you built using Spring Boot",
      "How do you design microservices using Spring Boot",
      "How do you handle dependency injection and configuration in Spring Boot",
      "How do you secure REST APIs in Spring Boot applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "hibernate",
    "name": "Hibernate",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Hibernate skills.",
    "questions": [
      "What applications have you built using Hibernate ORM",
      "How do you manage entity relationships and mappings in Hibernate",
      "How do you optimize database queries generated by Hibernate",
      "What challenges have you faced while using ORM frameworks",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "postgresql",
    "name": "PostgreSQL",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for PostgreSQL skills.",
    "questions": [
      "What production systems have you built using PostgreSQL",
      "How do you design efficient schemas in PostgreSQL",
      "How do you optimize complex queries in PostgreSQL",
      "What experience do you have with indexing and partitioning in PostgreSQL",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "mysql",
    "name": "MySQL",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for MySQL skills.",
    "questions": [
      "What applications have you built using MySQL databases",
      "How do you optimize slow queries in MySQL",
      "How do you design normalized relational schemas",
      "What strategies do you use for backup and replication in MySQL",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "firebase",
    "name": "Firebase",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for Firebase skills.",
    "questions": [
      "What mobile or web applications have you built using Firebase",
      "How do you manage authentication and database services in Firebase",
      "How do you structure Firebase data for scalable applications",
      "What Firebase tools have you used for analytics and notifications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "supabase",
    "name": "Supabase",
    "category": "Databases",
    "description": "Screening questions and evaluation criteria for Supabase skills.",
    "questions": [
      "What applications have you built using Supabase as a backend",
      "How do you manage authentication and database queries in Supabase",
      "How do you structure scalable backend architecture using Supabase",
      "What advantages have you seen using Supabase compared to traditional backend systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "jenkins",
    "name": "Jenkins",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Jenkins skills.",
    "questions": [
      "What CI pipelines have you built using Jenkins",
      "How do you automate build testing and deployment processes in Jenkins",
      "How do you manage Jenkins plugins and pipeline configurations",
      "How do you troubleshoot failures in CI pipelines",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "github-actions",
    "name": "GitHub Actions",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for GitHub Actions skills.",
    "questions": [
      "What workflows have you built using GitHub Actions",
      "How do you automate build testing and deployment using GitHub Actions",
      "How do you manage secrets and environment variables in workflows",
      "What strategies do you use for reliable CI pipelines",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "prometheus",
    "name": "Prometheus",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Prometheus skills.",
    "questions": [
      "What monitoring systems have you implemented using Prometheus",
      "How do you collect and visualize metrics in distributed systems",
      "How do you design alerting rules for production environments",
      "How do you troubleshoot performance issues using monitoring data",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "grafana",
    "name": "Grafana",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Grafana skills.",
    "questions": [
      "What dashboards have you created using Grafana",
      "How do you visualize system performance metrics effectively",
      "What data sources have you integrated with Grafana",
      "How do you design dashboards for operations and engineering teams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "apache-airflow",
    "name": "Apache Airflow",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Apache Airflow skills.",
    "questions": [
      "What data pipelines have you orchestrated using Apache Airflow",
      "How do you design scalable workflows in Airflow",
      "How do you manage scheduling retries and monitoring in Airflow pipelines",
      "How do you handle failures in production data workflows",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "scikit-learn",
    "name": "Scikit Learn",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Scikit Learn skills.",
    "questions": [
      "What machine learning models have you built using Scikit Learn",
      "How do you handle feature selection and preprocessing",
      "What techniques do you use for model evaluation",
      "What challenges have you faced while building ML models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "computer-vision",
    "name": "Computer Vision",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Computer Vision skills.",
    "questions": [
      "What computer vision applications have you developed",
      "What frameworks or libraries have you used for image processing",
      "How do you prepare datasets for computer vision tasks",
      "What metrics do you use to evaluate vision models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "natural-language-processing",
    "name": "Natural Language Processing",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Natural Language Processing skills.",
    "questions": [
      "What NLP systems such as chatbots or text classifiers have you built",
      "What libraries or frameworks have you used for NLP",
      "How do you preprocess text data for machine learning models",
      "What evaluation metrics do you use for NLP models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "reinforcement-learning",
    "name": "Reinforcement Learning",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Reinforcement Learning skills.",
    "questions": [
      "What reinforcement learning problems have you worked on",
      "What algorithms such as Q learning or policy gradients have you implemented",
      "How do you design reward functions for RL models",
      "What tools or environments have you used for training RL agents",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "feature-stores",
    "name": "Feature Stores",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Feature Stores skills.",
    "questions": [
      "What feature store systems have you worked with in ML pipelines",
      "How do you manage feature consistency between training and production",
      "How do you design feature pipelines for scalable ML systems",
      "What tools have you used for feature management",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-governance",
    "name": "Data Governance",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Data Governance skills.",
    "questions": [
      "What data governance frameworks have you implemented",
      "How do you ensure data quality and compliance in organizations",
      "What tools do you use for managing data catalogs and lineage",
      "How do you enforce data policies across teams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-privacy",
    "name": "Data Privacy",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Data Privacy skills.",
    "questions": [
      "What data privacy standards or regulations have you worked with",
      "How do you protect sensitive user data in applications",
      "What tools or processes do you use for privacy compliance",
      "How do you handle data anonymization and encryption",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "growth-analytics",
    "name": "Growth Analytics",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Growth Analytics skills.",
    "questions": [
      "What growth metrics do you track to evaluate product performance",
      "How do you analyze user acquisition and retention data",
      "What tools do you use for growth analytics",
      "Describe a growth strategy driven by data insights",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "conversion-rate-optimization",
    "name": "Conversion Rate Optimization",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Conversion Rate Optimization skills.",
    "questions": [
      "What strategies have you used to improve conversion rates",
      "What tools do you use for conversion tracking and experimentation",
      "How do you analyze user behavior to identify optimization opportunities",
      "Describe a successful optimization experiment you ran",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "marketing-automation",
    "name": "Marketing Automation",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Marketing Automation skills.",
    "questions": [
      "What marketing automation platforms have you worked with",
      "How do you design automated customer journeys",
      "What metrics do you track to evaluate automation campaigns",
      "How do you integrate marketing automation with CRM systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "react-native",
    "name": "React Native",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for React Native skills.",
    "questions": [
      "What mobile applications have you built using React Native",
      "How do you manage state and navigation in React Native apps",
      "How do you optimize performance in cross platform mobile applications",
      "How do you handle native module integration in React Native",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "flutter",
    "name": "Flutter",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Flutter skills.",
    "questions": [
      "What mobile applications have you built using Flutter",
      "How do you manage state in Flutter applications",
      "How do you structure scalable Flutter applications for large projects",
      "How do you optimize UI performance and responsiveness in Flutter",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "swift",
    "name": "Swift",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Swift skills.",
    "questions": [
      "What iOS applications have you built using Swift",
      "How do you manage memory and performance in Swift applications",
      "What experience do you have with SwiftUI or UIKit",
      "How do you structure maintainable iOS application architecture",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "kotlin",
    "name": "Kotlin",
    "category": "Programming Languages",
    "description": "Screening questions and evaluation criteria for Kotlin skills.",
    "questions": [
      "What Android applications have you built using Kotlin",
      "How do you use coroutines for asynchronous programming in Kotlin",
      "What Android architecture patterns have you used such as MVVM",
      "How do you manage performance and lifecycle events in Android apps",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "apache-spark",
    "name": "Apache Spark",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Apache Spark skills.",
    "questions": [
      "What large scale data processing systems have you built using Apache Spark",
      "How do you optimize Spark jobs for performance",
      "What experience do you have with Spark SQL and Spark Streaming",
      "How do you debug failures in distributed Spark jobs",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "hadoop-ecosystem",
    "name": "Hadoop Ecosystem",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Hadoop Ecosystem skills.",
    "questions": [
      "What big data projects have you worked on using Hadoop tools",
      "What experience do you have with HDFS Hive or MapReduce",
      "How do you manage large scale data pipelines in Hadoop environments",
      "How do you monitor and maintain Hadoop clusters",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "snowflake",
    "name": "Snowflake",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Snowflake skills.",
    "questions": [
      "What data warehousing solutions have you built using Snowflake",
      "How do you design scalable schemas for Snowflake data warehouses",
      "How do you optimize performance for analytical queries in Snowflake",
      "What experience do you have with Snowflake data sharing and pipelines",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "bigquery",
    "name": "BigQuery",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for BigQuery skills.",
    "questions": [
      "What analytics or data platforms have you built using BigQuery",
      "How do you optimize queries for large datasets in BigQuery",
      "How do you manage data ingestion pipelines into BigQuery",
      "What tools do you use alongside BigQuery for analytics workflows",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "looker",
    "name": "Looker",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Looker skills.",
    "questions": [
      "What business intelligence dashboards have you built using Looker",
      "How do you design data models using LookML",
      "How do you ensure data accuracy and reliability in BI reports",
      "How do you work with stakeholders to deliver actionable insights",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "metabase",
    "name": "Metabase",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Metabase skills.",
    "questions": [
      "What dashboards or reports have you built using Metabase",
      "How do you connect Metabase with multiple data sources",
      "How do you design dashboards that support business decisions",
      "How do you optimize queries used in dashboards",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "cybersecurity",
    "name": "Cybersecurity",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for Cybersecurity skills.",
    "questions": [
      "What security systems or practices have you implemented in applications",
      "How do you identify vulnerabilities in software systems",
      "What tools do you use for threat detection and security monitoring",
      "How do you handle incident response during security breaches",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "ethical-hacking",
    "name": "Ethical Hacking",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for Ethical Hacking skills.",
    "questions": [
      "What penetration testing projects have you worked on",
      "What tools do you commonly use for vulnerability assessment",
      "How do you report and prioritize security vulnerabilities",
      "What experience do you have with web application security testing",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "network-security",
    "name": "Network Security",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for Network Security skills.",
    "questions": [
      "What network security systems have you implemented or managed",
      "How do you secure network infrastructure against threats",
      "What tools do you use for network monitoring and intrusion detection",
      "How do you analyze and respond to suspicious network activity",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "blockchain",
    "name": "Blockchain",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Blockchain skills.",
    "questions": [
      "What blockchain applications have you built or contributed to",
      "What platforms such as Ethereum or Hyperledger have you worked with",
      "How do you design secure smart contracts",
      "What challenges have you faced in blockchain scalability or security",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "smart-contract-development",
    "name": "Smart Contract Development",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Smart Contract Development skills.",
    "questions": [
      "What smart contracts have you developed in production environments",
      "What programming languages such as Solidity have you used",
      "How do you test and audit smart contracts for security",
      "How do you handle gas optimization and performance",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "iot-development",
    "name": "IoT Development",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for IoT Development skills.",
    "questions": [
      "What IoT systems or devices have you built or integrated",
      "What communication protocols have you used for IoT devices",
      "How do you manage device security and data reliability",
      "How do you process and analyze IoT data streams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "robotics-programming",
    "name": "Robotics Programming",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Robotics Programming skills.",
    "questions": [
      "What robotics systems or robots have you programmed",
      "What frameworks such as ROS have you used",
      "How do you integrate sensors and control systems in robotics applications",
      "How do you test and simulate robotics systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "computer-graphics",
    "name": "Computer Graphics",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Computer Graphics skills.",
    "questions": [
      "What graphics applications or engines have you worked with",
      "What experience do you have with rendering pipelines and shaders",
      "What tools or frameworks do you use for graphics development",
      "How do you optimize rendering performance in graphics applications",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "unity-development",
    "name": "Unity Development",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Unity Development skills.",
    "questions": [
      "What games or simulations have you built using Unity",
      "How do you structure large Unity projects",
      "What experience do you have with physics systems and rendering in Unity",
      "How do you optimize game performance across platforms",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "unreal-engine",
    "name": "Unreal Engine",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Unreal Engine skills.",
    "questions": [
      "What applications or games have you built using Unreal Engine",
      "How do you design complex gameplay systems in Unreal",
      "What experience do you have with Blueprint and C++ integration",
      "How do you optimize performance in Unreal Engine projects",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "ux-research",
    "name": "UX Research",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for UX Research skills.",
    "questions": [
      "What user research methods do you commonly use in product development",
      "Describe a research study that significantly influenced product design",
      "How do you analyze qualitative and quantitative user data",
      "How do you communicate research insights to product teams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "design-systems",
    "name": "Design Systems",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Design Systems skills.",
    "questions": [
      "What design systems have you created or contributed to",
      "How do you ensure consistency across product interfaces",
      "What tools do you use for managing design systems",
      "How do you collaborate with developers to implement design systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "technical-documentation",
    "name": "Technical Documentation",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Technical Documentation skills.",
    "questions": [
      "What types of technical documentation have you written",
      "How do you explain complex technical concepts to non technical audiences",
      "What tools do you use for writing and managing documentation",
      "How do you ensure documentation stays updated with product changes",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "crm-systems",
    "name": "CRM Systems",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for CRM Systems skills.",
    "questions": [
      "What CRM platforms have you worked with",
      "How do you design workflows and automations within CRM systems",
      "How do you integrate CRM systems with other business tools",
      "What metrics do you track to evaluate CRM effectiveness",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "sales-analytics",
    "name": "Sales Analytics",
    "category": "Product and Analytics",
    "description": "Screening questions and evaluation criteria for Sales Analytics skills.",
    "questions": [
      "What sales analytics dashboards or systems have you built",
      "What tools do you use for analyzing sales performance data",
      "How do you identify trends and opportunities from sales data",
      "Describe a decision that was influenced by your sales analysis",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "fastapi",
    "name": "FastAPI",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for FastAPI skills.",
    "questions": [
      "What APIs or backend systems have you built using FastAPI",
      "How do you structure FastAPI projects for scalability and maintainability",
      "How do you handle authentication and request validation in FastAPI",
      "What experience do you have with asynchronous endpoints in FastAPI",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "express-js",
    "name": "Express.js",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for Express.js skills.",
    "questions": [
      "What backend services have you built using Express.js",
      "How do you structure Express applications for large projects",
      "How do you manage middleware and routing in Express.js",
      "How do you handle security and authentication in Express APIs",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "nestjs",
    "name": "NestJS",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for NestJS skills.",
    "questions": [
      "What backend applications have you built using NestJS",
      "How do you structure modules controllers and services in NestJS",
      "How do you manage dependency injection in NestJS applications",
      "What experience do you have with building scalable APIs using NestJS",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "websockets",
    "name": "WebSockets",
    "category": "Backend Technologies",
    "description": "Screening questions and evaluation criteria for WebSockets skills.",
    "questions": [
      "What real time applications have you built using WebSockets",
      "How do you manage persistent connections between clients and servers",
      "What tools or frameworks have you used to implement WebSocket communication",
      "How do you handle scalability in real time systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "web-performance-optimization",
    "name": "Web Performance Optimization",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Web Performance Optimization skills.",
    "questions": [
      "What techniques do you use to improve web application performance",
      "How do you identify performance bottlenecks in web applications",
      "What tools do you use to analyze page speed and performance metrics",
      "Describe a performance optimization you implemented that significantly improved load times",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "api-gateway",
    "name": "API Gateway",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for API Gateway skills.",
    "questions": [
      "What API gateway solutions have you worked with in production systems",
      "How do you manage routing authentication and rate limiting using API gateways",
      "How do you design scalable architectures using API gateways",
      "What challenges have you faced while managing API traffic",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "oauth-authentication",
    "name": "OAuth Authentication",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for OAuth Authentication skills.",
    "questions": [
      "What applications have you secured using OAuth based authentication",
      "How do you implement OAuth flows in web or mobile applications",
      "How do you manage token security and expiration",
      "What challenges have you faced while integrating OAuth providers",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "jwt-authentication",
    "name": "JWT Authentication",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for JWT Authentication skills.",
    "questions": [
      "What applications have you built using JWT for authentication",
      "How do you securely generate and validate JWT tokens",
      "How do you manage token expiration and refresh mechanisms",
      "What security risks should be considered when using JWT",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "serverless-architecture",
    "name": "Serverless Architecture",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Serverless Architecture skills.",
    "questions": [
      "What applications have you built using serverless technologies",
      "What platforms such as AWS Lambda or Cloud Functions have you used",
      "How do you design scalable serverless systems",
      "What limitations or challenges have you faced with serverless architectures",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "edge-computing",
    "name": "Edge Computing",
    "category": "Cloud and DevOps",
    "description": "Screening questions and evaluation criteria for Edge Computing skills.",
    "questions": [
      "What applications have you built using edge computing technologies",
      "How do you design systems that process data closer to users",
      "What platforms or services have you used for edge deployments",
      "What performance advantages have you observed with edge computing",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "distributed-systems",
    "name": "Distributed Systems",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Distributed Systems skills.",
    "questions": [
      "What distributed systems have you designed or worked on",
      "How do you manage consistency and reliability in distributed architectures",
      "What techniques do you use for fault tolerance and recovery",
      "What monitoring tools do you use for distributed environments",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "load-balancing",
    "name": "Load Balancing",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Load Balancing skills.",
    "questions": [
      "What load balancing techniques have you implemented in production systems",
      "What tools or services have you used for load balancing",
      "How do you design systems that handle high traffic loads",
      "How do you monitor and optimize load balancer performance",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "cdn-technologies",
    "name": "CDN Technologies",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for CDN Technologies skills.",
    "questions": [
      "What CDN providers or tools have you used in web applications",
      "How do CDNs improve application performance and scalability",
      "How do you configure caching strategies in CDN systems",
      "What challenges have you faced while implementing CDN solutions",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "web-security",
    "name": "Web Security",
    "category": "Security",
    "description": "Screening questions and evaluation criteria for Web Security skills.",
    "questions": [
      "What common web security vulnerabilities are you familiar with",
      "How do you protect applications against threats such as XSS or CSRF",
      "What security testing tools have you used for web applications",
      "How do you implement secure coding practices in development teams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-engineering-pipelines",
    "name": "Data Engineering Pipelines",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Data Engineering Pipelines skills.",
    "questions": [
      "What data pipelines have you designed or maintained",
      "What tools do you use for ETL and data processing workflows",
      "How do you ensure reliability and monitoring in data pipelines",
      "How do you optimize data processing performance",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "feature-flags",
    "name": "Feature Flags",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Feature Flags skills.",
    "questions": [
      "What feature flag systems have you used in production environments",
      "How do you manage feature releases using feature flags",
      "What tools do you use for feature experimentation",
      "How do you avoid technical debt while using feature flags",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "event-driven-architecture",
    "name": "Event Driven Architecture",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Event Driven Architecture skills.",
    "questions": [
      "What event driven systems have you built",
      "What messaging systems have you used for event streaming",
      "How do you design reliable event processing pipelines",
      "How do you monitor and debug event driven systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-modeling",
    "name": "Data Modeling",
    "category": "Other",
    "description": "Screening questions and evaluation criteria for Data Modeling skills.",
    "questions": [
      "What data models have you designed for large applications",
      "How do you design schemas that support scalable data systems",
      "What tradeoffs do you consider between normalization and denormalization",
      "How do you document and maintain data models in large teams",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-lakes",
    "name": "Data Lakes",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Data Lakes skills.",
    "questions": [
      "What data lake architectures have you implemented",
      "What tools or platforms have you used for data lakes",
      "How do you manage data ingestion and governance in data lakes",
      "How do you ensure data quality and accessibility",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "data-streaming",
    "name": "Data Streaming",
    "category": "Data Engineering",
    "description": "Screening questions and evaluation criteria for Data Streaming skills.",
    "questions": [
      "What real time data streaming systems have you built",
      "What tools such as Kafka or Flink have you used for streaming pipelines",
      "How do you handle high volume streaming data",
      "How do you ensure reliability in streaming architectures",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "model-monitoring",
    "name": "Model Monitoring",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Model Monitoring skills.",
    "questions": [
      "What techniques do you use for monitoring machine learning models in production",
      "How do you detect model drift or performance degradation",
      "What tools do you use for ML observability",
      "How do you handle retraining pipelines for models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "model-explainability",
    "name": "Model Explainability",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Model Explainability skills.",
    "questions": [
      "What techniques do you use to explain machine learning models",
      "What tools do you use for model interpretability",
      "How do you communicate model insights to non technical stakeholders",
      "How do you evaluate fairness and bias in models",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "mlops",
    "name": "MLOps",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for MLOps skills.",
    "questions": [
      "What ML pipelines have you automated using MLOps practices",
      "What tools do you use for model versioning and deployment",
      "How do you manage model lifecycle in production systems",
      "How do you monitor and maintain ML pipelines",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "llm-engineering",
    "name": "LLM Engineering",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for LLM Engineering skills.",
    "questions": [
      "What applications have you built using large language models",
      "What tools or frameworks have you used for building LLM powered applications",
      "How do you handle prompt engineering and model evaluation",
      "How do you optimize cost and latency when using LLM APIs",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  },
  {
    "id": "prompt-engineering",
    "name": "Prompt Engineering",
    "category": "Machine Learning and AI",
    "description": "Screening questions and evaluation criteria for Prompt Engineering skills.",
    "questions": [
      "What AI applications have you built using prompt engineering",
      "How do you design prompts to produce reliable model outputs",
      "What techniques do you use to evaluate prompt quality",
      "How do you reduce hallucinations or incorrect outputs in AI systems",
      "Can you rate yourself for the skills you mentioned and justify those ratings with examples"
    ]
  }
];
