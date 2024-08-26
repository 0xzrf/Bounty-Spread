import { useState } from "react";

export default function NewBounty() {
  const [selectedValue, setSelectedValue] = useState<
    "Project" | "Grant" | "Bounty" | ""
  >("");
  const [textInput, setTextInput] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value as "Project" | "Grant" | "Bounty" | "");
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput(event.target.value);
  };

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
  };

  return (
    <div className="w-full h-screen">
      <div className="text-center flex  flex-col justify-start gap-4 ">
        <h1 className="font-bold text-4xl">Create your new Custom Blink</h1>
        <h3 className="font-semibold">This is where you create the magic🪄</h3>
      </div>
      <div className="p-6 mx-auto w-full h-[90%] bg-zinc-800">
        <div className="border-4 border-dashed border-emerald-400 w-full min-h-2/3 rounded-lg p-8 text-white">
          <label htmlFor="choices" className="block text-lg mb-2">
            The blink is for:
          </label>
          <select
            id="choices"
            value={selectedValue}
            onChange={handleChange}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Project">Project</option>
            <option value="Grant">Grant</option>
            <option value="Bounty">Bounty</option>
          </select>

          {/* New Input Field */}
          <label htmlFor="textInput" className="block text-lg mt-4 mb-2">
            {selectedValue == ""
              ? "Choose the type of blink"
              : `Write a name for your ${selectedValue}`}
          </label>
          <input
            id="textInput"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue == ""}
          />
          <label htmlFor="textInput" className="block text-lg mt-4 mb-2">
            {selectedValue == ""
              ? "Choose the type of blink"
              : `Write the description for your ${selectedValue}`}
          </label>
          <input
            id="textInput"
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue == ""}
          />

          {/* DateTime Input Field */}
          <label htmlFor="dateTimeInput" className="block text-lg mt-4 mb-2">
            Select when will the bounty end:
          </label>
          <input
            id="dateTimeInput"
            type="datetime-local"
            value={dateTime}
            onChange={handleDateTimeChange}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          {(() => {
            return <div></div>;
          })()}
        </div>
      </div>
    </div>
  );
}
