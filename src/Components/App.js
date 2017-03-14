import React, { Component } from 'react';
import axios from 'axios';
import Output from './Output';
import Text from './Controls/Text';
import Select from './Controls/Select';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paras: 4,
            html: true,
            text: ''
        }
    }

    componentWillMount() {
        this.getText();
    }

    getText() {
        axios.get('http://hipsterjesus.com/api?paras=' + this.state.paras + '&html=' + this.state.html)
            .then((response) => {
                this.setState({
                    text: response.data.text
                }, function() {
                    // console.log(this.state);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    changeParas(num) {
    	this.setState({
    		paras: num
    	}, this.getText);
    	// console.log(this.state);
    }

    showHtml(x) {
    	this.setState({
    		html: x
    	}, this.getText);
    }

    render() {
        return (
            <div className="container app">
				<h1 className="text-center">text generator</h1>
				<Output value={this.state.text} />
				<form>
					<div>
						<label>Paragraphs: </label>
						<Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
					</div>
					<div>
						<label>Include Html</label>
						<Select value={this.state.paras} onChange={this.showHtml.bind(this)}/>
					</div>
				</form>
			</div>
        );
    }
}

export default App;
