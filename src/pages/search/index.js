import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { useRoute } from '@react-navigation/native'

import { FoodList } from '../../components/foodlist'

import api from '../../services/api'



export function Search(){

    const route = useRoute()
    const [receipes, setReceipes] = useState([])

    useEffect(()=> {

        async function fetchReceipe(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data)
        }

        fetchReceipe()

    }, [route.params?.name])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={receipes}
                keyExtractor={ item => String(item.id) }
                renderItem={ ({ item }) => <FoodList data={item} /> }
                ListEmptyComponent={ () => <Text style={styles.subtitle}>Nenhuma receita encontrada...</Text> }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14,
    },
    subtitle:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50,
        marginEnd: 'auto',
        marginStart: 'auto',
    }
})