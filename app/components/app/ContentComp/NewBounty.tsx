"use client";

import { ChangeEvent, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import UploadImage from "../uploadImage";
import axios from "axios";
import { createBountyType } from "@/app/types";
import { useRouter } from "next/navigation";
import Card from "@/app/components/app/BlinkCard"
import SelfContainedCreditDisplay from "../Credit/CompactCreditDisplay";
import { toast, Toaster } from "sonner";

const QUESTION_LIMIT = 75;
export const runtime = "edge";

interface QuestionAnswers {
  question: string;
  type: string;
}

export default function NewBounty({
  isPaid,
  freeRemaining,
}: {
  isPaid: boolean;
  freeRemaining: number;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    "Project" | "Grant" | "Bounty" | ""
  >("");
  const [textInput, setTextInput] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [submitText, setSubmitText] = useState<string|null>(null);
  const [isExceeding, setIsExceeding] = useState(false);
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;
  const [questions, setQuestions] = useState<QuestionAnswers[]>([]);
  const [questionObject, setQuestionObject] = useState<QuestionAnswers>({
    question: "",
    type: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleEditQuestion = (index: number, key: string, value: string) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[key] = value;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedQuestions = [...questions];
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);
    setQuestions(reorderedQuestions);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="text-center flex mt-10 flex-col justify-start gap-4 ">
        <h1 className="font-bold text-4xl">Create your new Custom Blink ;)</h1>
      </div>
      <div className="p-6 flex mx-auto w-full h-[90%] bg-zinc-800">
        <div className="w-[60%] min-h-2/3 rounded-lg p-8 text-white">
          {selectedValue === "" ? (
            <div className="flex items-center justify-center mt-10 mb-2 bg-zinc-700 text-emerald-400 p-4 rounded-md border border-yellow-400">
              <svg
                className="w-6 h-6 mr-2 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2https://medium.com/dialect-labs/introducing-the-blinks-client-sdk-8bf0e3474349000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 8h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                ></path>
              </svg>
              <span className="font-bold">
                Please select a blink type. Select an option for ~~The blink is
                for
              </span>
            </div>
          ) : ""}
          <label htmlFor="choices" className="block text-lg mb-2">
            The blink is for:<span className="text-red-500">*</span>
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
            {selectedValue === ""
              ? "Choose the type of blink"
              : <h1>Write a name for your {selectedValue}<span className="text-red-500">*</span></h1>}
          </label>
          <input
            id="textInput"
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue === ""}
          />
          <label htmlFor="textInput" className="block text-lg mt-4 mb-2">
            {selectedValue === ""
              ? "Choose the type of blink"
              : <h1>Write a description for your {selectedValue}<span className="text-red-500">*</span></h1>}
          </label>
          <textarea
            id="textInput"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 overflow-hidden"
            placeholder="Enter some text"
            disabled={selectedValue === ""}
            style={{ minHeight: '100px', resize: 'none' }}
          />
          <label htmlFor="textInput" className="block text-lg mt-4 mb-2">
            {selectedValue === ""
              ? "Choose the type of blink"
              : <h1>Write the Amount for your {selectedValue}<span className="text-red-500">*</span></h1>}
          </label>
          <input
            id="textInput"
            type="number"
            value={amount}
            onChange={(e: any) => {
              //@ts-ignore
              setAmount(Number(e.target.value));
            }}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue === ""}
          />
          {/* DateTime Input Field */}
          <label htmlFor="dateTimeInput" className="block text-lg mt-4 mb-2">
            Select when will the bounty end:<span className="text-red-500">*</span>
          </label>
          <input
            id="dateTimeInput"
            type="datetime-local"
            value={dateTime}
            onChange={handleDateTimeChange}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label htmlFor="dateTimeInput" className="block text-lg mt-4 mb-2">
            Submission text for the blink:<span className="text-red-500">*</span>
          </label>
          <input
            id="submitText"
            type="text"
            value={submitText || ""}
            onChange={(e) => {
              setSubmitText(e.target.value);
            }}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
       
          {/* Image Upload Input Field */}
          <UploadImage
            uploading={uploading}
            setUploading={setUploading}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />

          <div>

          </div>


        </div>
        <div className="min-h-2/3">
        <h1 className="font-bold text-center mt-8 text-2xl">
          Preview Blink
        </h1>
        {/*@ts-ignore */}
          <Card 
            name={textInput} 
            submitText={submitText as string} 
            imageUrl={imagePreview as string} 
            description={description} 
            //@ts-ignore
            inputContent={questions.map((item) => ({ type: item.type, text: item.question }))} 
            className="min-w-[420px]" 
          />
        </div>
      </div>
      <div className="w-full h-full  text-left">
        {selectedValue && (
          <div className="flex flex-col w-full pl-14 -mt-4">
            <div className="w-full space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="questionInput" className="block text-lg mb-2 text-white">
                    Question to ask the user:<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="questionInput"
                    type="text"
                    value={questionObject.question}
                    onChange={(e) =>
                      setQuestionObject((prevVals) => {
                        if (e.target.value.length > QUESTION_LIMIT) {
                          setIsExceeding(true);
                          return {
                            ...prevVals,
                            question: e.target.value.slice(0, QUESTION_LIMIT),
                          };
                        }
                        setIsExceeding(false);
                        return {
                          ...prevVals,
                          question: e.target.value,
                        };
                      })
                    }
                    className="w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Enter your question here"
                  />
                  {isExceeding && (
                    <p className="text-red-500 text-sm mt-1">
                      Question exceeds {QUESTION_LIMIT} character limit
                    </p>
                  )}
                </div>
                <div className="md:w-1/3">
                  <label htmlFor="typeInput" className="block text-lg mb-2 text-white">
                    Question type:
                  </label>
                  <select
                    id="typeInput"
                    value={questionObject.type}
                    onChange={(e) =>
                      setQuestionObject((prevVals) => ({
                        ...prevVals,
                        type: e.target.value,
                      }))
                    }
                    className="p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Text">Text</option>
                    <option value="Email">Email</option>
                    <option value="Number">Number</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  disabled={
                    questionObject.question.length > QUESTION_LIMIT ||
                    questionObject.question.length === 0 ||
                    !questionObject.type
                  }
                  onClick={() => {
                    setQuestions([
                      ...questions,
                      {
                        question: questionObject.question,
                        type: questionObject.type,
                      },
                    ]);
                    setQuestionObject({ question: "", type: "" });
                  }}
                  className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                    questionObject.question.length > QUESTION_LIMIT ||
                    questionObject.question.length === 0 ||
                    !questionObject.type
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-emerald-400 hover:bg-emerald-500"
                  }`}
                >
                  Add Question
                </button>
              </div>

              <div className="flex justify-start">
                <button
                  className={`rounded-lg text-white font-bold text-lg p-4 transition-colors ${
                    isSubmitting || !selectedValue || questions.length === 0 || textInput === "" || description === "" || dateTime === "" || !imagePreview || !submitText
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-emerald-400 hover:bg-emerald-500"
                  }`}
                  onClick={async () => {
                    setIsSubmitting(true);
                    try {
                      const formData = createBountyType.safeParse({
                        type: selectedValue,
                        questions,
                        imageUrl: imagePreview,
                        name: textInput,
                        description,
                        interval: dateTime,
                        amount,
                        submitText
                      });

                      console.log(formData.data);
                      if (!formData.success) {
                        toast("Validation failed!");
                        console.log(formData.error.message);
                        return;
                      }

                      const res = await axios.post(
                        `${window.location.origin}/api/app/createBounty`,
                        formData.data,
                        { withCredentials: true }
                      );

                      if (!res.data.success) {
                        toast(res.data.msg);
                        return;
                      }

                      toast("Your blink is ready✅");
                      setTimeout(() => {
                        router.push("/dashboard/currentBounties");
                      }, 3000)
                    } catch (error) {
                      console.error("Error submitting form:", error);
                      toast("An error occurred while submitting the form");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={
                    isSubmitting || !selectedValue || questions.length === 0 || textInput === "" || description === "" || dateTime === "" || !imagePreview
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : "Sumbit blink"}
                </button>
              </div>
            </div>
          </div>
        )}
        <Toaster />
        </div>
      </div>
  );
}
