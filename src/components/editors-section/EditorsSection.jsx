'use client';

import EditorsPick from './EditorsPick';
import Newsletter from './Newsletter';

const EditorsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side - Editor's Pick */}
                <div className="lg:col-span-9">
                    <EditorsPick />
                </div>

                {/* Right side - Newsletter */}
                <div className="lg:col-span-3">
                    <Newsletter />
                </div>
            </div>
        </section>
    );
};

export default EditorsSection; 