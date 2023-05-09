import React from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import ModalComponent from 'D:/third year/web/web/react/blog-react/react-beginner-blog/beginners-blog/src/components/common/Modal/index.jsx';
import RatingStar from '../../../components/common/RatingStar';
const CommentModal = (props) => {
    const { handleClose, handleSubmit, title, show,
        commentParams, handleOnChange
    } = props;
    return (
        <ModalComponent
            show={show}
            title={title}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        value={commentParams.username}
                        onChange={(event) => handleOnChange(event)}
                        type="text"
                        placeholder="Enter your name"
                        name="username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <div>
                        <RatingStar />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter comment"
                        name="comment"
                        value={commentParams.comment}
                        onChange={(event) => handleOnChange(event)}
                    />
                </Form.Group>
            </Form>
        </ModalComponent>
    )
}

export default CommentModal;