import React from "react";
import QCard from "./QCard";
import { nanoid } from "nanoid";
import image1 from "./Images/quizimg1.png"
import image2 from "./Images/quizimg2.png"
import Confetti from "react-confetti";

function QuizPage(){
  const [assets, setAseets] = React.useState([]);
  const [isFilled, setIsFilled] = React.useState(false)
  const [answerCheck, setAnswerCheck] = React.useState(false)
  const [showResult, setShowResult] = React.useState({
    makedAnswers: 0,
    correctAnswers:0,
    show: false
  })
  const [playToggle, setPlayToggle] = React.useState(true)


  function checkAsn(){
    setAnswerCheck(true)
    setIsFilled(false)
    let correct = 0;
    let marked = 0;
    for(let ans of assets){
      if(ans.isMarked){
        marked++;
      }
      if(ans.answer === ans.selectedOption){
        correct++;
      }
    }
    setShowResult({
      makedAnswers: marked,
      correctAnswers:correct,
      show: true
    })
    
  }
  function select(options, index){
    return options.map(option => {
      if(option.isSelected && option.index !== index){
        return ({
          ...option,
          isSelected: false
        })
      }
      else{
        return (
          {
            ...option,
            isSelected: option.index === index ? !option.isSelected:false
          }
        )
      }
    })
  }
  function selectOption(id, index, value){

    setAseets(preAssets => (
      preAssets.map(asset => {
        if(asset.id === id){
          return (
            {
              ...asset,
              isMarked: !asset.isMarked,
              selectedOption: !asset.isMarked ? value:'',
              options: select(asset.options, index)
            }
          )
        }
        else{
          return asset;
        }
      })
    ))
  }
  function randomOptionsGenerator(str, arr){
    let i = 0;
    let randomNumber = Math.ceil(Math.random() * 4)
    let randomIndex = randomNumber === 4 ? 0:randomNumber;
    arr.splice(randomIndex, 0, str)
    let arrObj = arr.map(item =>(
      {
        value:item,
        isSelected: false,
        isCorrect: item === str ? true:false,
        index: i++
      }
    ))
    return arrObj;
  }
  React.useEffect(()=>{
    async function fetchData(){
      console.log('fetching')
      setShowResult({
        makedAnswers: 0,
        correctAnswers:0,
        show: false
      })
      setAnswerCheck(false)
    let data = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
    let res =  await data.json()
    setAseets(res.results.map(result => {
      return (
        {
          id: nanoid(),
          question: result.question,
          answer: result.correct_answer,
          options: randomOptionsGenerator(result.correct_answer, result.incorrect_answers),
          isMarked: false,
          selectedOption: '',
        }
      )
    }))
    setIsFilled(true)
    }
    fetchData()
    console.log('Fetching is completed')
  },[playToggle])
  function togglePlay(){
    setAseets([])
    setPlayToggle(preState => !preState)
  }
  function setQuestions(assets){
    return (assets.map(asset => (<QCard 
                                    key={asset.id}
                                    id={asset.id}
                                    question={asset.question} 
                                    options={asset.options}
                                    selectOption={selectOption}
                                    checked ={false}
                                  />)))
  }
  function checkAnswers(assets){
    return (
      assets.map(asset => (<QCard 
                              key={asset.id}
                              id={asset.id}
                              question={asset.question}
                              options={asset.options}
                              isMarked={asset.isMarked}
                              selectedOption={asset.selectedOption}
                              answer={asset.answer}
                              checked={true}
                            />))
    )
  }
  let QCardElemet = answerCheck ? checkAnswers(assets):setQuestions(assets)
  return(
    <>
      <section className="quiz-page">
        <img src={image1} className="img1"/>
        <img src={image2} className="img2"/>
        <div className="questions">
            {QCardElemet}
          <div className="check-div">
          { isFilled &&
            <button className="check-button" onClick={checkAsn}>
              Check answers
            </button>
          }
          {
            showResult.show && <>
              You marked {showResult.makedAnswers} and socred {showResult.correctAnswers} /10
                <button className="play-again-button" onClick={togglePlay}>
                  Play Again
              </button>
            </>
          }

          </div>
        </div>
      </section>
      {
        showResult.correctAnswers > 2  && <Confetti />
      }
    </>
  );
}

export default QuizPage;