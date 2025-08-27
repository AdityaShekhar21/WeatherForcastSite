import React from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users size={24} />, value: '50+', label: 'Projects Completed' },
    { icon: <Award size={24} />, value: '3+', label: 'Years Experience' },
    { icon: <Clock size={24} />, value: '24/7', label: 'Availability' },
    { icon: <Heart size={24} />, value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                I'm a passionate full-stack developer with over 3 years of experience
                creating digital solutions that bridge the gap between design and functionality.
                My journey began with a curiosity about how things work, which evolved into
                a love for building applications that make people's lives easier.
              </p>
              <p>
                I specialize in modern web technologies and have a keen eye for detail,
                ensuring that every project I work on is not just functional, but also
                beautiful and user-friendly. I believe in the power of clean code,
                thoughtful design, and continuous learning.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community through blog posts and mentoring.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;