import React, { useState } from 'react';
import { Check, Upload, ChevronDown } from 'lucide-react';
import axios from 'axios';

type InputType = 'email' | 'number' | 'text' | 'button';

interface FormItem {
  type: InputType;
  text: string;
}

export const runtime = "edge";

const TrialBounty: React.FC = () => {
  const [selectedType, setSelectedType] = useState<InputType | ''>('');
  const [inputText, setInputText] = useState<string>('');
  const [centerContent, setCenterContent] = useState<FormItem[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleTypeSelect = (type: InputType) => {
    setSelectedType(type);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleCheckClick = () => {
    if (inputText.trim() && selectedType) {
      setCenterContent([...centerContent, { type: selectedType, text: inputText }]);
      setInputText('');
      setSelectedType('');
    }
  };

  const handleSubmit = () => {
    if (centerContent.length > 0) {
      console.log('Form submitted:', centerContent);
      
      alert('Form submitted successfully!');
    } else {
      alert('Please add at least one input or button before submitting.');
    }
  };

  const isSubmitDisabled = centerContent.length === 0;

  return (
    <>
    <h2 className="text-zinc-100 font-bold text-6xl mb-6 mt-40 flex justify-center">Try creating your own Blink!</h2>
    <div className="flex bg-zinc-800 text-zinc-100 h-[55vh] p-1">
      {/* Left Section */}
      <div className="w-1/4 p-4 border-r border-zinc-700">
        <h2 className="font-bold mb-2">Input</h2>
        <div className="relative">
          <button 
            className="w-full bg-zinc-700 p-2 rounded flex justify-between items-center hover:bg-zinc-600 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedType || 'Select input type'}
            <ChevronDown size={20} />
          </button>
          {showDropdown && (
            <div className="absolute w-full bg-zinc-700 mt-1 rounded shadow-lg">
              {['email', 'number', 'text'].map((type) => (
                <div 
                  key={type} 
                  className="p-2 hover:bg-zinc-600 cursor-pointer transition-colors"
                  onClick={() => handleTypeSelect(type as InputType)}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
        <h2 className="font-bold mt-4 mb-2">Button</h2>
        <button 
          className="bg-emerald-400 text-zinc-800 p-2 rounded w-full hover:bg-emerald-300 transition-colors"
          onClick={() => handleTypeSelect('button')}
        >
          Add Button
        </button>
        {selectedType && (
          <div className="mt-4">
            <input
              className="w-full bg-zinc-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              maxLength={70}
              placeholder={selectedType === 'button' ? 'Button text' : 'Input label'}
              value={inputText}
              onChange={handleInputChange}
            />
            <button 
              onClick={handleCheckClick} 
              className="mt-2 bg-emerald-400 text-zinc-800 p-2 rounded w-full flex justify-center items-center hover:bg-emerald-300 transition-colors"
            >
              <Check size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Center Section */}
      <div className="w-[28vw] p-4 flex flex-col">
        
        <div className="flex-1 border-2 border-dashed border-zinc-600 p-4">
          {centerContent.length === 0 ? (
            <p className="text-zinc-400 text-center">No elements added yet. Start by selecting an input type or button from the left panel.</p>
          ) : (
            centerContent.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'button' ? (
                  <button className="bg-emerald-400 text-zinc-800 p-2 rounded hover:bg-emerald-300 transition-colors">
                    {item.text}
                  </button>
                ) : (
                  <div>
                    <label className="block mb-1">{item.text}</label>
                    <input 
                      type={item.type} 
                      className="w-full bg-zinc-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400" 
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitDisabled} 
          className={`mt-4 p-2 rounded w-full transition-colors ${
            isSubmitDisabled ? 'bg-zinc-600 cursor-not-allowed' : 'bg-emerald-400 text-zinc-800 hover:bg-emerald-300'
          }`}
        >
          Submit
        </button>
      </div>

      {/* Right Section */}
      <div className="w-1/4 p-4 border-l border-zinc-700">
        <h2 className="font-bold mb-2 text-lg">Instructions</h2>
        <ul className="text-base p-1">
          <li>- Choose input type or button to shape your bounty's interface</li>
          <li>- Enter question(max 70 chars)</li>
          <li>- Click check button to add</li>
          <li>- Submit to preview the bounty</li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default TrialBounty;