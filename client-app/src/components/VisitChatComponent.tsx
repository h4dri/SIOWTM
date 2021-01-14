import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/VisitChatStyle.css';
import { observer } from 'mobx-react-lite';
import { NewComment } from '../models/VisitModel';
import { autorun } from 'mobx';

const VisitChatComponent = (props: {isEnded: boolean}) => {
    const rootStore = useContext(RootStoreContext);

    const [textArea, setTextArea] = useState('');

    const {
        createHubConnection,
        stopHubConnection,
        addComment,
        visit
    } = rootStore.visitsStore;   

    useEffect(() => {
        console.log("Front: ", visit?.comments.length)
    }, [visit?.comments.length])

    autorun(() => {console.log("???", visit?.comments.length)})

    useEffect(() => {
        createHubConnection();
        return () => {
            stopHubConnection();
        }
    }, [createHubConnection, stopHubConnection])

    const handleTextAreaChangeA = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    }

    const enterCatch = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === "Enter") handleAddCommentButton()
    }

    const handleAddCommentButton = async () => {
        if(textArea === '') return
        const value: NewComment = {
            createAt: new Date(Date.now()),
            body: textArea,
            userName: rootStore.userStore.user!.userName,
            displayName: rootStore.userStore.user!.displayName
        }
        await addComment(value)
            .then(() => {
                setTextArea('');
            })
    }

    return(
        <div id="chatContent">
            <div id="chatTitle"><h2>Komentarze:</h2></div>
            { props.isEnded ? (
                null
            ) : (
                <>
                    <div id="newCommentArea">
                        <textarea id="commentArea" name="commentArea" value={textArea} onKeyUp={enterCatch} onChange={handleTextAreaChangeA} />
                    </div>
                    <div id="chatButton">
                        <input type="submit" value="Dodaj komentarz" onClick={handleAddCommentButton} />
                    </div>
                </>
            )}
            <div id="chatComments">
                {visit && visit.comments && visit.comments.slice(0).reverse().map((comment, index) => (
                    index < 10 ? (
                        <div className="chatComment" key={comment.id}>
                            <div className="userName"><p>Użytkownik: {comment.displayName}</p></div>
                            <div className="commentDate"><i>{comment.userName}</i></div>
                            <div className="commentBody"><i>{comment.body}</i></div>
                        </div>
                    ) : (
                        null
                    )
                ))}
            </div>
        </div>
    )
}

export default observer(VisitChatComponent);