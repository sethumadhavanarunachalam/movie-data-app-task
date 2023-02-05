import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
// import {IconButton,InfoIcon} from '@mui/material/IconButton';
import { Card, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { minHeight } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
// function App() {
//   return (
//     <div>
//       <Router/>
//     {/* <MovieList/>
//     <AddColor/> */}
//     </div>
//   );
// }


function MovieDetails(){
  const {id} = useParams();
  // const movie = movieList[ids];
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetch(`https://639ef22a7aaf11ceb88e8981.mockapi.io/movies/${id}`)
    .then((data) => data.json())
    .then((mvs) => setMovie(mvs));
  })
  const navigate = useNavigate();
  return<div className="movie-details-body">
  <div className="movie-details">
     <iframe 
     width="100%"
      height="550"
       src={movie.trailer}
        title="RRR Trailer (Tamil) - NTR | Ram Charan | Ajay Devgn | Alia Bhatt | SS Rajamouli | Mar 25th 2022" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div className="rating-name-moviedetails"><h1>{movie.name}</h1>
       
        
          <h4>⭐{movie.rating}</h4>
      </div>
    <p>{movie.summary}</p>
    <Button onClick={()=> navigate(-1)} variant="contained" startIcon={<KeyboardBackspaceIcon/>}>
  back
</Button>
  </div>
  </div>
}

function AddMovie({movieList,setMovieList}){
  const navigate = useNavigate();
  
  const [name,setName]=useState("");
  const [poster,setPoster]=useState("");
  const [rating,setRating]=useState("");
  const [summary,setSummary]=useState("");
  const [trailer,setTrailor]=useState("");
  
  const addMovie = () => {
    const newMovie = {
      name:name,
      poster:poster,
      rating:rating,
      summary:summary,
      trailer:trailer,
    };
    //  setMovieList([...movieList,newMovie])
    fetch("https://639ef22a7aaf11ceb88e8981.mockapi.io/movies",{
      method:"POST",
      body: JSON.stringify(newMovie),
      headers:{"Content-type":"application/json"},
    }).then(() => navigate("/movielist"))
    // .then((mvs) => setMovieList(mvs));
    
    
  }
  return<div className="input-box">

    <input placeholder="name" onChange={(event)=> setName(event.target.value)}/>
    <input placeholder="poster" onChange={(event)=> setPoster(event.target.value)} />
    <input placeholder="rating"  onChange={(event)=> setRating(event.target.value)}/>
    <input placeholder="summary" onChange={(event)=> setSummary(event.target.value)}/>
    <input placeholder="trailor" onChange={(event)=> setTrailor(event.target.value)}/>
    <button onClick={addMovie}>addmovie</button>
  </div>;
}
function AddColor(){
  const [color,setColor] = useState("orange");
  const styles = {
    background : color, 
  }
  const [colorList,setColorList] = useState(["red","green","black","gray",]);
  
  return(
    <div><h1>hi</h1>
    <input style={styles} 
    onChange={(event)=> setColor(event.target.value) }
     value={color} type="text"/>
    <button onClick={()=> setColorList([...colorList,color])}>add color</button>
    {colorList.map((clr)=> (<ColorBox color={clr}/>))}
    </div>
  );
}

function ColorBox({color}){
  const styles = {
    width : "200px",
    height : "40px",
    background: color,
  }
  return(
    <div style = { styles}></div>
    );
  }
  
  function MovieList(){
    const [movieList,setMovieList]= useState([]);
    
    const getMovie = () => {
      fetch("https://639ef22a7aaf11ceb88e8981.mockapi.io/movies")
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs));
      
    }
    
    useEffect(()=> {
      getMovie()
      
    })
    const deleteMovie = (id)=> {
      fetch(`https://639ef22a7aaf11ceb88e8981.mockapi.io/movies/${id}`,{
        method:"DELETE"
      })
      .then((data) => getMovie())
    }
    
    return(
      <div>
  <div className="movie-list">
    {movieList.map((mv)=> (
      <div key={mv.id}>
    <Movie movie={mv} id={mv.id} deletebutton={<IconButton
    sx={{marginLeft:"auto"}}
    color='error' onClick={()=> deleteMovie(mv.id)}><DeleteIcon/></IconButton>}/> </div>))}
    </div>
    </div>
  );
}


