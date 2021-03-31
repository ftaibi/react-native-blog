import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import BlogPostForm from '../components/BlogPostForm'
import { Context } from '../context/BlogContext'

const EditScreen = ({ navigation }) => {
    const { state, editBlogPost } = useContext(Context)
    const id = navigation.getParam('id')
    const blogPost = state.find(
        // if the callback is true returs the value to the blogPost array
        blogPost => blogPost.id === id
    );

    return (
        <BlogPostForm
            initialValues={{ title: blogPost.title, content: blogPost.content }}
            onSubmit={(title, content) => {
                editBlogPost(id, title, content, () => {
                    //navigation.navigate('Index')

                     navigation.pop() // navigation go back
                })
            }}
        />
    )
}
const styles = StyleSheet.create({

})
export default EditScreen
