import state from './state.js'
export const fetchShapes = async () => {
    try {
        let res = await fetch('https://pokeapi.co/api/v2/pokemon-shape', {
            method: 'GET'
        })
        res = await res.json()

        const speciesObj = {}
        for (const species of res.results) {
            speciesObj[species.name] =
                await fetchSpecies(species.url)
        }

        state.shapes = res.results
        state.species = speciesObj
        return state
    } catch (e) {
        throw e
    }
}

export const fetchSpecies = async (url) => {
    try {
        let res = await fetch(url, {
            method: 'GET'
        })
        res = await res.json()
        return res.pokemon_species
    } catch (e) {
        throw e
    }
}

export const fetchVarieties = async (url) => {
    try {
        let res = await fetch(url, {
            method: 'GET'
        })
        res = await res.json()
        return res.varieties
    } catch (e) {
        throw e
    }
}

export const fetchPokemon = async (url) => {
    try {
        let res = await fetch(url, {
            method: 'GET'
        })
        res = await res.json()
        return res
    } catch (e) {
        throw e
    }
}