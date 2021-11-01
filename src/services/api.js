import axios from 'axios'

const baseUrl = "https://www.reddit.com"

export default {
    
    data () {
    return {
      posts: [],
      postsLoading: false,
      nextPage: null
    }
    
  },
    

   async getPosts( topic, page, limit=30, count=30 ) {

        let url = `${baseUrl}/r/all/${topic}.json?limit=${limit}&count=${count}`

        if (page != null) {
            url += `&after=` + page
        }

        const { data } = await axios.get(url);

        return {

            posts: data.data.children,

            nextPage: data.data.after

        };
    }
}
