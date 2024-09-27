import { create } from 'zustand'

type Store = {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void

    projectsSBVisible: boolean
    projectsSBVisibleChange: () => void

    activeProject: { id: number, name: string },
    setActiveProject: (prop: any) => void
};

const useFramerStore = create<Store>((set) => ({
    bears: 0,
    increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),

    projectsSBVisible: false,
    projectsSBVisibleChange: () => set((state: any) => ({ projectsSBVisible: state.projectsSBVisible == true ? false : true })),

    activeProject: { id: 0, name: ''},
    setActiveProject: (newActiveProject: any) => set(() => ({ activeProject: newActiveProject }))
}))

export default useFramerStore