import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoEntry from './components/RepoEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    //window.addEventListener('load', this.getRepos);
 }

 getRepos () {
  $.ajax({
    url: '/repos',
    dataType: 'json',
    success: (data) => {
      this.setState({repos: data});
    },
    error: (error) => {
      console.log('error');
    }
  });
 }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      data: {term: term},
      type: 'POST',
      dataType: 'json',
      success: (data) => {
        console.log('success');
        this.getRepos();
      },
      error: (error) => {
        console.log('error');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));