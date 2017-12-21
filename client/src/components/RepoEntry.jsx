import React from 'react';

const RepoEntry = (props) => (

	<li>
    <a href={props.repo.url}>{props.repo.name}</a>
    <span> by {props.repo.owner} {props.repo.watchers} watchers and a size of {props.repo.size} repo id {props.repo.repoid}</span>
  </li>

)

export default RepoEntry;