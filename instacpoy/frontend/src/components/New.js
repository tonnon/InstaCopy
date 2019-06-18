import React, { Component } from 'react';
import './New.css'
import api from "../servers/api";

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hastags: '',
    };

    handleSubmit = async e => {
        const { image, author, place, description, hastags } = this.state;

        e.preventDefault(); // Impede da pagina atualizar ou ser enviado para outra
        //console.log(this.state);

        try {
            const data = new FormData();
            data.append("image", image);
            data.append("author", author);
            data.append("place", place);
            data.append("description", description);
            data.append("hastags", hastags);
            const resp = await api.post("posts", data);
            console.log(`resp`, resp);
            this.props.history.push("/");
          } catch (e) {
            console.log(`error`, e);
          }
    };

    handleChange = async e => {
        this.setState({ [e.target.name]: e.target.value });
    } // Função que recebe evento html no formato arrow funcioton nas classes proprias para conseguir acessar o valor de this

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" name="" id="" onChange={this.handleImageChange}/>
                <input type="text" name="author" placeholder="Autor do post" onChange={this.handleChange} value={this.state.author}/>
                <input type="text" name="place" placeholder="Local do post" onChange={this.handleChange} value={this.state.place}/>
                <input type="text" name="description" placeholder="descrição do post" onChange={this.handleChange} value={this.state.description}/>
                <input type="text" name="hastags" placeholder="Hastags do post" onChange={this.handleChange} value={this.state.hastags}/>

                <button type="submit">Envar</button>
            </form>
        );
    }
}

export default New;