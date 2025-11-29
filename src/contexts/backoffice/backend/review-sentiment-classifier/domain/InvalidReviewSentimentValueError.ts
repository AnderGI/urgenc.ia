export default class InvalidReviewSentimentValueError extends Error{
  constructor (private readonly value:string){
    super(`Invalid sentiment <${value}> for ReviewSentiment`)
  }
}