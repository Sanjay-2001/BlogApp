import React from 'react';
import appwriteService from '../../appwrite/config'
import { Link } from 'react-router-dom';

const PostCard = ({$id, title, featuredImage}) => {
  return (
   <Link to={`/post/${$id}`}>
<div>
    <div>
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title}/>
    </div>
    <h2>{title}</h2>
</div>
   </Link>
  )
}

export default PostCard
