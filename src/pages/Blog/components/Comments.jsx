import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import RatingStar from '../../../components/common/RatingStar';

const CommentsComponent = (props) => {
    const { dataList } = props;
    const dataSample = [
        {

        },
        {

        },
        {

        },
        {

        },
    ];
    return (
        <Container>
            {dataSample.map((data) => (
                <Row className="comment-item d-flex align-items-center mb-4">
                    <Col sm={2}>
                        <div className="avatar d-flex align-items-center justify-content-center">
                            <img src="http://localhost:3000/assets/images/designer-1.jpg" alt="" />
                        </div>
                    </Col>
                    <Col sm={10}>
                        <div className="d-flex justify-content-between">
                            <h4>Lorem Ipsum</h4>
                            <RatingStar maxRating={5} value={4} isShowValue={true} />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quod autem numquam dolorem eaque molestias ipsam doloribus illum assumenda,
                            eum nemo necessitatibus illo ut quam voluptatum alias voluptas suscipit nulla.</p>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}
export default CommentsComponent;