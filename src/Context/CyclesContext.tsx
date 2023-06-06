import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducers';
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}


export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch( markCurrentCycleAsFinishedAction() )
    // setCycles((state) =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    console.log(data)
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    //setCycles((state) => [...state, newCycle])
    setAmountSecondPassed(0)

  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())

    // setCycles((state) =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

  }

  return (
    <CyclesContext.Provider
      value={{
        cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle
      }}>
      {children}
    </CyclesContext.Provider>
  )
}