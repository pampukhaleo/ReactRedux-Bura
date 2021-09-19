import React, { Component } from 'react';

import './add-item-form.css'

export default class AddItemForm extends Component {

    state = { 
        label: ''
    }
    //change input value while typing
    onLabelChange = (event) => {
        this.setState({ 
            label: event.target.value
        })
    }
    //не даем перезагрузиться. добавляем item. после добавления стираем input value
    onSubmit = (event) => {
        event.preventDefault();
        this.props.addItem(this.state.label)
        this.setState({ 
            label: ''
        })
    }

    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                    className="form-control"
                    onChange={ this.onLabelChange }
                    placeholder="What need to be done?"
                    value={this.state.label} />
                <input type="submit"
                    className="btn btn-success"
                    value="Submit" />

            </form>
        )
    }
}