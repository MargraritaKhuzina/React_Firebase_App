import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    // загружает список коментариев только для конкретного пользователя,
    // а не выводит список всех комментариев в приложении
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    // создание комментария
    const handleSubmit = (data) => {
        // pageId: userId для того чтобы потом во время отображения страницы конкретного пользователя
        // отобразились коментарии только на его странице
        dispatch(createComment({ ...data, pageId: userId }));
    };
    // удаление комментария
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    // автоматически сортирует комментарии по дате создания (новые наверху)
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    {/* форма добавления комментария (текстовые поля и т.д.) */}
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {/* если нет загрузки то загружается список коментариев */}
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
