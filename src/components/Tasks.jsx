import React, { useEffect } from 'react'
import QuestionTaskItem from './QuestionTaskItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestion } from '../redux/slices/questionSlice';
import { getFormattedDate } from '../utils/DateUtils';

function Tasks() {
  const dispatch = useDispatch();
  const { questions} = useSelector((state) => state.questions);
  console.log(questions);
  // useEffect(()=>{
  //   dispatch(fetchQuestion(getFormattedDate(new Date())));
  // },[questions])

  useEffect(() => {
    // Only fetch questions if not already fetched
    if (!questions || questions.length === 0) {
      const todayDate = getFormattedDate(new Date());
      const d=dispatch(fetchQuestion(todayDate));
    }
  }, []);

  //const questions = useSelector((state)=>state.questions.questions);
  
  //const { questions, status } = useSelector((state) => state.questions);
  //console.log(questions); 
  return (
    <div className='w-full flex pt-28 items-center'>
        <div className='flex w-full items-center  flex-col overflow-x-hidden'>
            <div className='text-3xl text-green-900 font-bold mb-7'> Today's Task for Arjun ! </div>
            <div className="flex flex-col w-full items-center">
              {questions.map((que) => (
                <QuestionTaskItem key={que.id} question={que} />
              ))}
            </div>
        </div>

    </div>
  )
}

export default Tasks