import React from 'react';
import axios from 'axios';
import './App.css'


// Main component 
class Kitchen extends React.Component {
  state = {
    menu: [],
    term: '',
  }
  
  componentDidMount(){
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=chick`)
    .then(res => {
      console.clear()
      console.log(res.data.meals);
      if(res.data.meals === null){
        this.setState({
          ...this.state,
          menu: [],
          menuloading: false,
        });
      }else{
        this.setState({
          ...this.state,
          menu: res.data.meals,
          menuloading: false,
        })
      }
      console.log(this.state.menu);
    })
    
  }
  
  fetchDish = () => {
    let term = this.state.term;
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`)
    .then(res => {
      console.log('fetchingData...')
      console.log(res.data.meals);
      if(res.data.meals === null){
        this.setState({
          ...this.state,
          menu: [],
          menuloading: false,
        });
      }else{
        this.setState({
          ...this.state,
          menu: res.data.meals,
          menuloading: false,
        })
      }
      console.log(this.state.menu);
    })
  }
  
  getDish = () => {
    let dishes = [];
    this.state.menu.map(dish => {
      dishes.push(<Dish 
                    area={dish.strArea}
                    title={dish.strMeal} 
                    image={dish.strMealThumb} 
                    video={dish.strYoutube}
                    />);
    });
    
    return dishes;
  }
  
  storeValue = (value) => {
    this.setState({
      ...this.state,
      term: value
    });
    
    console.log(this.state.term);
  }
  
  render(){
    let allDishes = this.getDish();
    return (
      <div className='kitchen'>
        <Chef 
          sendValue={this.storeValue} 
          sendClick={this.fetchDish}
          sendEnter={this.fetchDish}
          />
        
        <div className='dishes'>
          { allDishes.length === 0 ? <div className='error'>No meals found... <i class="fas fa-pizza-slice"></i></div> : allDishes }
        </div>
      </div>
    )
  }
}


// Search Component
class Chef extends React.Component {
  
  handleChange = (e) => {
    this.props.sendValue(e.target.value);
  }
  
  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendEnter();
      console.log('Enter')
    }
  }
  
  handleClick = () => {
    this.props.sendClick();
  }
  
  render(){
    return(
      <div className='chef'>
        <div className='chef-hand'>
          <input type='text' 
            autoFocus
            onChange={this.handleChange} 
            onKeyDown={this.keyDown}
            placeholder='Enter food...' />
          <button onClick={this.handleClick} ><i class="fas fa-search"></i></button>
        </div>
      </div>
    )
  }
}

// Cards Component 
class Dish extends React.Component {
  
  render(){
    return (
      <div className='dish'>
        <img src={this.props.image} alt={this.props.title} />
        <div className='dish-detail'>
          <div className='dish-area'>{this.props.area}</div>
          <div className='dish-title' title={this.props.title}>{this.props.title}</div>
          <div>
            <a href={this.props.video} target='_blank' className="dish-video">
              Cook it 
              <i className='fab fa-youtube'></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Kitchen;

// ReactDOM.render(<Kitchen />, document.getElementById('app'))