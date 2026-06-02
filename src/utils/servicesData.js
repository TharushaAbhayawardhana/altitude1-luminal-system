import { Cloud, Shield, Cpu, BarChart3 } from 'lucide-react'

export const servicesList = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions designed for high availability and performance.',
    features: ['Auto-scaling architecture', '99.99% uptime SLA', 'Multi-region deployment', 'Managed Kubernetes'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity Suite',
    description: 'Enterprise-grade security to protect your digital assets.',
    features: ['Threat detection & response', ' penetration testing', 'Compliance management', 'Security audits'],
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description: 'Intelligent automation and predictive analytics for your business.',
    features: ['Custom ML models', 'Natural language processing', 'Predictive analytics', 'Computer vision'],
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable business insights.',
    features: ['Real-time dashboards', 'Data warehousing', 'Business intelligence', 'Custom reporting'],
  },
]

export const workflowSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We analyze your business needs, goals, and current infrastructure to create a tailored roadmap.',
  },
  {
    step: 2,
    title: 'Strategy',
    description: 'Our architects design a comprehensive solution blueprint with clear milestones and deliverables.',
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Our engineering team deploys the solution using agile methodology with continuous integration.',
  },
  {
    step: 4,
    title: 'Optimization',
    description: 'We monitor, optimize, and scale your solution to ensure peak performance at all times.',
  },
]
