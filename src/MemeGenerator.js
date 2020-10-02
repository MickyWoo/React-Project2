import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor() {
        super(); 
        this.state = {
            topText: "",
            botText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch( "https://api.imgflip.com/get_memes")
        .then( response => response.json())
        .then( response => {
            const {memes} = response.data
            this.setState({
                allMemeImgs: memes
            })

        }   
     )
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleClick(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length ) 
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImage: randMemeImg

        })

    }

    render() {
        return(
            <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />

                    <input 
                        type="text"
                        name="botText"
                        value={this.state.botText}
                        onChange={this.handleChange}
                    />

                    <button onClick={this.handleClick}> gen </button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="starter" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.botText}</h2>
                </div>
                
            </div>

        ) 
    }
}

export default MemeGenerator 