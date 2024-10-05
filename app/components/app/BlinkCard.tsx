import React from 'react';

interface FormItem {
    type: InputType;
    text: string;
}
type InputType = 'email' | 'number' | 'text' | 'button';

const Card = ({ name, imageUrl, description, inputContent, submitText, className }: { className?: string, name: string, imageUrl?: string, description: string, inputContent: FormItem[], submitText: string }) => {
    return (
        <div className={`bg-[#1A1D21] shadow-lg mt-4 rounded-xl overflow-hidden w-full max-w-[320px] mx-auto 
                         border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${className}`}>
                            
            {/* Image */}
            <div className="relative h-48 p-4 overflow-hidden">
                <img src={imageUrl || "https://wallpapercave.com/wp/wp9800926.jpg"} alt={name} className="w-full rounded-xl h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h2 className="text-lg font-semibold text-white truncate">{name || 'Blink Name'}</h2>
                
                {/* Description */}
                <p className="text-sm mb-4 text-gray-400 line-clamp-2">{description || 'Blink Description'}</p>

                {/* Form */}
                <form className="space-y-3">
                    {inputContent?.map((item, index) => (
                        <div key={index}>
                            <input
                                type={item.type.toLowerCase()}
                                placeholder={item.text}
                                className="w-full px-3 py-2 text-sm bg-[#2A2D31] text-gray-300 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    ))}
                    
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        {submitText || 'Blink Text'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Card;
