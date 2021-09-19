import { useEffect, useState, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const params = useParams();
  const { quoteId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  const addedCommentHandler = useCallback(
    () => {
      sendRequest(quoteId);
    },
    [sendRequest, quoteId],
  );

  let comments;
  if(status === 'pending') {
    comments = <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
    comments =  <CommentsList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments =  <p>No Comments added yet!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