function Home(){
  return <div><h1>sethu</h1></div>
}
function Movie({movie,id,deletebutton}){
  const navigate = useNavigate();
  return(
    <Card className="movie-container">
        <CardContent>
        <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        image={movie.poster}
      />
      {/* <img className="movie-poster" src={movie.poster} alt=""/> */}
      <div className="rating-name">
      <h1>{movie.name}</h1>
        <h2><IconButton
        color="primary"
        onClick={() => navigate (`/movie/${id}`)}
        aria-label= "Toggle Summary">
          
          <InfoIcon/>
        </IconButton>
        </h2>
          <h4>⭐{movie.rating}</h4>
      </div>
        <p>{movie.summary}</p>
        </CardContent>
        <CardActions>
        <Counter/>
        {deletebutton}
          
        </CardActions>
    </Card>
    );    
  }
  
  function Counter(){
    // const [show,setShow] = useState(true);
    const [like,setLike] = useState(0);
    const [dislike,setDisLike] = useState(0);
    
    const likestyles = {
      color : like < 10 ? "skyblue" : "green", 
    }
    const dislikestyles = {
      color : dislike < 10 ? "skyblue" : "red", 
    }
    return(
      <div>
    <IconButton style={likestyles} aria-label="like" onClick={()=> setLike (like+ 1)}>
    <Badge  color="primary" badgeContent={like}>
    👍
</Badge>
</IconButton>
    <IconButton style={dislikestyles}aria-label="like" onClick={()=> setDisLike (dislike+ 1)}>
    <Badge  color="primary" badgeContent={dislike}>
    👎
</Badge>
</IconButton>
    
    
    </div>
  );
}
function App(){
  // const [movieList,setMovieList] =  useState([]);

  
   const navigate = useNavigate();
   const [mode,setMode]= useState("dark");
    
   const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  // useEffect(()=> {
  //   fetch("https://639ef22a7aaf11ceb88e8981.mockapi.io/movies")
  // .then((data) => data.json())
  // .then((mvs) => setMovieList(mvs));
  // })
  
  return(
    <ThemeProvider theme={darkTheme}>
      <Paper   elevation={4} />
  <div>
  {/* style={{minHeight:"50vh"}}    */}
     <AppBar position="static">
        <Toolbar>
          <IconButton
            // size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={()=> navigate("/")} variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            Home
          </Typography>
          <Typography onClick={()=> navigate("/movielist")} variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            Movie
          </Typography>
          <Typography onClick={()=> navigate("/addcolor")} variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            ColorGame
          </Typography>
          <Typography onClick={()=> navigate("/addmovie")} variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            AddMovie
          </Typography>
          <Button sx={{marginLeft:"auto"}} color="inherit"  onClick={()=> setMode(mode === "light" ? "dark" : "light")}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            {mode === "light" ? "dark" : "light"}mode</Button>
        </Toolbar>
      </AppBar>
    
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/movielist" element={<MovieList   />} />
        <Route path="/addcolor" element={<AddColor  />} />
        <Route path="/movie" element={<Movie  />} />
        <Route path="/movie/:id" element={<MovieDetails  />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/basic-form" element={<BasicForm />} />
        <Route path="/add-form" element={<AddMovieForm />} />
          
        {/* <Route path="/movielist/add" element={<AddMovie movieList={movieList} setMovieList={setMovieList} />} /> */}
      </Routes>
</div>
<Paper/>
</ThemeProvider>
)}
export default App;
const movievalidationSchema = yup.object({
  email:yup.string().min(8,"give a more value").required("missing"),
  password:yup.string().min(4,"give a more value").required("misspass"),
})

function BasicForm(){
 const formik = useFormik({
  initialValues :{
    email:"",
    password:"",
  },
  validationSchema: movievalidationSchema,
  onSubmit:(value)=>{
    console.log(value);
   },
 });
   
  return(<div><h1>welcome to basic form</h1>
  <form onSubmit={formik.handleSubmit}>
  <input type="email" value={formik.values.email} onBlur={formik.handleBlur} name="email" placeholder="email" onChange={formik.handleChange} />
  {formik.touched.email && formik.errors.email ? formik.errors.email : null}
  <input type="text" name="password" onBlur={formik.handleBlur} value={formik.values.password} placeholder="password" onChange={formik.handleChange}/>
  {formik.touched.password && formik.errors.password ? formik.errors.password : null}
  <button type="submit">submit</button>
  </form>
  
  </div>)
}
const movieformvalidationSchema = yup.object({
  name:yup.string().min(4)
})

function AddMovieForm(){
  const formik = useFormik({
    initialValues : {
       name:"",
       poster:"",
       rating:"",
       summary:"",

    }
  ,
  validationSchema: movieformvalidationSchema,
  })
  return<div  >
    <form  className="movieform" onSubmit={formik.handleSubmit}>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" type="text" placeholder="name"/>
    {formik.errors.name}
    <input onChange={formik.handleChange} name="poster" type="text" onBlur={formik.handleBlur} placeholder="poster"/>
    <input name="rating" type="text" onChange={formik.handleChange} placeholder="rating" onBlur={formik.handleBlur}/>
    <input name="summary" type="text" placeholder="summary" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    <button type="submit">submit</button> 
    </form>
  </div>
}