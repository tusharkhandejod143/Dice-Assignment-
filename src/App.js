import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MediaCard from "./components/MediaCard/MediaCard";
import { Grid } from "@mui/material";

const apiUrl = "https://api.github.com/search/repositories";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("stars");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchQuery?.trim() === "" ? "stars:>0" : searchQuery;
    let sort = "stars";

    if (sortOption === "watchers") {
      sort = "watchers";
    } else if (sortOption === "name") {
      sort = "name";
    } else if (sortOption === "updated") {
      sort = "updated";
    } else if (sortOption === "created") {
      sort = "created";
    } else if (sortOption === "score") {
      sort = "score";
    }

    axios
      .get(apiUrl, {
        params: {
          q: query,
          sort: sort,
          order: sortOption === "name" ? "asc" : "desc"
        }
      })
      .then((response) => {
        setRepos(response?.data?.items);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching GitHub repositories:", error);
        setError("Something went wrong. Please try again...");
      });
  }, [searchQuery, sortOption]);

  return (
    <div className="App">
      <div className="search-bar">
        <input
          className="inputComponent"
          type="text"
          placeholder="Search GitHub Repositories By Repo Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="selectComponent"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="stars">Stars</option>
          <option value="watchers">Watchers</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created">Created At</option>
          <option value="updated">Updated At</option>
        </select>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : repos?.length === 0 ? (
        <div className="error-message">Data is empty</div>
      ) : (
        <Grid className="container_Grid">
          {repos.map((repo) => (
            <MediaCard
              id={repo.id}
              image={repo.owner.avatar_url}
              imageAltText={`${repo.owner.login}'s Avatar`}
              repo_name={repo.name}
              stars={repo.stargazers_count}
              language={repo.language || "N/A"}
              description={repo.description || "N/A"}
            />
          ))}
        </Grid>
      )}
    </div>
  );
}

export default App;
