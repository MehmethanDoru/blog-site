'use client';

import Image from 'next/image';

const PodcastAd = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[-30px] md:mt-[-20px]">
            <div className="bg-[#4ddebaa1] rounded-2xl p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                        <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 md:mb-0">
                            <Image 
                                src="/images/podcast.webp"
                                alt="Podcast Avatar"
                                fill
                                className="object-cover"
                            />  
                        </div>
                        <div>
                            <span className="text-base md:text-lg text-[#805aed] font-medium tracking-wide">Claris Podcast</span>
                            <h2 className="text-xl md:text-3xl font-bold mt-2">Listen to daily tech news podcast</h2>
                            <p className="text-gray-600 mt-2 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing</p>
                        </div>
                    </div>
                    <button className="w-full md:w-auto bg-[#7B5CFA] text-white px-6 md:px-8 py-3 rounded-full hover:bg-[#6b4ac7] transition-colors text-sm md:text-base font-medium">
                        Listen Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PodcastAd;
