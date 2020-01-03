import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
        list: [],
    }),
    mutations: {
        showPost (state, payload) {
            state.list.push({
                author: payload.author,
                title: payload.title,
                image: payload.image,
                postLink: payload.postLink,
                subreddit: payload.subreddit,  
                text: payload.text,
            })
      }
    }
  })
}

export default createStore
