export type preview = {
    id: string
    title: string
    seasons: number
    image: string
    genres: string[]
    updated: string
}

export type episode = {
    episode: number
    description: string
    title: string
    file: string
}

export type season = {
    season: number
    title: string
    image: string
    episodes: episode[]
}

export type show = {
    id: string
    title: string
    seasons: season[]
    image: string
    genres: string[]
    updated: string
}

export type phase = 'loading' | 'list' | 'single' | 'error'

export type state = {
    phase: phase
    previews: preview[]
    single: null | show
}

export type subscription = (state: state) => void