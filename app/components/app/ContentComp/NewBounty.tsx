"use client"

import { ChangeEvent, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import UploadImage from "../uploadImage";
import axios from "axios"
import {createBountyType} from "@/app/types"
import { useRouter } from "next/navigation";
import SelfContainedCreditDisplay from "../Credit/CompactCreditDisplay";
const QUESTION_LIMIT = 75
export const runtime = "edge";

interface QuestionAnswers {
  question: string;
  type: string;
}

export default function NewBounty({isPaid, freeRemaining}: {isPaid: boolean, freeRemaining: number}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    "Project" | "Grant" | "Bounty" | ""
  >("");
  const [textInput, setTextInput] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [isExceeding, setIsExceeding] = useState(false);
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;
  const [questions, setQuestions] = useState<QuestionAnswers[]>([]);
  const [questionObject, setQuestionObject] = useState<QuestionAnswers>({
    question: "",
    type: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      <div className="p-6 mx-auto w-full h-[90%] bg-zinc-800">
        <div className=" w-full min-h-2/3 rounded-lg p-8 text-white">
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
            {selectedValue === ""
              ? "Choose the type of blink"
              : `Write a name for your ${selectedValue}`}
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
              : `Write the description for your ${selectedValue}`}
          </label>
          <input
            id="textInput"
            type="text"
            value={description}
            onChange={(e: any) => {setDescription(e.target.value)}}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue === ""}
          />
           <label htmlFor="textInput" className="block text-lg mt-4 mb-2">
            {selectedValue === ""
              ? "Choose the type of blink"
              : `Write the Amount for your ${selectedValue}`}
          </label>
          <input
            id="textInput"
            type="number"
            value={amount}
            //@ts-ignore
            onChange={(e:any) => {setAmount(Number(e.target.value))}}
            className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter some text"
            disabled={selectedValue === ""}
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

          {/* Image Upload Input Field */}
          <UploadImage uploading={uploading} setUploading={setUploading} imagePreview={imagePreview} setImagePreview={setImagePreview}/>

          {selectedValue === "" ? (
            <div className="flex items-center justify-center mt-10 bg-zinc-700 text-emerald-400 p-4 rounded-md border border-yellow-400">
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
              <span className="font-bold">Please select a blink type.  Select an option for ~~The blink is for</span>
            </div>
          ) : (
            <div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questions.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border-2 border-emerald-400 p-4 mt-4 rounded-lg bg-zinc-700 text-white flex justify-between items-center"
                            >
                              <div className="flex-grow">
                                <input
                                  type="text"
                                  value={item.question}
                                  onChange={(e) =>
                                    handleEditQuestion(
                                      index,
                                      "question",
                                      e.target.value
                                    )
                                  }
                                  className="bg-zinc-600 p-2 w-full rounded-md mb-2 text-white"
                                />
                                <select
                                  value={item.type}
                                  onChange={(e) =>
                                    handleEditQuestion(
                                      index,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  className="bg-zinc-600 p-2 w-full rounded-md text-white"
                                >
                                  <option value="Text">Text</option>
                                  <option value="Email">Email</option>
                                  <option value="Number">Number</option>
                                </select>
                              </div>
                              <button
                                onClick={() => handleDeleteQuestion(index)}
                                className="ml-4 bg-red-500 p-2 rounded-md text-white"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <h1 className="text-center mt-10">
                Write the input fields of your blink:
              </h1>
              <div className="flex mt-4">
                <div className="w-2/4">
                  <label htmlFor="questionInput" className="block text-lg mb-2">
                    Choose your question to ask the user:
                  </label>
                  <input
                    id="questionInput"
                    type="text"
                    value={questionObject.question}
                    onChange={(e) =>
                      setQuestionObject((prevVals) => {
                        if (questionObject.question.length > QUESTION_LIMIT) {
                          setIsExceeding(true)
                          return ({
                            ...prevVals,
                            question: e.target.value.slice(0,-2) as string
                          })
                        }
                        setIsExceeding(false)
                        return ({
                        ...prevVals,
                        question: e.target.value,
                      })})
                    }
                    className="block w-full p-2.5 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div className="w-1/4">
                  <label htmlFor="typeInput" className="block text-sm mt-2">
                    Choose the type of your question:
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
                    className="block w-full p-2.5 mt-2 bg-zinc-700 text-white border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Text">Text</option>
                    <option value="Email">Email</option>
                    <option value="Number">Number</option>
                  </select>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <button
                    disabled={questionObject.question.length > QUESTION_LIMIT || questionObject.question.length == 0}
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
                    className={`mt-4 ${questionObject.question.length > QUESTION_LIMIT ? "bg-red-500" : "bg-emerald-400"}  p-2 rounded-lg text-white `}
                  >
                    {questionObject.question.length > QUESTION_LIMIT ? <div>Word limit exceeded<br/>(75 chars max)</div> : (questionObject.question.length == 0 ? "Don't send null ques" : "Add question")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full  text-center">
        <button
          className="h-1/2 w-fit p-2 rounded-lg bg-emerald-400"
          onClick={async () => {
            const formData = createBountyType.safeParse({
              type: selectedValue,
              questions,
              imageUrl: imagePreview,
              name: textInput,
              description,
              interval: dateTime,
              amount
            })

            if(!formData.success){
              alert("zod validations failed!");
              console.log(formData.error.message);
              return
            }
              
            const res = await axios.post(`${window.location.origin}/api/app/createBounty`, formData.data, {
              withCredentials: true
            })
            
            if (!res.data.success) {
              alert(res.data.msg);
              return
            }

            alert("Blink in queue to be verified⏱️")
            router.push('/dashboard/currentBounties');
          }}
          disabled={
            !selectedValue ||
            questions.length === 0 ||
            textInput === "" ||
            description === "" ||
            dateTime === "" ||
            !imagePreview
          }
        >
          Submit
        </button>
        {
        !isPaid && <SelfContainedCreditDisplay userCredit={freeRemaining} />
      }
      </div>
      
    </div>
  );
}
