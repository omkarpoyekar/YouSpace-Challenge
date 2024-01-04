import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios'; 
import {useNavigation} from "@react-navigation/native"
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); 
  const navigation=useNavigation()

  useEffect(() => {

    fetchMovies();
  }, [page]);

  //Function to fetch the movies
  const fetchMovies = async () => {
    try {
      const API_KEY = 'b8a7ab114c530bb1ddbc9b151b6627f7'; 
      
      const response = searchQuery.length>0?await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`,
      ): await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      

      if (response.data && response.data.results) {
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
 

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page to fetch next set of movies
    
};

//Display movie title
  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('MovieDetails',{
        movieId:item.id
      })}>
        <View style={styles.movieItem}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  //Handling search functionality
  const handleSearch = () => {
    if(page==1){fetchMovies()}
   
    setMovies([])
    setPage(1)

  

  };

  return (
    <View style={styles.container}>
       
    <View style={styles.searchPadding} >
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        
      />
     
      <Button  title='Search' onPress={handleSearch}/>
      
      </View>
      <View style={styles.topRated}>
      {searchQuery.length==0&&<Button   title='Top Rated Movies' onPress={handleSearch}/>}
      </View>


     
      
      {movies.length>0?<FlatList
        
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        // Implementing load more functionality
        ListFooterComponent={
          <TouchableOpacity onPress={handleLoadMore}>
            <Text style={styles.loadMoreButton}>Load More</Text>
          </TouchableOpacity>
        }
      />:<Text style={styles.noResult}>No results found</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loadMoreButton: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 16,
    color: 'blue',
  },
  noResult:{
    alignSelf:'center'
  },
  topRated:{
    margin:20
  },
  searchPadding:{
    padding:8
  }
  
});

export default HomePage;
