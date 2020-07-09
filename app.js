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
        emoji: response.data
      }
    )
  }

  /* Read */
  componentDidMount = () => {
    axios.get('/emoji').then(
      (response) => {
        this.setState({
          emoji: response.data
        })
      }
    )
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
                return <li className="list-unstyled">
                    <img src={emoji.referenceimg}/>
                    <h3>{emoji.name}</h3>
                    <p>{emoji.description}</p>
                    <h4>Update Emoji</h4>
                    <form onSubmit={this.updateEmoji}
                    id={emoji.id} className="form-inline">
                      <input onKeyUp={this.changeUpdateEmojiName}
                      type="text" placeholder="Name"/><br/>
                      <input onKeyUp={this.changeUpdateEmojiImage}
                      type="text" placeholder="Image"/><br/>
                      <input onKeyUp={this.changeUpdateEmojiDesc}
                      type="text" placeholder="Description"/><br/>
                      <input type="submit" value="Update" className="form-control"/>
                    </form>
                    <button value={emoji.id}
                    onClick={this.deleteEmoji}
                    className="btn btn-dark">Delete
                    </button>
                  </li>
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
