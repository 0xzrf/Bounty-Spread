'use client'

import React, { useEffect, useState } from 'react';
import { Check, Upload, ChevronDown } from 'lucide-react';
import BlinkCard from './app/BlinkCard';
import { toast, Toaster } from 'sonner'
import { useAction, Action, Blink } from '@dialectlabs/blinks';
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana';


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
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitText, setSubmitText] = useState<string>('');
  const [action, setAction] = useState<Action>();
  const [loading, setLoading] = useState<boolean>(false);

  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
  const actionApiUrl = `https://dial.to/?action=solana-action%3A${encodeURIComponent(window.location.origin)}%2Fapi%2Fapp%2FtrialBounty%3Fname%3D${name}%26description%3D${description}%26questionArr%3D${centerContent.map((item) => JSON.stringify(item)).join("|")}%26submitText%3DMake%20me%20rich&cluster=mainnet`; // H
  const { action: something } = useAction({ url: actionApiUrl, adapter });


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
      setLoading(true)
      console.log('Form submitted:', centerContent);
      console.log(centerContent.map((item, ix) => `{"type": ${item.type}, ""text": ${item.text}}`).join("|"))
      setAction(something as Action)

      toast.success('Blink created!!');
    } else {
      toast.error('Error creating your blink');

    }
  };

  const isSubmitDisabled = centerContent.length === 0;

  return (
    <div className="mt-20 md:mt-40 px-4 md:px-0">
      <h2 className="text-zinc-100 rounded-md font-bold text-4xl md:text-6xl mb-6 md:mb-10 text-center">Try creating your own Blink!</h2>
      {
        action ?
          <div className="flex justify-center items-center">
            <div className="w-full md:w-[30vw] rounded-md">
              <Blink stylePreset="x-dark" action={action} />
            </div>
          </div>
          :
          <div className="flex flex-col md:flex-row bg-zinc-800 text-zinc-100 min-h-[55vh] p-1">
            {/* Left Section */}
            <div className="w-full md:w-[30vw] p-4 border-b md:border-b-0 md:border-r border-zinc-700">
              <h2>
                Name*
              </h2>
              <input
                className="w-full bg-zinc-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                maxLength={70}
                placeholder="Bounty Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <h2>
                Description*
              </h2>
              <input
                className="w-full bg-zinc-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                maxLength={70}
                placeholder="Bounty Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <h2>
                Submit Text*
              </h2>
              <input
                className="w-full bg-zinc-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                maxLength={70}
                placeholder="Submit Text"
                value={submitText}
                onChange={(e) => setSubmitText(e.target.value)}
              />

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
            <div className='w-full md:w-[40vw] mt-4 md:mt-0'>
              <BlinkCard className="h-" inputContent={centerContent} name={name} description={description} submitText={submitText} />
              <button
                className="bg-emerald-400 text-zinc-800 my-5 w-1/2 md:w-1/2 rounded-lg p-2 md:p-1 flex justify-center items-center mx-auto mt-6 hover:bg-emerald-300 transition-colors"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>


            {/* Right Section */}
            <div className="w-full md:w-[30vw] p-4 border-t md:border-t-0 md:border-l border-zinc-700 mt-4 md:mt-0">
              <h2 className="font-bold mb-2 text-lg">Instructions</h2>
              <ul className="text-base p-1">
                <li>- Choose input type or button to shape your bounty's interface</li>
                <li>- Enter question(max 70 chars)</li>
                <li>- Click check button to add</li>
                <li>- Submit to preview the bounty</li>
              </ul>
            </div>

          </div>
      }
      <Toaster />
    </div>
  );
};

export default TrialBounty;