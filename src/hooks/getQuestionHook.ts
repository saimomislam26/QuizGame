import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { Question } from "../types/questionAnsType"
import { shuffleArray } from "../utils"

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = 'hard'
}

export const useGetQuestion = (amount:number, difficulty:string) => {
  return useQuery({
    queryKey: ['questiuons'],
    queryFn: async () => {
      const response = await apiClient.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`)

      return response.data.results.map((question:Question)=>(
        {
          ...question,
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
      ))
    },
    enabled: false,
  })
}

//   for post method
export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; }>(
          `api/orders`,
          order
        )
      ).data,
  })