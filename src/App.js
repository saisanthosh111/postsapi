import React,{useEffect,useState}from "react";
import './App.css'
import Post from './components/Post'
import ReactPaginate from "react-paginate";


const App = () =>{
    const [posts,setPosts] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filterPosts = (posts,query) =>{

      if (!query) {
        return posts;
    }
   
    return posts.filter((post,index) => {
        const postName = post.title.toLowerCase();
        return (postName.includes(query));
    });
    }
    
    const filteredPosts = filterPosts(posts, query);
    const [pageNumber, setPageNumber] = useState(0);
    const postsPerPage = 5;
    const pagesVisited = pageNumber * postsPerPage;
    
    useEffect(()=>{
        const url = "https://jsonplaceholder.typicode.com/posts";
        fetch(url).then(res => res.json())
        .then(res=>setPosts(res))
    },[]);
   
    /*const wantedposts  = posts.filter(li => li.toLowerCase().includes(search.toLowerCase()))
    const requiredposts = wantedposts.length ===0 ? posts:wantedposts*/
    const displayPosts = filteredPosts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => {
      return (
        <div >
        <Post key={post.id} index={post.id} post={post} />
         </div>
      );
    });

    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
    return(

      <div className="posts-container">
                    <form action="/" method="get">
              <div className="search">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            className="searchTerm"
            name="s" 
        />
        <button type="submit" className="searchButton">Search</button>
        </div>
    </form>
   

        {displayPosts}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      </div>
    );
}

export default App;