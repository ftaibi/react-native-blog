// no jsx here so no need of import React
import jsonServer from '../api/jsonServer'
import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
    // when we return a new state from the reducer the app will rerender just like useState
    switch (action.type) {
        case 'delete_blog_post':
            return state.filter((blogPost) => blogPost.id !== action.payload)

        case 'add_blog_post':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content
                }
            ]

        case 'edit_blog_post':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })

        /// api calls
        case 'get_blog_posts':
            return action.payload
        default:
            return state
    }
}

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogPosts')
        dispatch({ type: 'get_blog_posts', payload: response.data })
    }
}
// addBlogPost need to have access to the dispatch function to change the state
const addBlogPost = dispatch => {
    // every time we call this function we dispatch a action type



    return async (title, content, callback) => {
        // payload: { title: title, content: content }

        await jsonServer.post('/blogPosts', { title, content })
        // console.log(response)
        // dispatch({ type: 'add_blog_post', payload: { title,  content } })
         callback()
    }
}

const editBlogPost = dispatch => {

    // every time we call this function we dispatch a action type
    return async (id, title, content, callback) => {
         await jsonServer.put(`/blogPosts/${id}`, { title, content })

        // payload: { title: title, content: content }
        // dispatch({
        //     type: 'edit_blog_post',
        //     payload: { id, title, content }
        // })
        callback() && callback()
    }
}

const deleteBlogPost = dispatch => {
    return async id => {
        await jsonServer.delete(`/blogPosts/${id}`)
       // dispatch({ type: 'delete_blog_post', payload: id })
    }
}

// destructure the Context and the provider from createDataContext
// call createDataContext with paramaters: reducer, the object with all the actions and the init state
// we do this to make sure that the state and the methodes are avaible for all the components
export const { Context, Provider } = createDataContext(
    blogReducer,
    {
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
        getBlogPost,
    },
    []
)