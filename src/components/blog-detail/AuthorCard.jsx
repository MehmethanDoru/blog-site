import Image from 'next/image';
import { Globe, Linkedin, Github } from 'lucide-react';

const AuthorCard = ({ author }) => {
  if (!author) return null;

  const socialIcons = {
    website: Globe,
    linkedin: Linkedin,
    github: Github,
  };

  const socialLinks = {
    website: author.website,
    linkedin: author.linkedin,
    github: author.github
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-start gap-6">
        
        {/* author avatar */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={author.avatar || '/images/default-avatar.webp'}
            alt={author.name}
            fill
            sizes="96px"
            className="rounded-full object-cover"
          />
        </div>

        {/* author information */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{author.name}</h3>
          <p className="text-gray-600 mb-4">{author.bio || 'Author information not available.'}</p>

          {/* social media links */}
          <div className="flex gap-4">
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#805aed] transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard; 