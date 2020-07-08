class App extends React.Component {

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
    console.log(this.state);
  }

  render = () => {
    return <div>
        <h1>Emoji Submissions</h1>
        <h2>Create Emoji</h2>
        <form onSubmit={this.createEmoji}>
          <input onKeyUp={this.changeNewEmojiName}
          type="text" placeholder="Name"/><br/>
          <input onKeyUp={this.changeNewEmojiImage}
          type="text" placeholder="Image"/><br/>
          <input onKeyUp={this.changeNewEmojiDesc}
          type="text" placeholder="Description"/><br/>
          <input type="submit" value="Create"/>
        </form>
      </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
