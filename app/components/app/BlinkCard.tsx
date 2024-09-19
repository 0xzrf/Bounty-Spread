import React from 'react';

interface FormItem {
    type: InputType;
    text: string;
}
type InputType = 'email' | 'number' | 'text' | 'button';

const Card = ({ name,imageUrl, description, inputContent, submitText, className }: { className?: string, name: string, imageUrl?:string,description: string, inputContent: FormItem[], submitText: string }) => {
    return (
        <div className={`bg-[#1F2226] shadow-blue-400 my-4 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[90vw] sm:max-w-sm mx-auto ${className}`}>
            {/* Header */}
            <div className="text-center mb-4">
                <img src={imageUrl ? imageUrl : "https://wallpapercave.com/wp/wp9800926.jpg"} alt="Solana Foundation" className="mx-auto w-full mb-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">{name == '' ? '<Blink Name>' : name}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
                {description == '' ? '<Blink Description>' : description}
            </p>

            {/* Form */}
            <form className="space-y-3 sm:space-y-4">
                {inputContent?.map((item, index) => (
                    <div key={index}>
                        <input
                            type={item.type}
                            placeholder={item.text}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 bg-[#1F2226] border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                ))}
               
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {submitText == '' ? '<Your Submit Text>' : submitText}
                </button>
            </form>
        </div>
    );
};

export default Card;
