import React, { useState } from 'react';
import { Nav, Pagination } from 'react-bootstrap';

const PaginationList = ({ coursesPerPage, totalCourses, paginate }) => {
    const pageNumbers = [];
    const [active, setActive] = useState(1);
    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i}
                className='page-item'
                onClick={() => {
                    paginate(i);
                    setActive(i);

                }}
                active={i === active}
            >
                {i}
            </Pagination.Item>
        );

    }

    return (
        <Nav>
            <Pagination>
                {pageNumbers.map((number) => number)}
            </Pagination>
        </Nav>
    )
}

export default (PaginationList);