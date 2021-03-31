import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

const BlogPostForm = ({ onSubmit, initialValues }) => {

    const [title, setTitle] = useState(initialValues && initialValues.title)
    const [content, setContent] = useState(initialValues && initialValues.content)

    return (
        <View>
            <Text style={styles.label}>Enter Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={e => setTitle(e)}
            />
            <Text style={styles.label}>Enter Content</Text>
            <TextInput
                style={styles.input}

                value={content}
                onChangeText={(e) => setContent(e)}
            />

            <Button title="Save" onPress={() => {
                onSubmit(title,content)
            }} />

        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5,
        borderRadius: 10

    },
    label: {
        fontSize: 20,
        margin: 5
    }
})

export default BlogPostForm
