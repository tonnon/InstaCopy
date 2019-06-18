import React, { Component } from 'react';
import api from '../servers/api';
import io from "socket.io-client";

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {

    state = {
       feed: [], 
    }; //Armazena informações denttro do componente para para refletir dentro do html
    async componentDidMount(){
        this.registerToSocket();
        const { data: feed } = await api.get('posts');
        this.setState({ feed }) // Mudar o valor da variavel feed
    } //metodo executado automatco quando for montado em tela

    registerToSocket = () => {
        const socket = io("http://localhost:1111");
    
        socket.on("post", newPost => {
          this.setState({ feed: [newPost, ...this.state.feed] });
        });
        socket.on("like", likedPost => {
            this.setState({
              feed: this.state.feed.map(post =>
                post._id === likedPost._id ? likedPost : post
              )
            });
          });
        };

        handleLike = id => {
            api.post(`posts/${id}/like`);
          };

    render() {
        return (
          <section id="post-list">
            {this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span> 
                            <span className="place">{post.place}</span> 
                        </div>

                        <img src={more} alt="Mais"/>
                    </header>

                    <img src={`http://localhost:1111/files/${post.image}`} alt=""/>

                    <footer>
                        <div className="actions">
                            <img src={like} alt=""/>
                            <img src={comment} alt=""/>
                            <img src={send} alt=""/>                     
                        </div>

                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hastags}</span>
                        </p>
                    </footer>
                </article>   
            ))}
          </section>
        );
    }
}

export default Feed;