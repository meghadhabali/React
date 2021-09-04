import React, {Component } from "react";
import axios from "axios";


const API_URL = "https://jsonplaceholder.typicode.com/posts";
class PostApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           posts : [],
           id : "",
           userId : "",
           title : "",
           body : "",
        };
        
    }

    getPosts = async () => {
        try {
             const {data : posts} = await axios.get(API_URL);
            this.setState({posts});
            // console.log(data);
        }
        catch(e) {
            console.error(e);
        }
       
    }

    CreatePost = async () => {
         try {
             const { userId, title, body} = this.state;
             const {data : post} = await axios.post(API_URL,{
                 userId,
                 title,
                 body,   
             });  
             const posts = [...this.state.posts];
             posts.push(post);         
             this.setState({posts, userId : "", title : "", body : ""});
        }
        catch(e) {
            console.error(e);
        }
    };
    updatePost = async () => {
        try {
             const { id, userId, title, body} = this.state;
             const {data} = await axios.put(`${API_URL}/${id}`,{
                 userId,
                 title,
                 body,   
             });  

            const posts = [...this.state.posts];
            const index = posts.findIndex((post) => post.id === id);
            posts[index] = data;         
            this.setState({posts, id:"", userId : "", title : "", body : ""});
        }
        catch(e) {
            console.error(e);
        }
    }
    DeletePost = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            //console.log(id);
            let posts = [...this.state.posts];
            posts = posts.filter(post => post.id != id);
            this.setState({posts});
        }
        catch(e) {
            console.error(e);
        }
        
    }
    SelectPost = (post) => {
        this.setState({...post});
    }
    componentDidMount() {this.getPosts(); }


    handleChange = ({ target : {name,value}}) => {
        this.setState({[name] : value});
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.id) {
            this.updatePost();
        }
        else {
           this.CreatePost(); 
        }
        
    } 
    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                    <label>User ID : </label>
                    <input type="number" name="userId" onChange={this.handleChange} value={this.state.userId}/>
                </div>
                 <br/>
                <div>
                    <label>Title : </label>
                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                </div>
                 <br/>
                <div>
                    <label>Body : </label>
                    <input type="text" name="body" onChange={this.handleChange} value={this.state.body}/>
                </div>
                <br/>
                <div>
                    <input type="submit"/>
                </div>
              </form>
            <table>
                <thead>
                <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
                </tr>
                </thead>
                
                <tbody>
                    {
                        this.state.posts.map((post) => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.userId}</td>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                      <button onClick={() => this.SelectPost(post)}>Edit</button> 
                                      <button onClick={() => this.DeletePost(post.id)}>Delete</button> 
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        );
    }
}

export default PostApp;