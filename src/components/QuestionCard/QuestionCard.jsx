
const QuestionCard = ({ question, Answer }) => {
    return ( 
      <div className="mx-auto flex-col justify-start items-center md:gap-8 gap-3 flex max-w-[809px] text-center">
        <div className="self-stretch text-center text-neutral-900 text-2xl font-semibold font-['Poppins'] leading-[30px]">
          {question}
        </div>
        <div className="self-stretch text-center text-slate-600 text-sm font-normal font-['Poppins'] leading-[21px]">
          {Answer}
        </div>
      </div>
    );
  };

  export default QuestionCard