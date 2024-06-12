# Watch My Movies

A simple app to share your favourite movies with your friends and keep a track of it so you never forget the experience!

# Demo

The demo of this app is live and is hosted on [movies.noorudd.in](https://movies.noorudd.in).

## 🛠️ Technologies

- `NextJS`
- `ReactJS`
- `Tailwind CSS`
- `TypeScript`

## 📦 Libraries & Why I am using it?

- `Zustand: For state management`
- `Axios: To handle API calls`
- `React Hot Toast: To provide awesome UI notifications (like alerts)`
- `UUID: To generate unique IDs as keys`
- `OMDB & TMDB API: To fetch movies details and poster`

## 🚦 Running the project

To run the project in your local environment, follow the below steps:

1. Clone the repository to your local machine.
2. Replace **API_URL** inside `.env` with your API URL. Alternatively, create a dummy JSON file and watch it in a local host and enter that localhost URL here.
3. Run `npm install` or `yarn` in the project directory to install the required dependencies.
4. Run `npm run dev` or `yarn start` to get the project started.
5. Open http://localhost:5173 (or the address shown in your console) in your web browser to view the app.

## 🧠 What New I Learnt?

- As I wanted to learn TypeScript and NextJS, so though what's better way to learn rather then creating project!
- How Zustand is a good alternative to Context API and how simple it is to use to manage small apllications.
- How to create Pagination or 'Load More' feature for unlimited scroll.

## 🚀 Planned Features

Below are features that I am planning to add in the app.

- [x] Ability to create/edit/delete/view viewed movies.
- [x] Ability to create/edit/delete/view watchlist.
- [x] Pagination (Unlimited Scroll)
- [x] Ability to sort and filter movies.
- [x] Ability to discover movies (trending, upcoming, top rated movies and tv shows).
- [x] Show toast notification on changes.
- [x] Ability to add own rating with custom fields.

## 💡 Improvements

- **Recommendation**: Recommend users other movies or shows based on thier viewed list.
- **Pin**: Allow users to pin top three movies or shows if there are too many.
- **Custom Channels**: Ability to add custom movie streaming channels.
