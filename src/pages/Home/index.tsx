import { HandPalm, Play } from "phosphor-react";
import { useState, createContext, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { CountDown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../Context/CyclesContext";


export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, /*reset*/ } = newCycleForm
 


  const task = watch('task')
  const isSubmitDisabled = !task


  return (

    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>

        )}
      </form>

    </HomeContainer>

  );
}
