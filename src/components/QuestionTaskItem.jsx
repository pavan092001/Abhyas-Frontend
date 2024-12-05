import React, { useState,useRef,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpFromBracket, faEye} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { uploadQuestionImg } from '../services/questionService';
import { useDispatch } from 'react-redux';
import { fetchQuestion } from '../redux/slices/questionSlice';
import { getFormattedDate } from '../utils/DateUtils';

function QuestionTaskItem({question}){
  console.log("questions ",question);
  const [completed,setCompleted] = useState(question.completed);
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const dispatch = useDispatch();
  useEffect(() => {
    setCompleted(question.isCompleted);
    console.log('question.isCompleted changed:', question.isCompleted);
  }, [question]);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // File upload logic
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', question.dqid);

    try {
      const res = await uploadQuestionImg(formData);
      if (res.status === true) {
        console.log('Upload successful');
        const res2 = await dispatch(fetchQuestion(getFormattedDate(new Date())));
        console.log('Fetch successful:', res2);
      } else {
        console.error('Upload was not successful:', res);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };


  return (
    <div className='flex my-5 rounded-lg h-12 items-center py-7 justify-between pl-6  md:w-4/5 bg-blue-50'>
        <div className='flex flex-row ml-0'>
          <input className='w-8 h-8' type='checkBox' disabled checked={completed} readOnly/>
          <h3 className='text-2xl ml-4'>{question.question.title.substring(0,25)+" ..."}</h3>
        </div>
        <div className='flex flex-row mr-1'>
          <Link target="_blank" to={question.question.link} ><FontAwesomeIcon className=' p-3 mr-6 rounded-lg  transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ' icon={faEye}/></Link>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
          {!completed && <FontAwesomeIcon className=' p-3 rounded-lg  transition ease-in-out delay-150 bg-green-400 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ' icon={faArrowUpFromBracket} onClick={handleUploadClick} /> }
        </div>
    </div>
  );

}

export default QuestionTaskItem