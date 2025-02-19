import Image from 'next/image';
import { Globe, Linkedin, Github } from 'lucide-react';

const AuthorCard = ({ author }) => {
  const socialIcons = {
    website: Globe,
    linkedin: Linkedin,
    github: Github,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-start gap-6">
        {/* Yazar Avatarı */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* Yazar Bilgileri */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{author.name}</h3>
          <p className="text-gray-600 mb-4">{author.bio}</p>

          {/* Sosyal Medya Linkleri */}
          <div className="flex gap-4">
            {Object.entries(author.social).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
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