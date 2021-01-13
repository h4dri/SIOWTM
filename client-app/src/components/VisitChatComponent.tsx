import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/VisitChatStyle.css';
import { observer } from 'mobx-react-lite';
import { NewComment } from '../models/VisitModel';

const VisitChatComponent = (props: {isEnded: boolean}) => {
    const rootStore = useContext(RootStoreContext);

    const [textArea, setTextArea] = useState('');
    const [heightCommentsArea, setHeightCommentsArea] = useState(0);

    const {
        createHubConnection,
        stopHubConnection,
        addComment,
        visit
    } = rootStore.visitsStore;

    useEffect(() => {
        createHubConnection();
        return () => {
            stopHubConnection();
        }
    }, [createHubConnection, stopHubConnection])

    useEffect(() => {
        if(visit?.comments){
            var h = visit?.comments.length * 28
            setHeightCommentsArea(h)
        }
    }, [visit?.comments])

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    }

    const handleAddCommentButton = async () => {
        const value: NewComment = {
            createAt: new Date(Date.now()),
            body: textArea,
            userName: rootStore.userStore.user!.userName,
            displayName: rootStore.userStore.user!.displayName
        }
        await addComment(value)
    }

    return(
        <div id="chatContent">
            <div id="chatTitle"><p>Komentarze:</p></div>
            <div id="chatComments" style={{ height: heightCommentsArea }}>
                {visit && visit.comments && visit.comments.map((comment) => (
                    <div className="chatComment" key={comment.id}>
                        {console.log(comment)}
                        <p>{comment.displayName} <i>{comment.userName}</i></p>
                        <p>{comment.body}</p> 
                    </div>
                ))}
            </div>
            { props.isEnded ? (
                null
            ) : (
                <>
                    <div id="newCommentArea">
                        <textarea id="commentArea" name="commentArea" value={textArea} onChange={handleTextAreaChange}/>
                    </div>
                    <div id="chatButton">
                        <input type="submit" value="Dodaj komentarz" onClick={handleAddCommentButton} />
                    </div>
                </>
            )}
        </div>
    )
}

export default observer(VisitChatComponent);