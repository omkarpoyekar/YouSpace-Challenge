# YouSpace-Challenge
A react native app to display movie details using TMDB API

# Getting Started

Install Dependencies:<br>
npm install<br>

Running the application:<br>
npm run start<br>
or<br>
npm run web<br>

The application requires an API key to access the TMDB API. Usually the API key is stored in a environment file but here I have included the API key in the code so that it becomes easy to try out different queries.<br>

The application has basically two screens. The first one is the home screen and the other one is Movie Details screen. The home screen initially loads the top rated movies. The user can scroll down and can load up more movies by pressing the load more button. There is also a search input bar present on the home screen where the user can enter a query and all the movies related to the query will be fetched. User can also scroll down the search results and load more results if required. The home screen also has a button named top rated movies which is basically to display the top rated movies. This button disappears as the user enters any text in the search bar.The basic idea of this button is to give user an option to display top rated movies when they are not searching for any query<br>

The other screen is the movie details page. This page is loaded when the user selects any movie from the list of movies displayed on the home page. This page contains all the details about a particular movie



