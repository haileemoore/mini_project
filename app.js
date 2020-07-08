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
    return <div className="container">
        <h1>Emoji Submissions</h1>
        <h2>Create Emoji</h2>
        <form onSubmit={this.createEmoji} className="create">
          <input onKeyUp={this.changeNewEmojiName}
          type="text" placeholder="Name"/><br/>
          <input onKeyUp={this.changeNewEmojiImage}
          type="text" placeholder="Image"/><br/>
          <input onKeyUp={this.changeNewEmojiDesc}
          type="text" placeholder="Description"/><br/>
          <input type="submit" value="Create"/>
        </form>
        <div className="read">
          <ul>
          {
            this.state.emoji.map(
              (emoji) => {
                return <li className="list-unstyled">
                    <img src={emoji.referenceimg}/>
                    <h3>{emoji.name}</h3>
                    <p>{emoji.description}</p>
                    /* Delete */
                    <button value={emoji.id}
                    onClick={this.deleteEmoji}
                    className="delete">Delete</button>
                    /* Update */
                    <h4>Update Emoji</h4>
                    <form onSubmit={this.updateEmoji}
                    id={emoji.id} className="update">
                      <input onKeyUp={this.changeUpdateEmojiName}
                      type="text" placeholder="Name"/><br/>
                      <input onKeyUp={this.changeUpdateEmojiImage}
                      type="text" placeholder="Image"/><br/>
                      <input onKeyUp={this.changeUpdateEmojiDesc}
                      type="text" placeholder="Description"/><br/>
                      <input type="submit" value="Update"/>
                    </form>
                  </li>
              }
            )
          }
          </ul>
        </div> /* end read div*/
      </div> /* end container div */

  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
