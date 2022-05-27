import { createStore} from 'vuex'

export default createStore({
  state: {
    allCountries: []
  },
  getters: {
    getAllCountries(state){
      return state.allCountries
    }
  },
  mutations: {
    setCountries(state, countries){
      state.allCountries = countries
    }
  },
  actions: {
    setCountries(state, countries){
      state.allCountries = countries
    }
  }
})