import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


export default function PaginationComponent(props) {
    const { paginator, handlePagination } = props
    const active = paginator.currentPage;
    const items = [];
    for (let number = 1; number <= paginator.pageCount; number++) {
        items.push(
            <Pagination.Item onClick={() => handlePagination(number)} style={{ background: "#C084FC !important" }} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <Pagination>{items}</Pagination>
    );
}
