
/* INDIVIDUAL REQUEST COMPONENT */
class EmojiRequest extends React.Component{
  state = {
    updateActive: false
  }

  setFormActive = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
  }

  /* Update */
  changeUpdateEmojiName = (event) => {
    this.setState({
      updateEmojiName: event.target.value
    })
  }

  changeUpdateEmojiImage = (event) => {
    this.setState({
      updateEmojiImage: event.target.value
    })
  }

  changeUpdateEmojiDesc = (event) => {
    this.setState({
      updateEmojiDesc: event.target.value
    })
  }

  updateEmoji = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    axios.put(
      '/emoji/' + id,
      {
        name: this.state.updateEmojiName,
        referenceimg: this.state.updateEmojiImage,
        description: this.state.updateEmojiDesc,
      }
    ).then(
      (response) => {
        //I'm not actually resetting the value of the parent state here - just forcing another get
        this.props.getRequest;
      }
    )
  }
  render = () => {
    return <li className="list-unstyled">
    <img src={this.props.emoji.referenceimg}/>
    <h3>{this.props.emoji.name}</h3>
    <p>{this.props.emoji.description}</p>
    <button onClick={this.setFormActive}>Edit Emoji</button>
    {(this.state.updateActive === true) ?
      <form onSubmit={this.updateEmoji}
      id={this.props.emoji.id} className="form-inline">
        <input onKeyUp={this.changeUpdateEmojiName}
        type="text" placeholder="Name"/><br/>
        <input onKeyUp={this.changeUpdateEmojiImage}
        type="text" placeholder="Image"/><br/>
        <input onKeyUp={this.changeUpdateEmojiDesc}
        type="text" placeholder="Description"/><br/>
        <input type="submit" value="Update" className="form-control"/>
      </form>
      : null
    }
    <button value={this.props.emoji.id}
    onClick={this.deleteEmoji}
    className="btn btn-dark">Delete
    </button>
  </li>
  }
}


/* MAIN APP COMPONENT */
class App extends React.Component {
  state = {
    emoji: []
  }

  /* Delete */
  deleteEmoji = (event) => {
    axios.delete('/emoji/' + event.target.value).then(
      (response) => {
        this.setState(
          {
            emoji: response.data
          }
        )
      }
    )
  }

  //because componentDidMount is a reserved function, I needed another get Request.
  basicGet = () => {
    axios.get('/emoji').then(
      (response) => {
        this.setState({
          emoji: response.data
        })
      }
    )
  }

  /* Read */
  componentDidMount = () => {
    this.basicGet();
  }

  /* Create */
  changeNewEmojiName = (event) => {
    this.setState({
      newEmojiName: event.target.value
    })
  }

  changeNewEmojiImage = (event) => {
    this.setState({
      newEmojiImage: event.target.value
    })
  }

  changeNewEmojiDesc = (event) => {
    this.setState({
      newEmojiDesc: event.target.value
    })
  }

  createEmoji = (event) => {
    event.preventDefault();
    axios.post(
      '/emoji',
      {
        name: this.state.newEmojiName,
        referenceimg: this.state.newEmojiImage,
        description: this.state.newEmojiDesc,
      }
    ).then(
      (response) => {
        this.setState({
          emoji: response.data
        })
      }
    )
  }

  render = () => {
    return <div className="container-fluid">
        <h1 id="home">Emoji Submissions</h1>
        <nav>
          <a href="#home">home</a>
          <a href="#create">create</a>
        </nav>
        <div className="read">
          <ul>
          {
            this.state.emoji.map(
              (emoji) => {
                return <EmojiRequest  getRequest={this.basicGet} emoji={emoji}></EmojiRequest>
              }
            )
          }
          </ul>
        </div>
        <div className="create">
          <h2>Create Emoji</h2>
          <form onSubmit={this.createEmoji} className="form-inline">
            <input onKeyUp={this.changeNewEmojiName}
            type="text" placeholder="Name"/><br/>
            <input onKeyUp={this.changeNewEmojiImage}
            type="text" placeholder="Image"/><br/>
            <input onKeyUp={this.changeNewEmojiDesc}
            type="text" placeholder="Description"/><br/>
            <input type="submit" value="Create" className="form-control" id="create"/>
          </form>
        </div>
        <footer>Madeline Dutro | Hailee Doyle</footer>
      </div>

  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

//REFERENCES
// found this stackoverflow answer super helpful when I didn't want to bother with React hooks to rerender the parent component
// https://stackoverflow.com/questions/33680315/react-need-to-call-parent-to-re-render-component
