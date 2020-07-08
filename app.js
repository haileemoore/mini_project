class App extends React.Component {
  state = {
    emojis: []
  }

  componentDidMount = () => {
    axios.get('/emojis').then(
      (response) => {
        this.setState({
          emojis: response.data
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
      '/emojis',
      {
        name: this.state.newEmojiName,
        referenceimg: this.state.newEmojiImage,
        description: this.state.newEmojiDesc,
      }
    ).then(
      (response) => {
        this.setState({
          emojis: response.data
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
            this.state.emojis.map(
              (emoji) => {
                return <li className="list-unstyled">
                    <img src={emoji.referenceimg}/>
                    <h3>{emoji.name}</h3>
                    <p>{emoji.description}</p>
                  </li>
              }
            )
          }
          </ul>
        </div>
      </div>

  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
