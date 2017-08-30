import React, { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);
    //this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: [],
      value: ''
    }
    console.log(this.state)
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //var that = this;
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    var payload = {input: this.state.value}
    console.log(payload)
    console.log(JSON.stringify(payload))
    let apiAddress = 'https://j4gbm5m2c5.execute-api.us-west-2.amazonaws.com/dev/';
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(payload)
    }

    fetch(apiAddress, options)
      .then((response) => response.json())
      .then((response) => {
        console.log('debug response',response)
        //let { navigate } = this.props.navigation;
        this.setState({ data: response })
        //navigate('Products', { data: response.data })
      })
      .catch((err) => console.log(err))
      console.log('debug state',this.state)

  }

  handleFileSelect = function(event) {
    var that = this;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
     var data = {img64: reader.result.split(',')[1] }
     console.log(data);

     var api_address = "https://8n78hbwks0.execute-api.us-west-2.amazonaws.com/dev/";
     fetch(api_address, {
       method: 'post',
        body : JSON.stringify(data),
        headers: {
          'Content-Type':'application/json'
        }
     })
     .then(function(response) {
        return response.json();
     })
     .then(function(json) {
       that.setState({data: json.data})
       console.log(that.state)
     })
     .catch(function(err) {
        console.log('parsing failed', err)
     })
   }
}


  render() {
    const styles = {
    	//color:'red',
    	backgroundColor:'#eaf3f7',
    	//fontWeight:'bold'
      margin: 20
    };
    let listitems = this.state.data.map(function(items, i){
        return (<div key={i}  style = {styles}>
           <div><strong>Category:</strong> &nbsp;{items._source.category}</div>
           <div><strong>Name:</strong> &nbsp;{items._source.name}</div>
           <div><strong>Url:</strong> &nbsp;{items._source.url}</div>
           <div><strong>Brand:</strong> &nbsp;{items._source.brand}</div>
           <div><strong>Pid:</strong>&nbsp;{items._source.pid}</div>
           <div><strong>Master_id:</strong>&nbsp;{items._source.master_id}</div>
           <div><strong>Price:</strong> &nbsp;{items._source.price}</div>
           <div><strong>Image:</strong> &nbsp;<img src= {items._source.imgurl} height="20%" width="20%"/></div>
         </div>
       )
      })
      return (
        <div>
          <h2>Search By Text</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search By Text:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          {listitems}
        </div>
      )
  }
}

export default App;
/*
{
  this.state.data.map(function(item, i){
      return (<div key={i}>
        <span>Price: {item.price}&nbsp;</span>
        <span>Color: {item.color}&nbsp;</span>
        <span>Seller: {item.seller}&nbsp;</span>
        <div>
        {item.images.map(function(image,j){

          return <a href={item.url}> <img key={j} src={image} width="10%" height="10%" alt="GoFind"/> </a>
        })}
        </div>
      </div>)
  })
}
*/
