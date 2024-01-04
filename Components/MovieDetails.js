import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView, Image } from 'react-native';
import axios from 'axios'; 
import {useNavigation,useRoute} from "@react-navigation/native"


const MovieDetails=()=>{
    const [movieData,setMovieData]=useState()
 
    const route=useRoute()

    useEffect(()=>{
        fetchMovie()
    },[route.params.movieId])

   // Fetch single movie details
    const fetchMovie = async () => {
        try {
            
          const API_KEY = 'b8a7ab114c530bb1ddbc9b151b6627f7'; 
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${route.params.movieId}?api_key=${API_KEY}`,
          )
          
    
          if (response.data) {
           
            setMovieData(response.data)
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
   
      return (
       movieData&&<ScrollView style={styles.container}>
          {movieData.poster_path?<Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }}
            style={styles.poster}
            resizeMode="contain"
            alt={movieData.title}
          />:<></>}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{movieData.title}</Text>
            <Text style={styles.overview}>{movieData.overview}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Release Date:- {movieData.release_date}</Text>
              <Text style={styles.infoText}>Runtime:- {movieData.runtime} minutes</Text>
              <Text style={styles.infoText}>Genres:- {movieData.genres.map(genre => genre.name).join(', ')}</Text>
              <Text style={styles.infoText}>Adult:- {movieData.adult ? 'Yes' : 'No'}</Text>
            
            <Text style={styles.infoText}>Popularity:- {movieData.popularity}</Text>
            <Text style={styles.infoText}>Original Language:- {movieData.original_language}</Text>
            <Text style={styles.infoText}>Original Title:- {movieData.original_title}</Text>
            <Text style={styles.infoText}>
              Production Companies:-{' '}
              {movieData.production_companies.map(company => company.name).join(', ')}
            </Text>
            <Text style={styles.infoText}>
              Production Countries:-{' '}
              {movieData.production_countries.map(country => country.name).join(', ')}
            </Text>
            
              
            </View>
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      poster: {
        width: '100%',
        height: 300,
      },
      detailsContainer: {
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      overview: {
        fontSize: 16,
        marginBottom: 20,
      },
      infoContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
      },
      infoText: {
        fontSize: 16,
        marginBottom: 5,
      },
    });
    

export default MovieDetails;