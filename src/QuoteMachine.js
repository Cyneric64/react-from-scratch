import './QuoteMachine.css';
import React from 'react';


export default class QuoteMachine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            quote: '',
            author: '',
            nextQuote: '',
            nextAuthor: ''
        };
    }

    AnimateCard = (direction='in') => {
        let container = document.querySelector(".quote-container");
        if(direction === 'in'){
            container.classList.remove("flyout");
            container.classList.add("flyin");
        } 
        else {
            container.classList.remove("flyin");
            container.classList.add("flyout");
        }
    }
    AnimateCard = this.AnimateCard.bind(this);

    // Method for assigning the index of the current quote
    GetNewQuote = () => {
        // Powered by Quotable
        // https://github.com/lukePeavey/quotable
        const request = fetch("https://api.quotable.io/random").then((response) =>{
            response.json().then((data) => {

                // Check if the current quote is set, if not we will fill it.
                if(this.state.quote === ''){
                    this.setState({
                        quote: data.content,
                        author: data.author
                    });
                } else { // current quote is filled, so we write into the next quote
                    this.setState({
                        nextQuote: data.content,
                        nextAuthor: data.author
                    });
                }
            });
        });
    }

    GetNewQuoteAnimated = () => {
        this.AnimateCard("out");
        this.GetNewQuote();
        setTimeout(() => {
            this.setState({
                quote: this.state.nextQuote,
                author: this.state.nextAuthor,
            });
            this.AnimateCard("in");
        }, 500);
    }


    // Bind the method
    GetNewQuote = this.GetNewQuote.bind(this);
    GetNewQuoteAnimated = this.GetNewQuoteAnimated.bind(this);

    // Generate an initial quote once the component has been mounted
    componentDidMount(){
        this.GetNewQuote();
        this.AnimateCard("in");
    }

    render() { 
        return(
        <div className="quote-container">
            <div className="start-quote"><i className="fa fa-quote-left" aria-hidden="true"></i></div>
            <div className="quote">{this.state.quote}</div>
            <div className="end-quote"><i className="fa fa-quote-right"></i></div>
            <div className="author">-{this.state.author}</div>
            <div className="button-bar">
                <div className="socials">
                    <a target="_blank" href={
                        "https://twitter.com/intent/tweet?text="+'"'+this.state.quote+'"'+' -'+this.state.author
                        }><i className="fa fa-twitter-square" aria-hidden="true"></i>
                    </a>
                    <a><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                </div>
                <div className="btn-next-quote" onClick={this.GetNewQuoteAnimated}>Get a new quote!</div>
            </div>
        </div>
        )
    };
}
